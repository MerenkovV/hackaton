import { makeAutoObservable } from "mobx"

export default class MachineStore {

    constructor(){
        this._isFetching = false
        this._machine = {}
        makeAutoObservable(this)
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }

    setMachine(machindData){
        this._machine = machindData
    }

    get isFetching(){
        return this._isFetching
    }

    get user(){
        return this._machine
    }
}