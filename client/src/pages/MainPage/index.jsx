import { observer } from 'mobx-react-lite';
import { getOne } from '../../api/machineAPI';
import { useStore } from '../../store/RootStore';
import './style.css';
import { useState } from 'react';
import loader from '../../img/gears-spinner.svg'
import Table from '../../components/Table/Table';

const MainPage = observer(() =>{
    const [inputID, setInputID] = useState(''); //Заводской № машины введенный в поисковую строку
    const [foundMachine, setMachine] = useState(); //Найденная машина
    const [errorMessage, setErrorMessage] = useState();
    const [tableType, setTableType] = useState('info');
    const {machine, user} = useStore()

    const inputHandle = (inputID) =>{
        setMachine();
        setErrorMessage('');
        setInputID(inputID.target.value)
        if(inputID.target.value === '')
        setTableType('info')
    }

    const findMachine = async () => {
        if(inputID.length > 0){
            machine.setIsFetching(true)
            const machineInfo = await getOne(inputID)
            if(machineInfo) {
                machine.setMachine(machineInfo)
                machine.setIsLoaded(true)
            }
            machine.setIsFetching(false)
            setTableType('info');
            if(!machineInfo){
                setErrorMessage('Ничего не найдено');
            }
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
            
            {
                user.isAuth ? <></> :
                <div className='main-page-search-block'>
                    <input className='main-page-input' placeholder='Заводской номер' type='text' onChange={inputHandle} value={inputID}/>
                    <button className='main-page-search-button' onClick={findMachine}>Поиск</button>
                </div>
            }
            {
                machine.isFetching ? <img src={loader} alt="" width='80px'/> :
                <div>
                {user.isAuth === false && machine.isLoaded ? 
                <div className='main-page-info-block'>
                    <div>Информация о комплектации и технических характеристиках Вашей техники</div>
                    <div className='main-page-type-of-tables'>
                        <button onClick={() => handleTableType('info')} style={{background: tableType === 'info' ? '#3f87d9' : '#163e6c' }}>Общая информация</button>
                        <button onClick={() => handleTableType('to')} style={{background: tableType === 'to' ? '#3f87d9' : '#163e6c' }}>ТО</button>
                        <button onClick={() => handleTableType('advertising')} style={{background: tableType === 'advertising' ? '#3f87d9' : '#163e6c' }}>Рекламация</button>
                    </div>
                    <Table type={''} data={''}/>
                    <div className='main-page-error'>
                        {errorMessage}
                    </div> 
                 </div> : 
                 <>
                    {
                        user.isAuth ? 
                        <>
                        <button className='button-admin' style={{background: '#163e6c' }}>Добавить</button>
                        <button className='button-admin' style={{background: '#163e6c' }}>Изменить</button>
                        </> : <></>
                    }
                 </>
                 
                }
                </div>
            }
            
        </div>
    )
})

export default MainPage