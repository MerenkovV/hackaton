import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

export const add = async (name, about, endpoint) => {
    const {data} = await $authHost.post(`api/guide/${endpoint}`, {name, about})
    return jwtDecode(data)
}

export const put = async (name, about, endpoint) => {
    const {data} = await $authHost.put(`api/guide/${endpoint}`, {name, about})
    return jwtDecode(data)
}

export const get = async (params) => {
    const {data} = await $authHost.put(`api/guide/?${endpoint}`)
    return jwtDecode(data)
}