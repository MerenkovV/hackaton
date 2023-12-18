import React from 'react'

export default function Table(type, data) {
    const headerArray = []
    switch (type) {
        case 'unAuth':
            headerArray = [
                'Зав. № машины', 'Дата отгрузки с завода', 'Модель техники',
                'Модель двигателя', 'Модель трансмиссии', 'Модель управляемого моста',
                'Модель ведущего моста'
            ]
            break;
    
        default:
            break;
    }
  return (
    <table>
        <thead>
            <tr className='main-page-info-head-tr'>
                {headerArray.map(item=><td>{item}</td>)}
            </tr>
        </thead>
        <tbody>
            {
                data.map(object=><tr>{}</tr>)
            }
            <tr className='main-page-info-tr'>
                {/* <td>{machine.machine.factoryNumber}</td>
                <td>{machine.machine.shippingDate}</td>
                <td>{machine.machine.equipmentModel}</td>
                <td>{machine.machine.engineModel}</td>
                <td>{machine.machine.transmissionModel}</td>
                <td>{machine.machine.driveAxleModel}</td>
                <td>{machine.machine.steeringAxleModel}</td> */}
            </tr> 
        </tbody>
    </table>
  )
}
