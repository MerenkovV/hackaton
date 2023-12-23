import {$authHost} from './index'

export const add = async ({technique_id, service_id, maintenance_type, 
    maintenance_date, worked, order, date_order}) => {
    const {data} = await $authHost.post('api/maintenance', {
        technique_id, service_id, maintenance_type, 
        maintenance_date, worked, order, date_order 
    })
    return data
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/maintenance')
    return data
}