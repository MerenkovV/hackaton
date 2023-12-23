import { makeAutoObservable } from "mobx"

export default class MainteranceStore {

    constructor(){
        this._isFetching = false
        this._isLoaded = false
        this._mainterance = []
        makeAutoObservable(this)
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }
    
    setIsLoaded(loaded){
        this._isLoaded = loaded
    }

    setMainterance(machineData){
        this._mainterance = machineData
    }

    get isFetching(){
        return this._isFetching
    }

    get isLoaded(){
        return this._isLoaded
    }

    get mainterance(){
        return this._mainterance
    }
}