import { useState } from 'react';
import './style.css';
//import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { useStore } from './../../store/RootStore';
import { login, registration } from '../../api/userAPI';
import loader from '../../img/gears-spinner.svg'
import GuideCreator from '../../components/GuideCreator/GuideCreator';

const LoginPage = observer(() =>{
    //const navigate = useNavigate();
    const {user} = useStore()
    const [waiting, setWaiting] = useState(false)
    const [payload, setPayload] = useState({
        login: '',
        password: '',
        role: '',
        name: '',
        about: ''
    })

    const clearInput = () => {
        setPayload({
            login: '',
            password: '',
            role: '',
            name: '',
            about: ''
        })
    }

    const guideCreatorData = [
        {name: 'Модель техники', endpoint: 'technique'},  {name: 'Модель двигателя', endpoint: 'engine'},
        {name: 'Модель трансмиссии', endpoint: 'transmission'},  {name: 'Модель ведущего моста', endpoint: 'driving'},
        {name: 'Модель управляемого моста', endpoint: 'controlled'},  {name: 'Вид ТО', endpoint: 'maintenance'},
        {name: 'Характер отказа', endpoint: 'refusal'},  {name: 'Способ восстановления', endpoint: 'recovery'},
    ]

    const signIn = async () => {

        try{
            user.setIsFetching(true)

            if(payload.login.length > 0 && payload.password.length > 0){
                const userData = await login(payload.login, payload.password)
                console.log(userData.username);
                user.setUser({...userData.jwt, username: userData.username})
                clearInput()
                user.setIsAuth(true)
            }

            user.setIsFetching(false)

        }catch(e){
          console.log(e.message)
        }
      }

      const addUser = async () => {
        try{
            if(payload.login.length > 0 && payload.password.length > 0 && payload.role.length > 0){
                
                if(payload.role === "CLIENT" || payload.role === "SERVICE"){
                    if(payload.name.length > 0 && payload.about.length > 0){
                        
                        setWaiting(true)
                        await registration(payload.login, payload.password, payload.role, payload.name, payload.about)
                        alert('Пользователь добавлен')
                        clearInput()
                    }
                }else{
                    setWaiting(true)
                    await registration(payload.login, payload.password, payload.role)
                    alert('Пользователь добавлен')
                    clearInput()
                }
                
                setWaiting(false)
            }
            if(payload.login.length === 0) alert("Введите логин")
            if(payload.password.length === 0) alert("Введите пароль")
            if(payload.role.length === 0) alert("Выберите роль")

        }catch(e){
          console.log(e.message)
        }
      }

    return(
        <div className="login-page">
            {
                user.isFetching ? <img src={loader} alt="" width='80px'/> :
                (user.isAuth ? 
                    <div>
                        <h2>Здравствуйте, {user.user.username ? user.user.username : user.user.login}</h2>
                        <button className="login-page-btn" onClick={()=>{
                            localStorage.setItem('token', '')
                            user.setIsAuth(false)
                        }}>Выйти из аккаунта</button>
                        {user.user.role==='ADMIN' ? 
                            <> 
                            <div className="login-page-title">Добавить пользователя</div>
                            <div className="login-page-form">
                                <input placeholder="Логин" className="login-page-input login-label" value={payload.login}
                                    onChange={(e)=>{
                                        setPayload({...payload, login: e.target.value})
                                    }}/>
                                <input placeholder="Пароль" className="login-page-input password-label" value={payload.password}
                                    onChange={(e)=>{
                                            setPayload({...payload, password: e.target.value})
                                        }}/>
                                <select name="role" id="login-page-select"
                                    value={payload.role}
                                    onChange={(e)=>{
                                        setPayload({...payload, role: e.target.value})
                                    }}>
                                    <option value="">--Роль пользователя--</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="CLIENT">CLIENT</option>
                                    <option value="SERVICE">SERVICE</option>
                                </select>
                                {
                                    ((payload.role === 'CLIENT') || (payload.role === 'SERVICE')) && <>
                                        <input placeholder="Название" className="login-page-input login-label" value={payload.name}
                                            onChange={(e)=>{
                                                setPayload({...payload, name: e.target.value})
                                            }}/>
                                        <input placeholder="Описание" className="login-page-input password-label" value={payload.about}
                                            onChange={(e)=>{
                                                setPayload({...payload, about: e.target.value})
                                            }}/>
                                    </>
                                }
                                {
                                    waiting ? <img src={loader} alt="" width='60px'/> :
                                    <button className="login-page-btn" onClick={addUser}>Зарегистрировать</button>
                                }
                            </div>
                            </> 
                        : 
                            <>
                                
                                {
                                  user.user.role==='MANAGER' && <>
                                    <h3>Создание справочников</h3>
                                    <div className='guide-wrapper'>
                                        {
                                            guideCreatorData.map((item, index)=><GuideCreator key={index} name={item.name} endpoint={item.endpoint}/>)
                                        }
                                    </div>
                                  </>
                                    
                                }
                            </>
                        }
                       
                    </div>
                    
                    : 
                    <>
                    <div className="login-page-title">Авторизация</div>
                    <div className="login-page-form">
                        <input placeholder="Логин" className="login-page-input" value={payload.login}
                            onChange={(e)=>{setPayload({login: e.target.value, password: payload.password})}}/>
                        <input type='password' placeholder="Пароль" className="login-page-input" value={payload.password}
                            onChange={(e)=>{setPayload({login: payload.login, password: e.target.value})}}/>
                        <button className="login-page-btn" onClick={signIn}>Войти</button>
                    </div> 
                    </>)
            }
            
        </div>
    )
})

export default LoginPage