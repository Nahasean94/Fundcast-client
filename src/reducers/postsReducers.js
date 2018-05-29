import {ADD_POST,UPDATE_POST,CLEAR_POSTS,DELETE_POST} from "../actions/types"
import findIndex from "lodash/findIndex"

export default (state=[],action)=>{
switch (action.type){
    case ADD_POST:
        return [action.payload,...state]
    case UPDATE_POST:
         return state.map(post=>{
             if(post._id===action.payload._id){
                 return action.payload
             }
             return post
         })
    case CLEAR_POSTS:
        return []
    case DELETE_POST:
        const index = findIndex(state, {_id: action.payload._id})
        if (index => 0) {
            return [...state.slice(0, index), ...state.slice(index + 1)]
        }
        return state
    default: return state
}
}