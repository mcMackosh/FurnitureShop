import React from 'react'
import {observer, useLocalObservable} from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'

export function UserStore()
{
    return makeObservable({
        _isAuth: false,
        _user: {},
        setIsAuth(bool)
        {
            this._isAuth = bool
        },
        setUser(user)
        {
            this._user = user
        },
        getIsAuth()    
        {
            return this._isAuth
        },
        getUser()
        {
            return this._user
        },
    },{
        _isAuth: observable,
        _user: observable,
        setIsAuth: action.bound,
        setUser: action.bound,
        getIsAuth: action.bound,
        getUser: action.bound
    })
}