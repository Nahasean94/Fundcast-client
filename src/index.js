import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routes'
import {GraphQL, Provider as GraphQLReact,} from 'graphql-react'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {Provider} from 'react-redux'
import {setCurrentUser} from './actions/loginActions'
import {setCurrentUser as setCurrentAdmin} from './actions/adminLoginActions'
import jwt from 'jsonwebtoken'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))


if (localStorage.getItem('Fundcast')) {
    if (jwt.decode(localStorage.getItem('Fundcast')).role === 'admin') {

        store.dispatch(setCurrentAdmin(jwt.decode(localStorage.getItem('Fundcast'))))
    } else {

        store.dispatch(setCurrentUser(jwt.decode(localStorage.getItem('Fundcast'))))
    }
}


const graphql = new GraphQL()

ReactDOM.render(
    <Provider store={store}>
        <GraphQLReact value={graphql}>
            <Router/>
        </GraphQLReact>
    </Provider>
    , document.getElementById('root'))

registerServiceWorker()