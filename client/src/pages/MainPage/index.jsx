import { observer } from 'mobx-react-lite';
import { getAll, getOne } from '../../api/machineAPI';
import { getAll as getMainterance} from '../../api/maintenanceAPI';
import { getAll as getComplaint} from '../../api/complaintAPI';
import { useStore } from '../../store/RootStore';
import './style.css';
import { useEffect, useState } from 'react';
import loader from '../../img/gears-spinner.svg'
import Table from '../../components/Table/Table';
import ModalMachine from './../../components/Modal/ModalMachine';
import { get } from '../../api/guideAPI';
import ModalTO from '../../components/Modal/ModalTO';
import ModalComplaint from '../../components/Modal/ModalComplaint';

const MainPage = observer(() =>{
    const [inputID, setInputID] = useState(''); //Заводской № машины введенный в поисковую строку
    const [foundMachine, setMachine] = useState(); //Найденная машина
    const [isOpened, setIsOpened] = useState(false)
    const [errorMessage, setErrorMessage] = useState();
    const [tableType, setTableType] = useState('info');
    const {machine, user, guide, mainterance, complaint} = useStore();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(()=>{
        guide.setIsFetching(true)
        get().then(data=>guide.setGuide(data))
            .catch(e=>console.log(e.message))
            .finally(()=>{
                guide.setIsFetching(false)
            })
    }, [])

    useEffect(()=>{
        if(user.isAuth && user.user?.role !== 'ADMIN'){
            machine.setIsFetching(true)
            getAll().then(data=>machine.setMachine(data.rows))
                .catch(e=>console.log(e))
                .finally(()=>{
                    machine.setIsFetching(false)
                })
        }
    }, [user.isAuth])

    useEffect(()=>{
        if(tableType === "to"){
            mainterance.setIsFetching(true)
            getMainterance().then(data=>{
                mainterance.setMainterance(data.rows)
            })
                .catch(e=>console.log(e))
                .finally(()=>{
                    mainterance.setIsFetching(false)
                })
        }
        if(tableType === "advertising"){
            complaint.setIsFetching(true)
            getComplaint().then(data=>{
                complaint.setComplaint(data.rows)
            })
                .catch(e=>console.log(e))
                .finally(()=>{
                    complaint.setIsFetching(false)
                })
        }
    }, [tableType])

    const inputHandle = (inputID) =>{
        setMachine();
        setHasLoaded(false);
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
                machine.setMachine(machineInfo);
                machine.setIsLoaded(true);
                setHasLoaded(true);
                setMachine(machineInfo);
            }
            machine.setIsFetching(false);
            setTableType('info');
            if(!machineInfo){
                setErrorMessage('Ничего не найдено');
                setHasLoaded(false);
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
            {
                isOpened && tableType === "info" ? <ModalMachine setIsOpened={setIsOpened}/> : <></>
            }
            {
                isOpened && tableType === "to" ? <ModalTO setIsOpened={setIsOpened}/> : <></>
            }
            {
                isOpened && tableType === "advertising" ? <ModalComplaint setIsOpened={setIsOpened}/> : <></>
            }
            
            {/*
                user.isAuth ? <></> :
                <div className='main-page-search-block'>
                    <input className='main-page-input' placeholder='Заводской номер' type='text' onChange={inputHandle} value={inputID}/>
                    <button className='main-page-search-button' onClick={findMachine}>Поиск</button>
                </div>
            */}
            {
                (!user.isAuth || user.user?.role === 'ADMIN') && <>
                    <div className='main-page-title'>Проверьте комплектацию и технические характеристики техники Силант</div>
                    <div className='main-page-search-block'>
                        <input className='main-page-input' placeholder='Заводской номер' type='text' onChange={inputHandle} value={inputID}/>
                        <button className='main-page-search-button' onClick={findMachine}>Поиск</button>
                    </div>
                </>
            }
                
            {
                (machine.isFetching || guide.isFetching) ? <img src={loader} alt="" width='80px'/> :
                <div>

                <div className='main-page-info-block'>
                    <div>Информация о комплектации и технических характеристиках Вашей техники</div>
                    <div className='main-page-type-of-tables'>
                        <button onClick={() => handleTableType('info')} style={{background: tableType === 'info' ? '#3f87d9' : '#163e6c' }}>Общая информация</button>
                        {
                            user.isAuth && user?.user?.role !== 'ADMIN' && <>
                                <button onClick={() => handleTableType('to')} style={{background: tableType === 'to' ? '#3f87d9' : '#163e6c' }}>ТО</button>
                                <button onClick={() => handleTableType('advertising')} style={{background: tableType === 'advertising' ? '#3f87d9' : '#163e6c' }}>Рекламация</button>
                            </>
                        }
                    </div>
                    {
                        (machine.isFetching || guide.isFetching || mainterance.isFetching || complaint.isFetching) ? <img src={loader} alt="" width='80px'/> : <Table type={tableType}/>
                    }
                    <div className='main-page-error'>
                        {errorMessage}
                    </div> 
                 </div>
                 <div className='main-page-editing-block'>
                    {
                        user.isAuth ? 
                        <>
                        {
                            user.user.role === "MANAGER" && tableType === "info" && <button className='button-admin' style={{background: '#163e6c' }}
                            onClick={()=>setIsOpened(true)}>Добавить технику</button>
                        }

                        {   
                            tableType === "to" && <button className='button-admin' style={{background: '#163e6c' }}
                            onClick={()=>setIsOpened(true)}>Добавить ТО</button>
                        }

                        {   
                            tableType === "advertising" && <button className='button-admin' style={{background: '#163e6c' }}
                            onClick={()=>setIsOpened(true)}>Добавить рекламацию</button>
                        }
                        </> : <></>
                    }
                 </div>
                
                </div>
            }
            
        </div>
    )
})

export default MainPage