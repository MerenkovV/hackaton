import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

type jwtType = {
    email: string, exp: number, 
    iat: number, id: number, 
    role: 'ADMIN' | 'USER'
}

export const registration = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token) as jwtType
}

export const login = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token) as jwtType
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    if(data){
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token) as jwtType
    }
}