import './style.css';
import logo from '../../img/Logo.jpg'
import { useNavigate } from "react-router-dom";
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import loader from '../../img/gears-spinner.svg'
import { useEffect } from 'react';
import { check } from '../../api/userAPI';

const Header = observer(() => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login');
    }
    const {user} = useStore()

    const redirectToMain = () => {
        navigate('/');
    }

    useEffect(()=>{
        user.setIsFetching(true)
        if(localStorage.getItem('token') && localStorage.getItem('token').length > 0){
            check().then((userData)=>{
                user.setUser({...userData.jwt, username: userData.username})
                user.setIsAuth(true)
            }).catch(e=>{console.log(e.message)}).finally(()=>user.setIsFetching(false))
        }else{
            user.setIsFetching(false)
        }
        
    }, [])

    return(
    <div className="header">
        <div className="header-first-container">
            <img src={logo} alt="logo" className='header-logo' height='50px' onClick={redirectToMain}/>
            
            {
                user.isFetching ? 
                <img src={loader} alt='' width='50px'/> 
                : 
                <button className='header-auth' onClick={redirectToLogin}>{user.isAuth ? user.user.login : 'Авторизация'}</button>
            }
            
        </div>
        <div className='header-second-container'>
            <a href='tel:+78352201209'>+7-8352-20-12-09</a>
            <a href="https://web.telegram.org/" className='header-tg'>Телеграм</a>
        </div>
        <div className='header-title'>
            Электронная сервисная книжка "Мой&nbsp;Силант"
        </div>
    </div>
    )
})

export default Header