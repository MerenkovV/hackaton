import React, { useEffect } from 'react'
import { Content } from 'antd/es/layout/layout'
import { Button, Checkbox, Form, Input, Collapse, message, Spin, CollapseProps } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useStore } from '../store/RootStore';
import AddingAdminForm from '../components/AddingAdminForm';
import AddingDeviceAdminForm from '../components/AddingDeviceAdminForm';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { createBrand, createDevice, createType, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { LoadingOutlined } from '@ant-design/icons';
import style from './styles/AuthStyle.module.css'

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Auth = observer(() => {

  const [messageApi, contextHolder] = message.useMessage();
  const {pathname} = useLocation()
  const {user, device} = useStore()
  const isLogin = pathname === '/login'

  const onFinishAddType = (values: any) => {
    createType(values).then(()=>{
      messageApi.success('Тип добавлен')
      fetchAll()
    }).catch((e)=>messageApi.error(e.response.data.message))
  };
  
  const onFinishAddBrand = (values: any) => {
    createBrand(values).then(()=>{
      messageApi.success('Бренд добавлен')
      fetchAll()
    }).catch((e)=>messageApi.error(e.response.data.message))
  };
  
  const onFinishAddDevice = (values: any) => {
    let formData = new FormData()
    formData.append('name', `${values.name}`)
    formData.append('price', `${values.price}`)
    formData.append('img', values.img[0].originFileObj)
    formData.append('brandId', `${values.brandId}`)
    formData.append('typeId', `${values.typeId}`)
    if(values.info) formData.append('info', JSON.stringify(values.info))
    else formData.append('info', JSON.stringify([]))
    
    createDevice(formData).then(()=>{
      messageApi.success('Девайс добавлен')
    }).catch(e=>messageApi.error(e.response.data.message))
  };

  const fetchAll = () => {
    fetchTypes().then((data)=>{
      device.setTypes(data)
    })
    fetchBrands().then((data)=>{
      device.setBrands(data)
    })
  }

  useEffect(()=>fetchAll(), [])

  const signIn = async ({email, password}: {email: string, password: string}) => {
    try{
      let userData;    
      if(isLogin){
        userData = await login(email, password)
      }else{
        userData = await registration(email, password)
      }
    
      user.setUser(userData)
      user.setIsAuth(true)
    }catch(e: any){
      alert(e.response.data.message)
    }
  }
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Создать тип продукта',
      children: <AddingAdminForm onFinish={onFinishAddType} name="Type"/>,
    },
    {
      key: '2',
      label: 'Создать бренд',
      children: <AddingAdminForm onFinish={onFinishAddBrand} name="Brand"/>,
    },
    {
      key: '3',
      label: 'Создать девайс',
      children: <AddingDeviceAdminForm onFinish={onFinishAddDevice} device={device}/>,
    },
  ];

  return (
    <>
    {contextHolder}
    <Content style={{ minHeight: '100vh'}}>
      {user.isFetching ? 
      <div style={{padding: '25px 0 0 55px'}}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div> :
      user.isAuth ? 
      <div className={style.adminWrapper}>
        <h2>Здравствуйте, {user.user.email}</h2>
        {
          user.user.role === 'ADMIN' && 
          <Collapse style={{maxWidth: '80vw'}} accordion items={items}/>
        }
      </div> 
      :
      <div style={{paddingTop: '25px'}}>
        {isLogin ? 
        <h3 style={{padding: '0 0 0 115px'}}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink></h3> :
        <h3 style={{padding: '0 0 0 115px'}}>Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Авторизируйтесь!</NavLink></h3>
        }
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={signIn}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      }
    </Content>
    </>
  )
})

export default Auth