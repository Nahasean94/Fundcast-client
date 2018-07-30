import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken'
import {setCurrentUser} from './actions/loginActions'
import jwt from 'jsonwebtoken'

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))

export function initializeToken() {
    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken)
        store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
    }
}

export function returnStore() {
    return store
}

