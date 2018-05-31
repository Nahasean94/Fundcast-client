import React from 'react'
// import {initializeToken} from './../initializeToken'
import PostsColumn from "./posts/PostsColumn"
import NewPostForm from "./posts/NewPostForm"
import {Query,Consumer} from 'graphql-react'


class Newsfeed extends React.Component {
    constructor(props) {
        super(props)
        // initializeToken()

    }

    render() {

        return (
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <Consumer>{graphql=><NewPostForm graphql={graphql}/>}</Consumer>
                    <PostsColumn/>

                </div>
            </div>

        )
    }
}

export default Newsfeed