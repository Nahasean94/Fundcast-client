import React from 'react'
// import {initializeToken} from './../initializeToken'
// import PostsColumn from "./posts/PostsColumn"
// import NewPostForm from "./posts/NewPostForm"
import {Query} from 'graphql-react'


class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        // initializeToken()

    }

    render() {
        const twinpalFetchOptionsOverride = options => {
            options.url = 'http://localhost:8080/graphql'
            const token = localStorage.getItem('Twinpal')
            if (token) options.headers.Authorization = `Bearer ${token}`
        }
        return (
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    {/*<NewPostForm/>*/}
                    {/*<PostsColumn/>*/}
                    <Query
                        loadOnMount
                        loadOnReset
                        fetchOptionsOverride={twinpalFetchOptionsOverride}
                        variables={{email:"ncubed940@gmail.com",password:"stockmann2"}}
                        query={`
       mutation($email: String!,$password:String!) {
              login(email:$email,password: $password){
                        ok
                        token
                        error
              }
            }
      `}
                    >
                        {({ loading, data }) =>
                            data ?function(){
                                const token=data.login.token
                                localStorage.setItem("Twinpal",token)
                               return ( <article>
                                    <h1>Logged in</h1>
                                </article>)
                            }()
                                : loading ? (
                                    <p>Loading…</p>
                                ) : (
                                    <p>Loading failed.</p>
                                )
                        }
                    </Query>
                </div>
            </div>

        )
    }
}

export default Newsfeed