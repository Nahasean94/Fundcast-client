import {ADD_COMMENT, CLEAR_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT} from "../actions/types"
import findIndex from 'lodash/findIndex'

export default (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.payload, ...state]
        case CLEAR_COMMENTS:
            return []
        case UPDATE_COMMENT:
            return state.filter(comment => {
                if (comment._id === action.payload._id) {
                    return action.payload
                }
                return comment
            })
        case DELETE_COMMENT:
            const index = findIndex(state, {id: action.payload._id})
            if (index >= 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default:
            return state
    }
}
