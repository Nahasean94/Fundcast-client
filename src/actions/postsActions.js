import axios from 'axios'
import {ADD_POST, UPDATE_POST, CLEAR_POSTS, DELETE_POST} from "./types"

export function getPosts() {
    return async dispatch=>{
        return await axios.get('/posts')
    }
}

export function savePost(post) {
    return async dispatch=>{
        return await axios.post('/posts/new',post)
    }
}

export function likePost(postId) {
    return async dispatch=>{
        return await axios.post('/posts/like',{postId:postId})
    }
}
export function unlikePost(postId) {
    return async dispatch=>{
        return await axios.post('/posts/unlike',{postId:postId})
    }
}

export function getProfileDetails(id) {
    return async dispatch=>{
        return await axios.get(`/twinpal/users/${id}`)
    }
}
export function saveUpdatedPost(post) {
    return async dispatch=>{
        return await axios.post(`/posts/edit`,post)
    }
}
export function removePost(id) {
    return async dispatch=>{
        return await axios.get(`/posts/delete/${id}`)
    }
}


export function addPost(post) {
    return {
        type:ADD_POST,
        payload:post
    }
}

export function updatePost(post) {
    return {
        type:UPDATE_POST,
        payload:post
    }
}

export function clearPosts() {
    return {
        type:CLEAR_POSTS,
        payload:{}
    }
}
export function deletePost(post) {
return {
    type:DELETE_POST,
    payload:post
}
}