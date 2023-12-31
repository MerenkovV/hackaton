import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

export const registration = async (login, password, role, name, description) => {
    if(role === "CLIENT" || role === "SERVICE") {
        const {data} = await $authHost.post('api/user/registration', {login, password, role, name, description})
        return data
    }else{
        const {data} = await $authHost.post('api/user/registration', {login, password, role})
        return data
    }
    
}

export const login = async (login, password) => {
    for(let i = 0; i < 2; i++){
        const {data} = await $host.post('api/user/login', {login, password})
        if(data){
            localStorage.setItem('token', data.token)
            return {jwt: jwtDecode(data.token), username: data.username}
        }
        i++
    }
}

export const check = async () => {
    for(let i = 0; i < 2; i++){
        const {data} = await $authHost.get('api/user/auth')
        if(data){
            localStorage.setItem('token', data.token)
            return {jwt: jwtDecode(data.token), username: data.username}
        }
        i++
    }
    

}