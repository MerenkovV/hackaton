import { intercept } from 'mobx';
import React from 'react';
import './style.css';


const Table = ({type, isAuth, userRole, data}) => {
    let headerArray = [];
    let machine = [];
    machine = data;

    switch (userRole) {
        case undefined:
            type === 'info' ? 
            headerArray = [
                'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
                'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста', 'Зав. № ведущего моста',
                'Модель управляемого моста', 'Зав. № управляемого моста'
            ] : 
            type === 'to' ? 
            headerArray = [
                'Виды ТО', 'Дата проведения ТО', 'Наработка, м/час', '№ заказ-наряда',
                'Дата заказ-наряда', 'Организация, проводившая ТО ', 'Машина', 'Сервисная компания'
            ] :
            headerArray = [
                'Дата отказа', 'Наработка, м/час', 'Узел отказа', 'Описание отказа',
                'Способ восстановления', 'Используемые запасные части', 'Дата восстановления', 'Время простоя техники',
                'Машина', 'Сервисная компания'
            ]
            break;
        case 'MANAGER':
        case 'CLIENT':
        case 'SERVICE':
        case 'ADMIN':
            type === 'info' ? 
            headerArray = [
                'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
                'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста', 'Зав. № ведущего моста',
                'Модель управляемого моста', 'Зав. № управляемого моста', 'Договор поставки №, дата',
                'Дата отгрузки с завода', 'Грузополучатель', 'Адрес поставки', 'Комплектация',
                'Клиент', 'Сервисная компания'
            ] : 
            type === 'to' ? 
            headerArray = [
                'Виды ТО', 'Дата проведения ТО', 'Наработка, м/час', '№ заказ-наряда',
                'Дата заказ-наряда', 'Организация, проводившая ТО ', 'Машина', 'Сервисная компания'
            ] :
            headerArray = [
                'Дата отказа', 'Наработка, м/час', 'Узел отказа', 'Описание отказа',
                'Способ восстановления', 'Используемые запасные части', 'Дата восстановления', 'Время простоя техники',
                'Машина', 'Сервисная компания'
            ]
            break;
        default:
            break;
    }

  return (
    <div className='table-block'>
        <table className='main-table' style={{width: userRole !== undefined && type === 'info' ? '2300px' : '1200px'}}>
            <thead>
                <tr className='main-page-info-head-tr'>
                    {headerArray.map(item=><th>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                    Array.isArray(machine) ? machine.map( object => <tr>{object.value}</tr>) : null
                    }
                </tr>
                {userRole === undefined && type === 'info' ? 
                    <tr className='main-page-info-tr'>
                        <td>{machine.id}</td>
                        <td>{machine.dictionary.technique_model.name}</td>
                        <td>{machine.dictionary.engine_model.name}</td>
                        <td>{machine.engine_number}</td>
                        <td>{machine.dictionary.transmission_model.name}</td>
                        <td>{machine.transmission_number}</td>
                        <td>{machine.dictionary.driving_bridge_model.name}</td>
                        <td>{machine.driving_bridge_number}</td>
                        <td>{machine.dictionary.controlled_bridge_model.name}</td>
                        <td>{machine.controlled_bridge_number}</td>
                    </tr> :
                    type === 'info' ? 
                    <tr className='main-page-info-tr'> 
                        <td>{machine.id}</td>
                        <td>{machine.dictionary.technique_model.name}</td>
                        <td>{machine.dictionary.engine_model.name}</td>
                        <td>{machine.engine_number}</td>
                        <td>{machine.dictionary.transmission_model.name}</td>
                        <td>{machine.transmission_number}</td>
                        <td>{machine.dictionary.driving_bridge_model.name}</td>
                        <td>{machine.driving_bridge_number}</td>
                        <td>{machine.dictionary.controlled_bridge_model.name}</td>
                        <td>{machine.controlled_bridge_number}</td>
                    </tr> : null
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table
