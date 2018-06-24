// import axios from 'axios'
import {ADD_PODCAST, UPDATE_PODCAST, CLEAR_PODCASTS, DELETE_PODCAST} from "./types"

// export function getPodcasts() {
//     return async dispatch=>{
//         return await axios.get('/posts')
//     }
// }

// export function savePodcast(podcast) {
//     return async dispatch=>{
//         return await axios.podcast('/posts/new',podcast)
//     }
// }
//
// export function likePodcast(postId) {
//     return async dispatch=>{
//         return await axios.podcast('/posts/like',{postId:postId})
//     }
// }
// export function unlikePodcast(postId) {
//     return async dispatch=>{
//         return await axios.podcast('/posts/unlike',{postId:postId})
//     }
// }
//
// export function getProfileDetails(id) {
//     return async dispatch=>{
//         return await axios.get(`/twinpal/users/${id}`)
//     }
// }
// export function saveUpdatedPodcast(podcast) {
//     return async dispatch=>{
//         return await axios.podcast(`/posts/edit`,podcast)
//     }
// }
// export function removePodcast(id) {
//     return async dispatch=>{
//         return await axios.get(`/posts/delete/${id}`)
//     }
// }


export function addPodcast(podcast) {
    return {
        type:ADD_PODCAST,
        payload:podcast
    }
}

export function updatePodcast(podcast) {
    return {
        type:UPDATE_PODCAST,
        payload:podcast
    }
}

export function clearPodcasts() {
    return {
        type:CLEAR_PODCASTS,
        payload:{}
    }
}
export function deletePodcast(podcast) {
return {
    type:DELETE_PODCAST,
    payload:podcast
}
}