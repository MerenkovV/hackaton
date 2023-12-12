import { makeAutoObservable } from "mobx"
import { Devices } from "./DeviceStore"

export interface IBasketStore {
    _devices: Devices[]
    _isFetching: boolean
    setDevices: (device:Devices[])=>void
}

export default class BasketStore implements IBasketStore {

    _devices: Devices[]
    _isFetching: boolean

    constructor(){
        this._devices = []
        this._isFetching = true
        makeAutoObservable(this)
    }

    setDevices(device : Devices[]){
        this._devices = device
    }

    setIsFetching(fetching: boolean){
        this._isFetching = fetching
    }

    public get devices(){
        return this._devices
    }

    public get isFetching(){
        return this._isFetching
    }
}

export type DeviceStoreType = typeof BasketStore