import { makeAutoObservable } from "mobx"

export default class UserStore {

    constructor(){
        this._isAuth = false
        this._isFetching = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(auth){
        this._isAuth = auth
    }

    setIsFetching(fetching){
        this._isFetching = fetching
    }

    setUser(userInfo){
        this._user = userInfo
    }

    get isAuth(){
        return this._isAuth
    }

    get isFetching(){
        return this._isFetching
    }

    get user(){
        return this._user
    }
}