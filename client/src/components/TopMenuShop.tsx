import React from 'react'
import { Menu, ConfigProvider } from 'antd';
import DeviceStore, { DeviceBrands } from './../store/DeviceStore';

const TopMenuShop = ({device, currentBrand, setCurrentBrand}:{device: DeviceStore, currentBrand: number, setCurrentBrand:(arg0:number)=>void}) => {
  return (
    <ConfigProvider
        theme={{
        components: {
            Menu: {
            horizontalLineHeight: '35px'
            },
        },
        }}
    >
        <div style={{ padding: 0, maxHeight: "40px", alignItems: "center" }}>
        <Menu
        style={{maxHeight: "40px", alignItems: "center", zIndex: 2}}
        theme="dark"
        mode="horizontal"
        items={device.brands.map((brand: DeviceBrands) => ({
            key: brand.id,
            label: brand.name}))}
        selectedKeys={[String(currentBrand)]}
        onClick={(e)=>{
          if(Number(e.key) === currentBrand) return setCurrentBrand(0)
          setCurrentBrand(Number(e.key))
        }}
        />
        </div>
    </ConfigProvider>
  )
}

export default TopMenuShop