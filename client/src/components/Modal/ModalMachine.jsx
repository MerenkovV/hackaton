import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../store/RootStore'

const ModalMachine = observer(() => {

  const {guide} = useStore()

  return (
    <div className='modal-wrapper'>
        <div className='modal-window'>
            <h2>Добавить машину</h2>

            <label className='modal-label'>Зав. № машины</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Модель техники</label>
            <select className='modal-select'>
              {
                guide.guide.technique.map(item=><option value={item.id}>{item.name}</option>)
              }
            </select>

            <label className='modal-label'>Модель двигателя</label>
            <select className='modal-select'>
              {
                guide.guide.engine.map(item=><option value={item.id}>{item.name}</option>)
              }
            </select>

            <label className='modal-label'>Зав. № двигателя</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Модель трансмиссии</label>
            <select className='modal-select'>
              {
                guide.guide.transmission.map(item=><option value={item.id}>{item.name}</option>)
              }
            </select>

            <label className='modal-label'>Зав. № трансмиссии</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Модель ведущего моста</label>
            <select className='modal-select'>
              {
                guide.guide.driving.map(item=><option value={item.id}>{item.name}</option>)
              }
            </select>

            <label className='modal-label'>Зав. № ведущего моста</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Модель управляемого моста</label>
            <select className='modal-select'>
              {
                guide.guide.controlled.map(item=><option value={item.id}>{item.name}</option>)
              }
            </select>

            <label className='modal-label'>Зав. № управляемого моста</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Договор поставки №, дата</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Дата отгрузки с завода</label>
            <input className='modal-input' type="date"/>

            <label className='modal-label'>Грузополучатель (конечный потребитель)</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Адрес поставки (эксплуатации)</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Комплектация (доп. опции)</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Клиент</label>
            <input className='modal-input' type="text"/>

            <label className='modal-label'>Сервисная компания</label>
            <input className='modal-input' type="text"/>
        </div>
    </div>
  )
})

export default ModalMachine
