import {$authHost} from './index'

export const add = async ({technique_id, service_id, description, 
    spare_parts, worked, date_repair, 
    downtime, refusal_id, recovery_id, 
    date_complaints}) => {
    const {data} = await $authHost.post('api/complaint', {
        technique_id, service_id, description, 
        spare_parts, worked, date_repair, 
        downtime, refusal_id, recovery_id, 
        date_complaints
    })
    return data
}

export const getAll = async () => {
    const {data} = await $authHost.get('api/complaint')
    return data
}