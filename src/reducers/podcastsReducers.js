import {ADD_PODCAST,UPDATE_PODCAST,CLEAR_PODCASTS,DELETE_PODCAST} from "../actions/types"
import findIndex from "lodash/findIndex"

export default (state=[],action)=>{
switch (action.type){
    case ADD_PODCAST:
        return [action.payload,...state]
    case UPDATE_PODCAST:
         return state.map(podcast=>{
             if(podcast._id===action.payload._id){
                 return action.payload
             }
             return podcast
         })
    case CLEAR_PODCASTS:
        return []
    case DELETE_PODCAST:
        const index = findIndex(state, {_id: action.payload._id})
        if (index => 0) {
            return [...state.slice(0, index), ...state.slice(index + 1)]
        }
        return state
    default: return state
}
}