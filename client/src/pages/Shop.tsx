import React, { useEffect, useState } from 'react'
import { Layout, Card, Skeleton  } from 'antd';
import { useStore } from '../store/RootStore';
import { observer } from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts';
import LeftMenuShop from '../components/LeftMenuShop';
import TopMenuShop from '../components/TopMenuShop';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import style from './styles/ShopStyle.module.css'
import { PlusOutlined } from '@ant-design/icons';
import { addBasket } from '../http/basketAPI';

const { Meta } = Card;
const { Content} = Layout;

const Shop = observer(() => {

  const {device} = useStore()
  const navigate = useNavigate()

  const [currentType, setCurrentType] = useState(0)
  const [currentBrand, setCurrentBrand] = useState(0)
  const [devicesCount, setDevicesCount] = useState(0)

  let gridColumnStyle: string = 'repeat(auto-fit, minmax(260px, 1fr)'

  useEffect(()=>{
    fetchTypes().then((data)=>{
      device.setTypes(data)
    })
    fetchBrands().then((data)=>{
      device.setBrands(data)
    })
  }, [])

  useEffect(()=>{
    device.setIsFetching(true)
    fetchDevices(currentType, currentBrand).then((data)=>{
      device.setDevices(data.rows)
      setDevicesCount(Number(data.count))
      gridColumnStyle = (data.count <= 5 ? 'repeat(auto-fit, 260px)' : 'repeat(auto-fit, minmax(260px, 1fr)')
      device.setIsFetching(false)
    })
  }, [currentType, currentBrand])
  


  return (
     <Layout style={{ minHeight: '100vh' }}>
        <LeftMenuShop device={device} currentType={currentType} setCurrentType={setCurrentType}/>
      <Layout>
        <TopMenuShop device={device} currentBrand={currentBrand} setCurrentBrand={setCurrentBrand}/>
        <Content className={style.content}>
          <div className={style.BackColor}></div>
          <div 
          className={`${style.gridWrapper} ` + `${devicesCount<= 5 ? style.gridWrapper_withFew : style.gridWrapper_withMany}`}>
            {
              device.devices.map((item)=>
              <Card
                key={item.id}
                hoverable
                className={style.card}
                cover={device.isFetching? 
                  <Skeleton.Image 
                    active={true} 
                    style={{width:'auto', paddingTop: '10px', margin: '0px 1px 0px 0px', height:'240px'}}
                  /> 
                  : 
                  <>
                  <button 
                    className={style.addBasketButton}
                    onClick={(e)=>{
                      e.stopPropagation()
                      addBasket(item.id)
                    }}
                  ><PlusOutlined /></button>
                  <img alt="example"
                    src={item.img} 
                    style={{maxWidth:'230px', padding: '10px 5px 0px 5px'}}
                  />
                  </>
                }
                onClick={()=>navigate(DEVICE_ROUTE + '/' + item.id)}
              >
                {device.isFetching ? <Skeleton active={true} paragraph={{ rows: 2 }} title={false}/> : 
                <Meta title={item.name} description={item.price + ' руб'} />}
              </Card>
              )
            }
          </div>
        </Content>
      </Layout>
      </Layout>
  )
})

export default Shop