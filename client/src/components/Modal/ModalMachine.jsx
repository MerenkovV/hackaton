import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../store/RootStore'
import {PlusCircleOutlined} from '@ant-design/icons'
import './ModalMachine.css'
import { add } from '../../api/machineAPI'
import loader from '../../img/gears-spinner.svg'

const ModalMachine = observer(({setIsOpened}) => {

  const {guide} = useStore()
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState({
    technique_id: {value: '', isChecked: false},
    technique_model: {value: '', isChecked: false},
    engine_model: {value: '', isChecked: false},
    engine_number: {value: '', isChecked: false},
    transmission_model: {value: '', isChecked: false},
    transmission_number: {value: '', isChecked: false},
    driving_model: {value: '', isChecked: false},
    driving_number: {value: '', isChecked: false},
    controlled_model: {value: '', isChecked: false},
    controlled_number: {value: '', isChecked: false},
    delivery_number: {value: '', isChecked: false},
    shipment_date: {value: '', isChecked: false},
    end_user: {value: '', isChecked: false},
    delivery_address: {value: '', isChecked: false},
    equipment: {value: '', isChecked: false},
    client_id: {value: '', isChecked: false},
    service_id: {value: '', isChecked: false},
  })

  const clearInput = () => {
    let pushEl = {...payload}
    for(let key in payload){  
        pushEl[key].isChecked = false
        pushEl[key].value = ''
    }
    setPayload({...pushEl})
  }

  const addMachine = async () => {
    let errors = 0
    for(let key in payload){
      if(payload[key].value.length === 0){
        errors++
        let pushEl = {...payload}
        pushEl[key].isChecked = true
        setPayload({...pushEl})
      }
    }
    if(errors === 0){
      setLoading(true)
      await add(payload).catch(e=>console.log(e.message))
      clearInput()
      alert('Машина добавлена')
      setLoading(false)
    }
  }

  return (
    <div className='modal-wrapper'>
        <div className='modal-back' onClick={()=>setIsOpened(false)}></div>
        <div className='modal-window'>
            <h2 className='modal-header'>Добавить машину</h2>
            <div className='input-wrapper'>
              <label className='modal-label'>Зав. № машины</label>
              <input className={`modal-input ${payload.technique_id.isChecked 
                && payload.technique_id.value.length === 0 && 'input-error'}`} 
                type="text" value={payload.technique_id.value} onChange={(e)=>{
                  setPayload({...payload, technique_id: {value: e.target.value, isChecked: true}})
                }}/>
            </div>
            
            <div className='input-wrapper'>
              <label className='modal-label'>Модель техники</label>
              <div className='select-wrapper'>
                <select className={`modal-select ${payload.technique_model.isChecked 
                && payload.technique_model.value.length === 0 && 'input-error'}`}
                  value={payload.technique_model.value} onChange={(e)=>{
                    setPayload({...payload, technique_model: {value: e.target.value, isChecked: true}})
                  }}>
                  {
                    guide.guide?.technique?.map(item=><option value={item.id}>{item.name}</option>)
                  }
                </select>
                <button className='select-button'><PlusCircleOutlined /></button>
              </div>
            </div>

            <div className='input-wrapper'>
              <label className='modal-label'>Модель двигателя</label>
              <div className='select-wrapper'>
                <select className={`modal-select ${payload.engine_model.isChecked 
                && payload.engine_model.value.length === 0 && 'input-error'}`}
                  value={payload.engine_model.value} onChange={(e)=>{
                    setPayload({...payload, engine_model: {value: e.target.value, isChecked: true}})
                  }}>
                  {
                    guide.guide?.engine?.map(item=><option value={item.id}>{item.name}</option>)
                  }
                </select>
                <button className='select-button'><PlusCircleOutlined /></button>
              </div>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Зав. № двигателя</label>
            <input className={`modal-input ${payload.engine_number.isChecked 
                && payload.engine_number.value.length === 0 && 'input-error'}`} type="text"
                value={payload.engine_number.value} onChange={(e)=>{
                  setPayload({...payload, engine_number: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Модель трансмиссии</label>
            <div className='select-wrapper'>
                <select className={`modal-select ${payload.transmission_model.isChecked 
                && payload.transmission_model.value.length === 0 && 'input-error'}`}
                value={payload.transmission_model.value} onChange={(e)=>{
                  setPayload({...payload, transmission_model: {value: e.target.value, isChecked: true}})
                }}>
                  {
                    guide.guide?.transmission?.map(item=><option value={item.id}>{item.name}</option>)
                  }
                </select>
                <button className='select-button'><PlusCircleOutlined /></button>
            </div>
            
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Зав. № трансмиссии</label>
            <input className={`modal-input ${payload.transmission_number.isChecked 
                && payload.transmission_number.value.length === 0 && 'input-error'}`} type="text"
                value={payload.transmission_number.value} onChange={(e)=>{
                  setPayload({...payload, transmission_number: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Модель ведущего моста</label>
            <div className='select-wrapper'>
              <select className={`modal-select ${payload.driving_model.isChecked 
                && payload.driving_model.value.length === 0 && 'input-error'}`}
                value={payload.driving_model.value} onChange={(e)=>{
                  setPayload({...payload, driving_model: {value: e.target.value, isChecked: true}})
                }}>
                {
                  guide.guide?.driving?.map(item=><option value={item.id}>{item.name}</option>)
                }
              </select>
              <button className='select-button'><PlusCircleOutlined /></button>
            </div>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Зав. № ведущего моста</label>
            <input className={`modal-input ${payload.driving_number.isChecked 
                && payload.driving_number.value.length === 0 && 'input-error'}`} type="text"
                value={payload.driving_number.value} onChange={(e)=>{
                  setPayload({...payload, driving_number: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Модель управляемого моста</label>
            <div className='select-wrapper'>
              <select className={`modal-select ${payload.controlled_model.isChecked 
                && payload.controlled_model.value.length === 0 && 'input-error'}`}
                value={payload.controlled_model.value} onChange={(e)=>{
                  setPayload({...payload, controlled_model: {value: e.target.value, isChecked: true}})
                }}>
                {
                  guide.guide?.controlled?.map(item=><option value={item.id}>{item.name}</option>)
                }
              </select>
              <button className='select-button'><PlusCircleOutlined /></button>
            </div>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Зав. № управляемого моста</label>
            <input className={`modal-input ${payload.controlled_number.isChecked 
                && payload.controlled_number.value.length === 0 && 'input-error'}`} type="text"
                value={payload.controlled_number.value} onChange={(e)=>{
                  setPayload({...payload, controlled_number: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Договор поставки №, дата</label>
            <input className={`modal-input ${payload.delivery_number.isChecked 
                && payload.delivery_number.value.length === 0 && 'input-error'}`} type="text"
                value={payload.delivery_number.value} onChange={(e)=>{
                  setPayload({...payload, delivery_number: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Дата отгрузки с завода</label>
            <input className={`modal-input ${payload.shipment_date.isChecked 
                && payload.shipment_date.value.length === 0 && 'input-error'}`} type="date"
                value={payload.shipment_date.value} onChange={(e)=>{
                  setPayload({...payload, shipment_date: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
              <label className='modal-label'>Грузополучатель (конечный потребитель)</label>
              <input className={`modal-input ${payload.end_user.isChecked 
                && payload.end_user.value.length === 0 && 'input-error'}`} type="text"
                value={payload.end_user.value} onChange={(e)=>{
                  setPayload({...payload, end_user: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Адрес поставки (эксплуатации)</label>
            <input className={`modal-input ${payload.delivery_address.isChecked 
                && payload.delivery_address.value.length === 0 && 'input-error'}`} type="text"
                value={payload.delivery_address.value} onChange={(e)=>{
                  setPayload({...payload, delivery_address: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
            <label className='modal-label'>Комплектация (доп. опции)</label>
            <input className={`modal-input ${payload.equipment.isChecked 
                && payload.equipment.value.length === 0 && 'input-error'}`} type="text" 
                value={payload.equipment.value} onChange={(e)=>{
                  setPayload({...payload, equipment: {value: e.target.value, isChecked: true}})
                }}/>
            </div>

            <div className='input-wrapper'>
              <label className='modal-label'>Клиент</label>
              <select className={`modal-select ${payload.client_id.isChecked 
                && payload.client_id.value.length === 0 && 'input-error'}`}
                value={payload.client_id.value} onChange={(e)=>{
                  setPayload({...payload, client_id: {value: e.target.value, isChecked: true}})
                }}>
                  <option value="">------</option>
                {
                  guide.guide?.clients?.map(item=><option value={item.id}>{item.name}</option>)
                }
              </select>
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
                  guide.guide?.service?.map(item=><option value={item.id}>{item.name}</option>)
                }
              </select>
            </div>
            <div className='input-wrapper'>
              {
                loading ? <img src={loader} alt="" width='60px'/> : 
                <button className='modal-button' onClick={addMachine}>Создать</button>
              }
              
            </div>
        </div>
    </div>
  )
})

export default ModalMachine
