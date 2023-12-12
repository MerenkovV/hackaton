import React from 'react'
import { useStore } from '../store/RootStore'
import { Header } from 'antd/es/layout/layout'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import style from './styles/NavBarStyle.module.css'
import { observer } from 'mobx-react-lite'
import { Popover, Button } from 'antd';

const NavBar = observer(() => {
    const {user} = useStore()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

  return (
    <Header style={{display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 100}}>
        <NavLink className={style.logo} to={SHOP_ROUTE}>Device70</NavLink>
        <div className={style.login_panel}>
            {user.isAuth ?
            <Popover content={<Button type='dashed' size='large' onClick={()=>logOut()}>Выйти</Button>}>
                <NavLink to={LOGIN_ROUTE}>
                    <UserOutlined />
                </NavLink>
            </Popover> 
            :
            <NavLink to={LOGIN_ROUTE}>
                <UserOutlined />
            </NavLink>
            }

            <NavLink to={BASKET_ROUTE}>
                <ShoppingCartOutlined />
            </NavLink>

        </div>
    </Header>
  )
})

export default NavBar