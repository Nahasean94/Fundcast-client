import {SET_CURRENT_USER} from "./types"
import jwt from 'jsonwebtoken'
export function setLoginToken(userData) {
    return dispatch=>{
            const token=userData
        console.log(token)
            localStorage.setItem('Fundcast',token)
            dispatch(setCurrentUser(jwt.decode(token)))
    }
}
export function setCurrentUser(user) {
    return{
        type:SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch=>{
        localStorage.removeItem('Fundcast')
        dispatch(setCurrentUser({}))
    }
}