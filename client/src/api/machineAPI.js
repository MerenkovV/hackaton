import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

export const add = async ({technique_id, technique_model, engine_model, engine_number,
    transmission_model, transmission_number, driving_model, driving_number,
    controlled_model, controlled_number, delivery_number, shipment_date,
    end_user, delivery_address, equipment, client_id, service_id }) => {
    const {data} = await $authHost.post('api/technique', {
        technique_id, technique_model, engine_model, engine_number,
        transmission_model, transmission_number, driving_model, driving_number,
        controlled_model, controlled_number, delivery_number, shipment_date,
        end_user, delivery_address, equipment, client_id, service_id })
    return data
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/technique')
    return data
}

export const getOne = async (id) => {
    try {
        const {data} = await $host.get(`/api/technique/${id}`)
        if(data){
            return data
        }
    } catch (error) {
        if(error.message === 'Машина не найдена') return jwtDecode({})
            else console.log(error.message);
    }
    
}