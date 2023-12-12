import {$authHost} from './index'

export const checkBasket = async () => {
    try {
        const {data} = await $authHost.get('api/basket')
        return data
    } catch (error) {
        console.log(error)
    }
    
}

export const addBasket = async (deviceId: number) => {
    try {
        const {data} = await $authHost.post('api/basket', {deviceId})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const removeBasket = async (deviceId: number) => {
    try {
        const {data} = await $authHost.put('api/basket', {deviceId})
        return data
    } catch (error) {
        console.log(error)
    }
}