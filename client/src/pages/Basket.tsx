import React, { useEffect, useState } from 'react'
import { checkBasket, removeBasket } from '../http/basketAPI'
import { Devices } from '../store/DeviceStore'
import style from './styles/BasketStyle.module.css'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const Basket = () => {
  const [devices, setDevices] = useState<Devices[] | null>(null)
  const [checked, setChecked] = useState<any[]>([])
  const [fetchBasket, setFetchBasket] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(()=>{
    checkBasket().then((data)=>{
      setDevices(data)
    })
  }, [fetchBasket])

  return (
    <>
        <ul className={style.list} style={{minHeight: '100vh'}}>
          {
            devices?.map((device)=>
            <li className={`${style.listItem} ` + 
            `${checked.includes(device.id) && style.listItem_checked}`}
            onClick={()=>{checked.includes(device.id) ? 
              setChecked(checked.filter((item)=>item !== device.id)) : 
              setChecked([...checked, device.id])}
            }
            key={device.id}>
              <div 
                onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id)} 
                className={style.imageWrapper}>
                  <img src={device.img} alt=""/>
              </div>
              <p>{device.name}</p>
              <button onClick={(e)=>{
                e.stopPropagation()
                removeBasket(device.id).then(()=>setFetchBasket(!fetchBasket)).catch((e)=>console.log(e)
                )}
              }><CloseOutlined /></button>
            </li>)
          }
        </ul>
    </>
  )
}

export default Basket