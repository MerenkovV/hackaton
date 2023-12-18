import { makeAutoObservable } from "mobx"

export default class GuideStore {

    constructor(){
        this._isFetching = false
        this._guide = {}
        makeAutoObservable(this)
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }

    setGuide(guideData){
        this._guide = guideData
    }

    get isFetching(){
        return this._isFetching
    }

    get guide(){
        return this._guide
    }
}