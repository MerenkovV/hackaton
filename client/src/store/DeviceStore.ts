import { makeAutoObservable } from "mobx"

export type DeviceTypes = {
    id: number
    name: string
}
export type DeviceBrands = {
    id: number
    name: string
}
export type Devices = {
    id: number
    name: string
    price: number
    rating: number
    img: string
}

export interface IDeviceStore {
    _types: DeviceTypes[]
    _brands: DeviceBrands[]
    _devices: Devices[]
    _isFetching: boolean
    setTypes: (type:DeviceTypes[])=>void
    setBrands: (brand:DeviceBrands[])=>void
    setDevices: (device:Devices[])=>void
}

export default class DeviceStore implements IDeviceStore {

    _types: DeviceTypes[]
    _brands: DeviceBrands[]
    _devices: Devices[]
    _isFetching: boolean

    constructor(){
        this._types = [
            {id: 1, name: ''},
        ]
        this._brands = [
            {id: 1, name: ''},
        ]
        this._devices = [
            {id: 1, name: '', price: 0, rating: 0, img: ''},
        ]
        this._isFetching = true
        makeAutoObservable(this)
    }

    setTypes(type : DeviceTypes[]){
        this._types = type
    }

    setBrands(brand : DeviceBrands[]){
        this._brands = brand
    }

    setDevices(device : Devices[]){
        this._devices = device
    }

    setIsFetching(fetching: boolean){
        this._isFetching = fetching
    }

    public get types(){
        return this._types
    }

    public get brands(){
        return this._brands
    }

    public get devices(){
        return this._devices
    }

    public get isFetching(){
        return this._isFetching
    }
}

export type DeviceStoreType = typeof DeviceStore