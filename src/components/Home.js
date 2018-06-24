import React from 'react'
// import {initializeToken} from './../initializeToken'
import PodcastsColumn from "./podcasts/PodcastsColumn"
import NewPodcastForm from "./podcasts/NewPodcastForm"
import {Consumer} from 'graphql-react'


class Home extends React.Component {

    render() {

        return (
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    {/*<Consumer>{graphql=><NewPostForm graphql={graphql}/>}</Consumer>*/}
                    <PodcastsColumn/>
                </div>
            </div>

        )
    }
}

export default Home