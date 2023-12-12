import React, {useState, useEffect} from 'react'
import { Layout, Menu } from 'antd'
import DeviceStore, { DeviceTypes } from '../store/DeviceStore';
import style from './styles/LeftMenuStyle.module.css'
const { Sider } = Layout;

const LeftMenuShop = ({device, currentType, setCurrentType}: {device: DeviceStore, currentType: number, setCurrentType:(arg0:number)=>void}) => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(()=>{if(window.outerWidth < 500) setCollapsed(true)}, [])
    
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{zIndex: 2}} className={style.leftMenu}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" 
        items={device.types.map((type:DeviceTypes)=>({label: type.name, key: type.id}))}
        selectedKeys={[String(currentType)]}
        style={{position: 'relative', zIndex: 2}}
        onClick={(e)=>{
          if(Number(e.key) === currentType) return setCurrentType(0)
          setCurrentType(Number(e.key))
        }}
        />
    </Sider>
    )
}

export default LeftMenuShop