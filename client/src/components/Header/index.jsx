import './style.css';
import logo from '../../img/Logo.jpg'
import { useNavigate } from "react-router-dom";
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import loader from '../../img/gears-spinner.svg'

const Header = observer(() => {
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login');
    }
    const {user} = useStore()

    const redirectToMain = () => {
        navigate('/');
    }

    return(
    <div className="header">
        <div className="header-first-container">
            <img src={logo} alt="logo" className='header-logo' onClick={redirectToMain}/>
            <div className='header-info'>
                <a href='tel:+78352201209'>+7-8352-20-12-09</a>
                {// eslint-disable-next-line
                }<a href="https://web.telegram.org/" className='header-tg'>Телеграмм</a>
            </div>
            {
                user.isFetching ? 
                <img src={loader} width='50px'/> 
                : 
                <button className='header-auth' onClick={redirectToLogin}>{user.isAuth ? user.user.login : 'Авторизация'}</button>
            }
            
        </div>
        <div className='header-title'>
            Электронная сервисная книжка "Мой&nbsp;Силант"
        </div>
    </div>
    )
})

export default Header