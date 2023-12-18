import { makeAutoObservable } from "mobx"

export default class MachineStore {

    constructor(){
        this._isFetching = false
        this._isLoaded = false
        this._machine = {}
        makeAutoObservable(this)
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }
    
    setIsLoaded(loaded){
        this._isLoaded = loaded
    }

    setMachine(machineData){
        this._machine = machineData
    }

    get isFetching(){
        return this._isFetching
    }

    get isLoaded(){
        return this._isLoaded
    }

    get machine(){
        return this._machine
    }
}