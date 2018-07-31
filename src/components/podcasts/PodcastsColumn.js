import React from 'react'
import PodcastView from './PodcastView'
import shortid from 'shortid'
import {fetchPalPodcasts, podcasts} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {Consumer, Query} from 'graphql-react'


class PodcastsColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        if (window.location.pathname === '/') {

            return (
                <div className="col-sm-10 offset-sm-1">
                    <Query
                        loadOnMount
                        loadOnReset
                        fetchOptionsOverride={fundcastFetchOptionsOverride}
                        query={podcasts}
                    >
                        {({loading, data}) => {
                            if (data) {
                                if (data.podcasts.length > 0) {
                                    return data.podcasts.map(podcast =>
                                        (
                                            <div key={shortid.generate()}>
                                                <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                   graphql={graphql}/>}</Consumer>
                                            </div>
                                        )
                                    )
                                } else {
                                    return <p>No podcasts found</p>
                                }
                            }
                            else if (loading) {
                                return <p>Loading…</p>
                            }
                            return <p>Loading failed.</p>
                        }
                        }
                    </Query>
                </div>)

        }
    }
}

export default PodcastsColumn
