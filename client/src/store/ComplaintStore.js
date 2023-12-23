import { makeAutoObservable } from "mobx"

export default class ComplaintStore {

    constructor(){
        this._isFetching = false
        this._isLoaded = false
        this._complaint = []
        makeAutoObservable(this)
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }
    
    setIsLoaded(loaded){
        this._isLoaded = loaded
    }

    setComplaint(machineData){
        this._complaint = machineData
    }

    get isFetching(){
        return this._isFetching
    }

    get isLoaded(){
        return this._isLoaded
    }

    get complaint(){
        return this._complaint
    }
}