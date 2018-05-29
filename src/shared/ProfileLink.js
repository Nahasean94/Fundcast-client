import React from 'react'
import jwt from "jsonwebtoken"
import Profile from "../components/Profile"
import TwinpalProfile from "../components/TwinpalProfile"

export function ProfileLink(id) {
    const token = jwt.decode(localStorage.jwtToken)
    if (jwt.id === id) {
        return (<Profile/>)
    }
    return (<TwinpalProfile twinpalId={id}/>)

}
