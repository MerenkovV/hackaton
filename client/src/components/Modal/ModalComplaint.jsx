import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/RootStore'
import {PlusCircleOutlined} from '@ant-design/icons'
import './Modal.css'
import { add, getAll } from '../../api/complaintAPI'
import loader from '../../img/gears-spinner.svg'
import GuideCreator from '../GuideCreator/GuideCreator'

const ModalComplaint = observer(({setIsOpened}) => {

  const {guide, machine, complaint} = useStore()
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState({
    technique_id: {value: '', isChecked: false},
    service_id: {value: '', isChecked: false},
    description: {value: '', isChecked: false},
    spare_parts: {value: '', isChecked: false},
    worked: {value: '0', isChecked: false},
    date_repair: {value: '', isChecked: false},
    downtime: {value: '', isChecked: false},
    refusal_id: {value: '', isChecked: false},
    recovery_id: {value: '', isChecked: false},
    date_complaints: {value: '', isChecked: false},
  })

  const [adding, setAdding] = useState({
    refusal: false,
    recovery: false,
  })

  const clearInput = () => {
    let pushEl = {...payload}
    for(let key in payload){  
        pushEl[key].isChecked = false
        pushEl[key].value = ''
    }
    setPayload({...pushEl})
    setAdding({
      refusal: false,
    })
  }

  useEffect(()=>{
    setPayload({...payload, downtime: {value: Math.round((Date.parse(payload.date_repair.value) - Date.parse(payload.date_complaints.value)) / (1000 * 60 * 60 * 24)), isChecked: true}})
  }, [payload.date_repair.value, payload.date_complaints.value])

  const addComplaint = async () => {
    let errors = 0
    let payloadValues = {}
    for(let key in payload){
      if(payload[key].value.length === 0){
        errors++
        let pushEl = {...payload}
        pushEl[key].isChecked = true
        
        setPayload({...pushEl})
      }
      payloadValues[key] = payload[key].value
    }
    if(errors === 0){
      setLoading(true)
      await add(payloadValues).then(()=>{
        clearInput()
        alert('Рекламация добавлена')

        complaint.setIsFetching(true)
            getAll().then(data=>{
                complaint.setComplaint(data.rows)
            })
                .catch(e=>console.log(e))
                .finally(()=>{
                    complaint.setIsFetching(false)
                })
      }).catch(e=>console.log(e.message))
      
      setLoading(false)
    }
  }

  return (
    <div className='modal-wrapper'>
        <div className='modal-back' onClick={()=>setIsOpened(false)}></div>
        <div className='modal-window'>
            <h2 className='modal-header'>Добавить рекламацию</h2>
            
            <div className='input-wrapper'>
              <label className='modal-label'>Заводской номер машины</label>
              <div className='select-wrapper'>
                <select className={`modal-select ${payload.technique_id.isChecked 
                && payload.technique_id.value.length === 0 && 'input-error'}`}
                  value={payload.technique_id.value} onChange={(e)=>{
                    setPayload({...payload, technique_id: {value: e.target.value, isChecked: true}})
                  }}>
                    <option value="">------</option>
                  {
                    machine.machine?.map(item=><option key={item.id} value={item.id}>{item.id}</option>)
                  }
                </select>
              </div>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Дата отказа</label>
            <input className={`modal-input ${payload.date_complaints.isChecked 
                && payload.date_complaints.value.length === 0 && 'input-error'}`} type="date"
                value={payload.date_complaints.value} onChange={(e)=>{
                  setPayload({...payload, date_complaints: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Наработка, м/час</label>
            <input className={`modal-input ${payload.worked.isChecked 
                && payload.worked.value.length === 0 && 'input-error'}`} type="text"
                value={payload.worked.value} onChange={(e)=>{
                  if(!isNaN(Number(e.target.value))){
                    setPayload({...payload, worked: {value: Number(e.target.value), isChecked: true}})
                  }
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Узел отказа</label>
            <div className='select-wrapper'>
              <select className={`modal-select ${payload.refusal_id.isChecked 
                && payload.refusal_id.value.length === 0 && 'input-error'}`}
                value={payload.refusal_id.value} onChange={(e)=>{
                  setPayload({...payload, refusal_id: {value: e.target.value, isChecked: true}})
                }}>
                  <option value="">------</option>
                {
                  guide.guide?.refusal?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
              <button className='select-button' onClick={()=>{
                  const newValue = !adding.refusal
                  setAdding({...adding, refusal: newValue})
                }}><PlusCircleOutlined /></button>
            </div>
              {
                adding.refusal && <GuideCreator name='Узел отказа' endpoint='refusal' integrated={true}/>
              }
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Описание отказа</label>
            <textarea className={`modal-input modal-textarea ${payload.description.isChecked 
                && payload.description.value.length === 0 && 'input-error'}`} type="text"
                value={payload.description.value} onChange={(e)=>{
                  setPayload({...payload, description: {value: e.target.value, isChecked: true}})
                }}></textarea>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Способ восстановления</label>
            <div className='select-wrapper'>
              <select className={`modal-select ${payload.recovery_id.isChecked 
                && payload.recovery_id.value.length === 0 && 'input-error'}`}
                value={payload.recovery_id.value} onChange={(e)=>{
                  setPayload({...payload, recovery_id: {value: e.target.value, isChecked: true}})
                }}>
                  <option value="">------</option>
                {
                  guide.guide?.recovery?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
              <button className='select-button' onClick={()=>{
                  const newValue = !adding.recovery
                  setAdding({...adding, recovery: newValue})
                }}><PlusCircleOutlined /></button>
            </div>
              {
                adding.recovery && <GuideCreator name='Способ восстановления' endpoint='recovery' integrated={true}/>
              }
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Используемые запасные части</label>
            <textarea className={`modal-input modal-textarea ${payload.spare_parts.isChecked 
                && payload.spare_parts.value.length === 0 && 'input-error'}`} type="text"
                value={payload.spare_parts.value} onChange={(e)=>{
                  setPayload({...payload, spare_parts: {value: e.target.value, isChecked: true}})
                }}></textarea>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Дата восстановления</label>
            <input className={`modal-input ${payload.date_repair.isChecked 
                && payload.date_repair.value.length === 0 && 'input-error'}`} type="date"
                value={payload.date_repair.value} onChange={(e)=>{
                  setPayload({...payload, date_repair: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Время простоя (дней)</label>
            <input className={`modal-input  ${payload.downtime.isChecked 
                && payload.downtime.value.length === 0 && 'input-error'}`}
                value={payload.downtime.value || 'Авто расчёт'} onChange={(e)=>{
                  setPayload({...payload, downtime: {value: e.target.value, isChecked: true}})
                }} disabled/>
            </div>

            <div className='input-wrapper'>
              <label className='modal-label'>Сервисная организация</label>
              <select className={`modal-select ${payload.service_id.isChecked 
                && payload.service_id.value.length === 0 && 'input-error'}`}
                value={payload.service_id.value} onChange={(e)=>{
                  setPayload({...payload, service_id: {value: e.target.value, isChecked: true}})
                }}>
                  <option value="">------</option>
                {
                  guide.guide?.service?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
            </div>

            <div className='input-wrapper'>
              {
                loading ? <img src={loader} alt="" width='50px'/> : 
                <button className='modal-button' onClick={addComplaint}>Создать</button>
              }
              
            </div>
            
        </div>
    </div>
  )
})

export default ModalComplaint
