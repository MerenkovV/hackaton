import { intercept } from 'mobx';
import React, { useEffect, useState } from 'react';
import './style.css';
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';


const Table = observer(({type}) => {
    const {machine, user, guide, mainterance, complaint} = useStore()
    let [headerArray, setHeaderArray] = useState([]);
    let [guideInserted, setGuideInserted] = useState({})
    let [sortCol, setSortCol] = useState(0)

    const MachineInsert = () =>{
        if(!user.isAuth || user.user?.role === 'ADMIN'){
            setGuideInserted({...guideInserted, 
                driving: guide.guide?.driving?.find((item)=>item.id===machine.machine[0]?.drivingBridgeModelId),
                engine: guide.guide?.engine?.find((item)=>item.id===machine.machine[0]?.engineModelId),
                technique: guide.guide?.technique?.find((item)=>item.id===machine.machine[0]?.techniqueModelId),
                transmission: guide.guide?.transmission?.find((item)=>item.id===machine.machine[0]?.transmissionModelId),
                controlled: guide.guide?.controlled?.find((item)=>item.id===machine.machine[0]?.controlledBridgeModelId),
            })
        }else{
            let rawInsertedArray = []
            
            machine.machine.map((item, index)=>{
                    rawInsertedArray[index] = {}
                for(let key in item){
                    
                    if(item[key] === "createdAt" || item[key] === "updatedAt") continue
                    if(key === "controlledBridgeModelId") {
                        rawInsertedArray[index][key] = guide.guide?.controlled?.find((item)=>item.id===machine.machine[index]?.controlledBridgeModelId)
                        continue
                    }
                    if(key === "drivingBridgeModelId") {
                        rawInsertedArray[index][key] = guide.guide?.driving?.find((item)=>item.id===machine.machine[index]?.drivingBridgeModelId)
                        continue
                    }
                    if(key === "engineModelId") {
                        rawInsertedArray[index][key] = guide.guide?.engine?.find((item)=>item.id===machine.machine[index]?.engineModelId)
                        continue
                    }
                    if(key === "techniqueModelId") {
                        rawInsertedArray[index][key] = guide.guide?.technique?.find((item)=>item.id===machine.machine[index]?.techniqueModelId)
                        continue
                    }
                    if(key === "transmissionModelId") {
                        rawInsertedArray[index][key] = guide.guide?.transmission?.find((item)=>item.id===machine.machine[index]?.transmissionModelId)
                        continue
                    }
                    if(key === "serviceCompanyId") {
                        rawInsertedArray[index][key] = guide.guide?.service?.find((item)=>item.id===machine.machine[index]?.serviceCompanyId)
                        continue
                    }
                    if(key === "userId") {
                        rawInsertedArray[index][key] = guide.guide?.clients?.find((item)=>item.userId===machine.machine[index]?.userId)
                        continue
                    }
                    if(machine.machine[index][key] !== undefined){
                        rawInsertedArray[index][key] = machine.machine[index][key]
                    }
                    
                }
            })
            setGuideInserted(rawInsertedArray)
        }
        
    }

    const MainteranceInsert = () =>{
            let rawInsertedArray = []
            
            mainterance.mainterance.map((item, index)=>{
                    rawInsertedArray[index] = {}
                for(let key in item){
                    
                    if(item[key] === "createdAt" || item[key] === "updatedAt") continue
                    if(key === "maintenanceTypeId") {
                        rawInsertedArray[index][key] = guide.guide?.maintenance?.find((item)=>item.id===mainterance.mainterance[index]?.maintenanceTypeId)
                        continue
                    }
                    if(key === "serviceCompanyId") {
                        rawInsertedArray[index][key] = guide.guide?.service?.find((item)=>item.id===mainterance.mainterance[index]?.serviceCompanyId)
                        continue
                    }
                    if(mainterance.mainterance[index][key] !== undefined){
                        rawInsertedArray[index][key] = mainterance.mainterance[index][key]
                    }
                    
                }
            })
            setGuideInserted(rawInsertedArray)
        }
    
    const ComplaintInsert = () =>{
        let rawInsertedArray = []
        complaint.complaint.map((item, index)=>{
                rawInsertedArray[index] = {}
            for(let key in item){
                
                if(item[key] === "createdAt" || item[key] === "updatedAt") continue
                if(key === "recoveryMethodId") {
                    rawInsertedArray[index][key] = guide.guide?.recovery?.find((item)=>item.id===complaint.complaint[index]?.recoveryMethodId)
                    continue
                }
                if(key === "refusalTypeId") {
                    rawInsertedArray[index][key] = guide.guide?.refusal?.find((item)=>item.id===complaint.complaint[index]?.refusalTypeId)
                    continue
                }
                if(key === "serviceCompanyId") {
                    rawInsertedArray[index][key] = guide.guide?.service?.find((item)=>item.id===complaint.complaint[index]?.serviceCompanyId)
                    continue
                }
                if(complaint.complaint[index][key] !== undefined){
                    rawInsertedArray[index][key] = complaint.complaint[index][key]
                }
                
            }
        })

        setGuideInserted(rawInsertedArray)
    }

    // const sortFunction = (a, b) => {
    //     if (a.name > b.name) {
    //         return 1;
    //       }
    //       if (a.name < b.name) {
    //         return -1;
    //       }
    //       // a должно быть равным b
    //       return 0;
    // }

    const sortInserted = (col) => {
        if(guideInserted){
            let guideInsertedCopy = [...guideInserted]

            if(col === sortCol){
                if(type === "info"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.id > b.id) {
                                    return -1;
                                }
                                if (a.id < b.id) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.techniqueModelId?.name > b.techniqueModelId?.name) {
                                    return -1;
                                }
                                if (a.techniqueModelId?.name < b.techniqueModelId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.engineModelId?.name > b.engineModelId?.name) {
                                    return -1;
                                }
                                if (a.engineModelId?.name < b.engineModelId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.engine_number > b.engine_number) {
                                    return -1;
                                }
                                if (a.engine_number < b.engine_number) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.transmissionModelId?.name > b.transmissionModelId?.name) {
                                    return -1;
                                }
                                if (a.transmissionModelId?.name < b.transmissionModelId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.transmission_number > b.transmission_number) {
                                    return -1;
                                }
                                if (a.transmission_number < b.transmission_number) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.drivingBridgeModelId?.name > b.drivingBridgeModelId?.name) {
                                    return -1;
                                }
                                if (a.drivingBridgeModelId?.name < b.drivingBridgeModelId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 8:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.driving_bridge_number > b.driving_bridge_number) {
                                    return -1;
                                }
                                if (a.driving_bridge_number < b.driving_bridge_number) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 9:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.controlledBridgeModelId?.name > b.controlledBridgeModelId?.name) {
                                    return -1;
                                }
                                if (a.controlledBridgeModelId?.name < b.controlledBridgeModelId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 10:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.controlled_bridge_number > b.controlled_bridge_number) {
                                    return -1;
                                }
                                if (a.controlled_bridge_number < b.controlled_bridge_number) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 11:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.delivery_number > b.delivery_number) {
                                    return -1;
                                }
                                if (a.delivery_number < b.delivery_number) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 12:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.shipment_date > b.shipment_date) {
                                    return -1;
                                }
                                if (a.shipment_date < b.shipment_date) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 13:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.end_user > b.end_user) {
                                    return -1;
                                }
                                if (a.end_user < b.end_user) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 14:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.delivery_address > b.delivery_address) {
                                    return -1;
                                }
                                if (a.delivery_address < b.delivery_address) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 15:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.equipment > b.equipment) {
                                    return -1;
                                }
                                if (a.equipment < b.equipment) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 16:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.userId?.name > b.userId?.name) {
                                    return -1;
                                }
                                if (a.userId?.name < b.userId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 17:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                    
                }
                if(type === "to"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.machineId > b.machineId) {
                                    return -1;
                                }
                                if (a.machineId < b.machineId) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.maintenanceTypeId?.name > b.maintenanceTypeId?.name) {
                                    return -1;
                                }
                                if (a.maintenanceTypeId?.name < b.maintenanceTypeId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_maintenance > b.date_maintenance) {
                                    return -1;
                                }
                                if (a.date_maintenance < b.date_maintenance) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.worked > b.worked) {
                                    return -1;
                                }
                                if (a.worked < b.worked) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.order > b.order) {
                                    return -1;
                                }
                                if (a.order < b.order) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_order > b.date_order) {
                                    return -1;
                                }
                                if (a.date_order < b.date_order) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                }
                if(type === "advertising"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.machineId > b.machineId) {
                                    return -1;
                                }
                                if (a.machineId < b.machineId) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_complaints > b.date_complaints) {
                                    return -1;
                                }
                                if (a.date_complaints < b.date_complaints) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.worked > b.worked) {
                                    return -1;
                                }
                                if (a.worked < b.worked) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.refusalTypeId?.name > b.refusalTypeId?.name) {
                                    return -1;
                                }
                                if (a.refusalTypeId?.name < b.refusalTypeId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.description > b.description) {
                                    return -1;
                                }
                                if (a.description < b.description) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.recoveryMethodId?.name > b.recoveryMethodId?.name) {
                                    return -1;
                                }
                                if (a.recoveryMethodId?.name < b.recoveryMethodId?.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 8:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.spare_parts > b.spare_parts) {
                                    return -1;
                                }
                                if (a.spare_parts < b.spare_parts) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 9:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_repair > b.date_repair) {
                                    return -1;
                                }
                                if (a.date_repair < b.date_repair) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        case 10:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.downtime > b.downtime) {
                                    return -1;
                                }
                                if (a.downtime < b.downtime) {
                                    return 1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                }
                setSortCol(0 - col)
                setGuideInserted(guideInsertedCopy)
            }else{
                if(type === "info"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.id > b.id) {
                                    return 1;
                                }
                                if (a.id < b.id) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.techniqueModelId?.name > b.techniqueModelId?.name) {
                                    return 1;
                                }
                                if (a.techniqueModelId?.name < b.techniqueModelId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.engineModelId?.name > b.engineModelId?.name) {
                                    return 1;
                                }
                                if (a.engineModelId?.name < b.engineModelId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.engine_number > b.engine_number) {
                                    return 1;
                                }
                                if (a.engine_number < b.engine_number) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.transmissionModelId?.name > b.transmissionModelId?.name) {
                                    return 1;
                                }
                                if (a.transmissionModelId?.name < b.transmissionModelId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.transmission_number > b.transmission_number) {
                                    return 1;
                                }
                                if (a.transmission_number < b.transmission_number) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.drivingBridgeModelId?.name > b.drivingBridgeModelId?.name) {
                                    return 1;
                                }
                                if (a.drivingBridgeModelId?.name < b.drivingBridgeModelId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 8:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.driving_bridge_number > b.driving_bridge_number) {
                                    return 1;
                                }
                                if (a.driving_bridge_number < b.driving_bridge_number) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 9:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.controlledBridgeModelId?.name > b.controlledBridgeModelId?.name) {
                                    return 1;
                                }
                                if (a.controlledBridgeModelId?.name < b.controlledBridgeModelId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 10:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.controlled_bridge_number > b.controlled_bridge_number) {
                                    return 1;
                                }
                                if (a.controlled_bridge_number < b.controlled_bridge_number) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 11:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.delivery_number > b.delivery_number) {
                                    return 1;
                                }
                                if (a.delivery_number < b.delivery_number) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 12:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.shipment_date > b.shipment_date) {
                                    return 1;
                                }
                                if (a.shipment_date < b.shipment_date) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 13:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.end_user > b.end_user) {
                                    return 1;
                                }
                                if (a.end_user < b.end_user) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 14:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.delivery_address > b.delivery_address) {
                                    return 1;
                                }
                                if (a.delivery_address < b.delivery_address) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 15:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.equipment > b.equipment) {
                                    return 1;
                                }
                                if (a.equipment < b.equipment) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 16:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.userId?.name > b.userId?.name) {
                                    return 1;
                                }
                                if (a.userId?.name < b.userId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 17:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                    
                }
                if(type === "to"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.machineId > b.machineId) {
                                    return 1;
                                }
                                if (a.machineId < b.machineId) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.maintenanceTypeId?.name > b.maintenanceTypeId?.name) {
                                    return 1;
                                }
                                if (a.maintenanceTypeId?.name < b.maintenanceTypeId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_maintenance > b.date_maintenance) {
                                    return 1;
                                }
                                if (a.date_maintenance < b.date_maintenance) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.worked > b.worked) {
                                    return 1;
                                }
                                if (a.worked < b.worked) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.order > b.order) {
                                    return 1;
                                }
                                if (a.order < b.order) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_order > b.date_order) {
                                    return 1;
                                }
                                if (a.date_order < b.date_order) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                }
                if(type === "advertising"){
                    switch (col){
                        case 1:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.machineId > b.machineId) {
                                    return 1;
                                }
                                if (a.machineId < b.machineId) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 2:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.serviceCompanyId?.name > b.serviceCompanyId?.name) {
                                    return 1;
                                }
                                if (a.serviceCompanyId?.name < b.serviceCompanyId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 3:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_complaints > b.date_complaints) {
                                    return 1;
                                }
                                if (a.date_complaints < b.date_complaints) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 4:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.worked > b.worked) {
                                    return 1;
                                }
                                if (a.worked < b.worked) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 5:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.refusalTypeId?.name > b.refusalTypeId?.name) {
                                    return 1;
                                }
                                if (a.refusalTypeId?.name < b.refusalTypeId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 6:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.description > b.description) {
                                    return 1;
                                }
                                if (a.description < b.description) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 7:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.recoveryMethodId?.name > b.recoveryMethodId?.name) {
                                    return 1;
                                }
                                if (a.recoveryMethodId?.name < b.recoveryMethodId?.name) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 8:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.spare_parts > b.spare_parts) {
                                    return 1;
                                }
                                if (a.spare_parts < b.spare_parts) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 9:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.date_repair > b.date_repair) {
                                    return 1;
                                }
                                if (a.date_repair < b.date_repair) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        case 10:
                            guideInsertedCopy.sort((a,b)=>{
                                if (a.downtime > b.downtime) {
                                    return 1;
                                }
                                if (a.downtime < b.downtime) {
                                    return -1;
                                }
                                return 0;
                            })
                        break;
                        default: break
                    }
                }
                setSortCol(col)
                setGuideInserted(guideInsertedCopy)
            }
        
        }
        
    }

    useEffect(()=>{
        setSortCol(0)
    }, [type])

    useEffect(()=>{
        if(!machine.isFetching && !guide.isFetching && type === "info") MachineInsert()
        if(!mainterance.isFetching && !guide.isFetching && type === "to") MainteranceInsert()
        if(!complaint.isFetching && !guide.isFetching && type === "advertising") ComplaintInsert()
    }, [type, machine.isFetching, guide.isFetching, mainterance.isFetching, complaint.isFetching])

    useEffect(()=>{
        if(user.isAuth && user?.user?.role !== 'ADMIN'){
            switch (type) {
                case 'info':
                    setHeaderArray([
                    'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
                    'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста', 'Зав. № ведущего моста',
                    'Модель управляемого моста', 'Зав. № управляемого моста', 'Договор поставки №, дата',
                    'Дата отгрузки с завода', 'Грузополучатель', 'Адрес поставки', 'Комплектация',
                    'Клиент', 'Сервисная компания'
                ])
                    break;
                case 'to':
                    setHeaderArray([
                    'Машина', 'Сервисная компания', 'Вид ТО', 'Дата проведения ТО', 'Наработка, м/час', '№ заказ-наряда', 'Дата заказ-наряда',
                ])
                    break;
                case 'advertising':
                    setHeaderArray([
                    'Машина','Сервисная компания','Дата отказа', 'Наработка, м/час',
                     'Узел отказа', 'Описание отказа','Способ восстановления', 
                     'Используемые запасные части', 'Дата восстановления', 
                     'Время простоя техники'
                ])
                    break;
                default: 
                    break;
            }
        }else{
            if(type === 'info'){
                setHeaderArray([
                    'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
                    'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста', 'Зав. № ведущего моста',
                    'Модель управляемого моста', 'Зав. № управляемого моста'
                ])
            }
        }
    }, [user.isAuth, type])



  return (
    <div className='table-block'>
        <table className='main-table' style={{width: user.isAuth && user?.user?.role !== 'ADMIN' ? '2300px' : '1200px'}}>
            <thead>
                <tr className='main-page-info-head-tr'>
                    {headerArray.map((item, index)=><th key={index} onClick={()=>sortInserted(index+1)}>{item}</th>)}
                </tr>
            </thead>
            <tbody>

                {(!user.isAuth || user?.user?.role === 'ADMIN') && type === 'info'  ? 
                    <tr className='main-page-info-tr'>
                        <td>{machine.machine[0]?.id}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted.technique?.about)
                        }}>{guideInserted.technique?.name}</a></td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted.engine?.about)
                        }}>{guideInserted.engine?.name}</a></td>
                        <td>{machine.machine[0]?.engine_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted.transmission?.about)
                        }}>{guideInserted.transmission?.name}</a></td>
                        <td>{machine.machine[0]?.transmission_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted.driving?.about)
                        }}>{guideInserted.driving?.name}</a></td>
                        <td>{machine.machine[0]?.driving_bridge_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted.controlled?.about)
                        }}>{guideInserted.controlled?.name}</a></td>
                        <td>{machine.machine[0]?.controlled_bridge_number}</td>
                    </tr> :
                    type === 'info' && user?.user?.role !== 'ADMIN' &&
                        Array.isArray(guideInserted) &&
                        guideInserted.map((item, index)=><tr key={index} className='main-page-info-tr'> 
                            <td>{guideInserted[index]?.id}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].techniqueModelId?.about)
                        }}>{guideInserted[index].techniqueModelId?.name}</a></td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].engineModelId?.about)
                        }}>{guideInserted[index].engineModelId?.name}</a></td>
                        <td>{guideInserted[index]?.engine_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].transmissionModelId?.about)
                        }}>{guideInserted[index].transmissionModelId?.name}</a></td>
                        <td>{guideInserted[index]?.transmission_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].drivingBridgeModelId?.about)
                        }}>{guideInserted[index].drivingBridgeModelId?.name}</a></td>
                        <td>{guideInserted[index]?.driving_bridge_number}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].controlledBridgeModelId?.about)
                        }}>{guideInserted[index].controlledBridgeModelId?.name}</a></td>
                        <td>{guideInserted[index]?.controlled_bridge_number}</td>
                        <td>{guideInserted[index]?.delivery_number}</td>
                        <td>{guideInserted[index]?.shipment_date}</td>
                        <td>{guideInserted[index]?.end_user}</td>
                        <td>{guideInserted[index]?.delivery_address}</td>
                        <td>{guideInserted[index]?.equipment}</td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].userId?.description)
                        }}>{guideInserted[index].userId?.name}</a></td>
                        <td><a href="#" onClick={(e)=>{
                            e.preventDefault()
                            alert(guideInserted[index].serviceCompanyId?.description)
                        }}>{guideInserted[index].serviceCompanyId?.name}</a></td>
                        </tr>)
                    
                }
                {
                    type === 'to' && Array.isArray(guideInserted) &&
                    guideInserted.map((item, index)=><tr key={index} className='main-page-info-tr'> 
                    <td>{guideInserted[index]?.machineId}</td>
                    <td><a href="#" onClick={(e)=>{
                        e.preventDefault()
                        alert(guideInserted[index].serviceCompanyId?.description)
                    }}>{guideInserted[index].serviceCompanyId?.name}</a></td>
                    
                    <td><a href="#" onClick={(e)=>{
                        e.preventDefault()
                        alert(guideInserted[index].maintenanceTypeId?.about)
                    }}>{guideInserted[index].maintenanceTypeId?.name}</a></td>

                    <td>{guideInserted[index]?.date_maintenance}</td>
                    <td>{guideInserted[index]?.worked}</td>
                    <td>{guideInserted[index]?.order}</td>
                    <td>{guideInserted[index]?.date_order}</td>

                    </tr>)
                }

                {
                    type === 'advertising' && Array.isArray(guideInserted) &&
                    guideInserted.map((item, index)=><tr key={index} className='main-page-info-tr'> 
                    <td>{guideInserted[index]?.machineId}</td>
                    <td><a href="#" onClick={(e)=>{
                        e.preventDefault()
                        alert(guideInserted[index].serviceCompanyId?.description)
                    }}>{guideInserted[index].serviceCompanyId?.name}</a></td>

                    <td>{guideInserted[index]?.date_complaints}</td>
                    <td>{guideInserted[index]?.worked}</td>

                    <td><a href="#" onClick={(e)=>{
                        e.preventDefault()
                        alert(guideInserted[index].refusalTypeId?.about)
                    }}>{guideInserted[index].refusalTypeId?.name}</a></td>

                    <td>{guideInserted[index]?.description}</td>

                    <td><a href="#" onClick={(e)=>{
                        e.preventDefault()
                        alert(guideInserted[index].recoveryMethodId?.about)
                    }}>{guideInserted[index].recoveryMethodId?.name}</a></td>

                    <td>{guideInserted[index]?.spare_parts}</td>

                    <td>{guideInserted[index]?.date_repair}</td>

                    <td>{guideInserted[index]?.downtime}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
})

export default Table
