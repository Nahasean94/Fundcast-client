import React from 'react'

import PodcastsColumn from "./podcasts/PodcastsColumn"


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