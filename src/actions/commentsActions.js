// import axios from "axios/index"
// import {ADD_COMMENT, CLEAR_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT} from "./types"
//
// export function saveComment(postId, comment) {
//     return async dispatch => {
//         return await axios.post('/posts/comment', {postId: postId, comment: comment})
//     }
// }
//
// export function getComments(postId) {
//     return async dispatch => {
//         return await axios.get(`/posts/comments/${postId}`)
//     }
// }
//
// export function likeComment(commentId) {
//     return async dispatch => {
//         return await axios.get('/comments/like/', {commentId: commentId})
//     }
// }
//  export function addComment(comment) {
//      return {
//          type:ADD_COMMENT,
//          payload:comment
//      }
//  }
//  export function clearComments(comment) {
//      return {
//          type:CLEAR_COMMENTS,
//          payload:{}
//      }
//  }
//  export function updateComment(commentId) {
//      return {
//          type:UPDATE_COMMENT,
//          payload:commentId
//      }
//  }
//  export function deleteComment(commentId) {
//      return {
//          type:DELETE_COMMENT,
//          payload:commentId
//      }
//  }