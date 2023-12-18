import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

export const add = async (login, password, role) => {
    const {data} = await $authHost.post('api/user/registration', {login, password, role})
    return jwtDecode(data)
}

export const getAll = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getOne = async (id) => {
    try {
        const {data} = await $host.get(`/api/technique/${id}`)
        if(data){
            return jwtDecode(data)
        }
    } catch (error) {
        if(error.message === 'Машина не найдена') return jwtDecode({})
            else console.log(error.message);
    }
    
}