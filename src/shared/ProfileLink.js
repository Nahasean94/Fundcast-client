import React from 'react'
import jwt from "jsonwebtoken"
import Profile from "../components/profile/Profile"
import PodcastPage from "../components/podcasts/PodcastPage"

export function ProfileLink(id) {
    const token = jwt.decode(localStorage.jwtToken)
    if (jwt.id === id) {
        return (<Profile/>)
    }
    return (<PodcastPage twinpalId={id}/>)

}
