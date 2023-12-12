import {$host, $authHost} from './index'

export const createType = async (type: any) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand: any) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device: any) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId: number, brandId: number) => {
    const {data} = await $host.get('api/device?' + 
        (typeId&&typeId !== 0 ? `typeId=${typeId}&` : '') + 
        (brandId&&brandId !== 0 ? `brandId=${brandId}&` : ''))
    return data
}

export const fetchOneDevice = async (id: number) => {
    const {data} = await $host.get('api/device/'+id)
    return data
}