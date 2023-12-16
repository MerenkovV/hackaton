import machines from '../../mockdata/machines.json';
import './style.css';
import { useState } from 'react';

const MainPage = () =>{
    const [inputID, setInputID] = useState(); //Заводской № машины введенный в поисковую строку
    const [foundMachine, setMachine] = useState(); //Найденная машина
    const [errorMessage, setErrorMessage] = useState();
    const [tableType, setTableType] = useState('info');

    const inputHandle = (inputID) =>{
        setMachine();
        setErrorMessage('');
        setInputID(inputID.target.value)
        if(inputID.target.value === '')
        setTableType('info')
    }

    const findMachine = () => {
        let Machine = machines.machinesinfo.find((machine) => machine.factoryNumber === Number(inputID));
        setMachine(Machine);
        setTableType('info');
        if(!Machine){
            setErrorMessage('Ничего не найдено');
        }
    }

    const handleTableType = (type) => {
        switch (type){
            case 'info':
                setTableType('info');
                break;
            case 'to':
                setTableType('to')
                break;   
            case 'advertising':
                setTableType('advertising');
                break;
            default:
                setTableType('info');
                break;            
        }
    }

    return(
        <div className='main-page'>
            <div className='main-page-title'>Проверьте комплектацию и технические характеристики техники Силант</div>
            <div className='main-page-search-block'>
                <input className='main-page-input' placeholder='Заводской номер' type='text' onChange={inputHandle} value={inputID}/>
                <button className='main-page-search-button' onClick={findMachine}>Поиск</button>
            </div>

            <div>
                {foundMachine && tableType === 'info' ? 
                <div className='main-page-info-block'>
                    <div>Информация о комплектации и технических характеристиках Вашей техники</div>
                    <div className='main-page-type-of-tables'>
                        <button onClick={() => handleTableType('info')} style={{background: tableType === 'info' ? '#3f87d9' : '#163e6c' }}>Общая информация</button>
                        <button onClick={() => handleTableType('to')} style={{background: tableType === 'to' ? '#3f87d9' : '#163e6c' }}>ТО</button>
                        <button onClick={() => handleTableType('advertising')} style={{background: tableType === 'advertising' ? '#3f87d9' : '#163e6c' }}>Рекламация</button>
                    </div>
                    <table>
                        <thead>
                            <tr className='main-page-info-head-tr'>
                                <th>Зав. № машины</th>
                                <th>Дата отгрузки с завода</th>
                                <th>Модель техники</th>
                                <th>Модель двигателя</th>
                                <th>Модель трансмиссии</th>
                                <th>Модель управляемого моста</th>
                                <th>Модель ведущего моста</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='main-page-info-tr'>
                                <td>{foundMachine.factoryNumber}</td>
                                <td>{foundMachine.shippingDate}</td>
                                <td>{foundMachine.equipmentModel}</td>
                                <td>{foundMachine.engineModel}</td>
                                <td>{foundMachine.transmissionModel}</td>
                                <td>{foundMachine.driveAxleModel}</td>
                                <td>{foundMachine.steeringAxleModel}</td>
                            </tr> 
                    </tbody>
                    </table>
                 </div> : 
                 <div className='main-page-error'>
                    {errorMessage}
                 </div>  
                }
            </div>
        </div>
    )
}

export default MainPage