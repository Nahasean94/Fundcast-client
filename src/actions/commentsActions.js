import {ADD_COMMENT, CLEAR_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT} from "./types"

 export function addComment(comment) {
     return {
         type:ADD_COMMENT,
         payload:comment
     }
 }
 export function clearComments(comment) {
     return {
         type:CLEAR_COMMENTS,
         payload:{}
     }
 }
 export function updateComment(commentId) {
     return {
         type:UPDATE_COMMENT,
         payload:commentId
     }
 }
 export function deleteComment(commentId) {
     return {
         type:DELETE_COMMENT,
         payload:commentId
     }
 }