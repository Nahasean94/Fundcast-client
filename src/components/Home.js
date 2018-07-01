import React from 'react'
// import {initializeToken} from './../initializeToken'
import PodcastsColumn from "./podcasts/PodcastsColumn"
import NewPodcastForm from "./podcasts/NewPodcastForm"
import {Consumer} from 'graphql-react'


class Home extends React.Component {

    render() {

        return (
            <div className="container">
                    <PodcastsColumn/>
                </div>


        )
    }
}

export default Home