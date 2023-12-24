import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../store/RootStore'
import {PlusCircleOutlined} from '@ant-design/icons'
import './Modal.css'
import { add, getAll } from '../../api/maintenanceAPI'
import loader from '../../img/gears-spinner.svg'
import GuideCreator from '../GuideCreator/GuideCreator'

const ModalTO = observer(({setIsOpened}) => {

  const {guide, machine, mainterance, user} = useStore()
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState({
    technique_id: {value: '', isChecked: false},
    service_id: {value: '', isChecked: false},
    maintenance_type: {value: '', isChecked: false},
    maintenance_date: {value: '', isChecked: false},
    worked: {value: '0', isChecked: false},
    order: {value: '', isChecked: false},
    date_order: {value: '', isChecked: false},
  })

  const [adding, setAdding] = useState({
    maintenance: false,
  })

  const clearInput = () => {
    let pushEl = {...payload}
    for(let key in payload){  
        pushEl[key].isChecked = false
        pushEl[key].value = ''
    }
    setPayload({...pushEl})
    setAdding({
      maintenance: false,
    })
  }

  const addTO = async () => {
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
        alert('ТО добавлено')

        mainterance.setIsFetching(true)
            getAll().then(data=>{
                mainterance.setMainterance(data.rows)
            })
                .catch(e=>console.log(e))
                .finally(()=>{
                    mainterance.setIsFetching(false)
                })
                
      }).catch(e=>console.log(e.message))
      
      setLoading(false)
    }
  }

  return (
    <div className='modal-wrapper'>
        <div className='modal-back' onClick={()=>setIsOpened(false)}></div>
        <div className='modal-window'>
            <h2 className='modal-header'>Добавить ТО</h2>
            
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
              <label className='modal-label'>Вид ТО</label>
              <div className='select-wrapper'>
                <select className={`modal-select ${payload.maintenance_type.isChecked 
                && payload.maintenance_type.value.length === 0 && 'input-error'}`}
                  value={payload.maintenance_type.value} onChange={(e)=>{
                    setPayload({...payload, maintenance_type: {value: e.target.value, isChecked: true}})
                  }}>
                    <option value="">------</option>
                  {
                    guide.guide?.maintenance?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
                  }
                </select>
                {
                user.user?.role === "MANAGER" &&
                  <button className='select-button' onClick={()=>{
                    const newValue = !adding.maintenance
                    setAdding({...adding, maintenance: newValue})
                  }}><PlusCircleOutlined /></button>
                }
              </div>
              {
                adding.maintenance && <GuideCreator name='Вид ТО' endpoint='maintenance' integrated={true}/>
              }
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Дата проведения ТО</label>
            <input className={`modal-input ${payload.maintenance_date.isChecked 
                && payload.maintenance_date.value.length === 0 && 'input-error'}`} type="date"
                value={payload.maintenance_date.value} onChange={(e)=>{
                  setPayload({...payload, maintenance_date: {value: e.target.value, isChecked: true}})
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
            <label className='modal-label'>№ заказ-наряда</label>
            <input className={`modal-input ${payload.order.isChecked 
                && payload.order.value.length === 0 && 'input-error'}`} type="text"
                value={payload.order.value} onChange={(e)=>{
                  setPayload({...payload, order: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Дата заказ-наряда</label>
            <input className={`modal-input ${payload.date_order.isChecked 
                && payload.date_order.value.length === 0 && 'input-error'}`} type="date"
                value={payload.date_order.value} onChange={(e)=>{
                  setPayload({...payload, date_order: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
              <label className='modal-label'>Сервисная компания</label>
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
                <button className='modal-button' onClick={addTO}>Создать</button>
              }
              
            </div>

        </div>
    </div>
  )
})

export default ModalTO
