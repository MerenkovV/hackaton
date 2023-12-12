import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout';
import { Button } from 'antd';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Devices } from '../store/DeviceStore';
import './styles/DevicePageStyle.css'

const responsive = {
  0: { items: 1 }
};

const DevicePage = observer(() => {

  const {id} = useParams()

  type deviceStateTypeInfo = {id: number, title: string, description: string}
  type deviceStateType = Devices & {info: deviceStateTypeInfo[]} | null

  const [device, setDevice] = useState<deviceStateType>(null)

  useEffect(()=>{
    fetchOneDevice(Number(id)).then((data)=>{
      setDevice(data)
    })
  }, [])
  

  const items = device?.img ? [<img src={device.img} alt="Device" className='image_element'/>] : [<img alt="Device" className='image_element'/>];
  return (
    <Content style={{padding: '20px 0 0 0', minHeight: '100vh'}}>
      <h2 style={{textAlign: 'center', fontSize: '40px'}}>{device?.name}</h2>
      <div className='top_wrapper'>
        <div className='image_wrapper'>
          <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              controlsStrategy="alternate"
              disableDotsControls
          />
        </div>
        <div>
          <div className='price_container'>
            <p className='price' style={{fontSize: '20px', color: '#fff', background: 'rgb(40 58 97)', padding: '5px 30px', borderRadius: '10px', fontWeight: 600, margin: 0}}>{device?.price}&nbsp;₽</p>
            <Button className='buy_button' type="primary" style={{height: '35px', width: '120px'}}>Купить</Button>
          </div>
          <div className='description-container'>
            <ul className='description_list'>
              {device?.info.map((item: deviceStateTypeInfo)=><li key={item.id} style={{display: 'flex', justifyContent: 'space-between'}}><h3 className='description_name'>{item.title}</h3> <p className='description_value'>{item.description}</p></li>)}
            </ul>
          </div>
        </div>
      </div>
    </Content>
  )
})

export default DevicePage