import React from 'react'
import ReactDOM from 'react-dom'
import { GraphQL, Provider, Query } from 'graphql-react'
const graphql = new GraphQL()
const twinpalFetchOptionsOverride = options => {
    options.url = 'http://localhost:8080/graphql'
    const token = localStorage.getItem('Twinpal')
    if (token) options.headers.Authorization = `Bearer ${token}`
}

const App = () => (
    <Provider value={graphql}>
        <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={twinpalFetchOptionsOverride}
            query={`
        {
          people {
            username
            id
          }
        }
      `}
        >
            {({ loading, data }) =>
                data ?data.people.map (person=>
                    <article>
                        <h1>{person.username}</h1>
                        <p>{person.id}</p>
                    </article>
                ) : loading ? (
                    <p>Loading…</p>
                ) : (
                    <p>Loading failed.</p>
                )
            }
        </Query>
    </Provider>
)
ReactDOM.render(
    <App/>
    , document.getElementById('root'))