import React from 'react'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {searchPodcasts} from "../../shared/queries"
import shortid from "shortid"
import {Consumer, Query} from "graphql-react"
import SearchTerm from './SearchTerm'
import PodcastView from "../podcasts/PodcastView"

class Podcasts extends React.Component {
    render() {
        return (<Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            variables={{
                search: SearchTerm.getSearchTerm(),
            }}
            query={searchPodcasts}

        >
            {({loading, data}) => {
                if (data) {
                    if (data.searchPodcasts.length > 0) {
                        return data.searchPodcasts.map(podcast =>
                            (
                                <div key={shortid.generate()}>
                                    <Consumer>{graphql => <PodcastView podcast={podcast} graphql={graphql}/>}</Consumer>
                                </div>
                            )
                        )
                    } else {
                        return <p>No podcasts found</p>
                    }
                }
                else if (loading) {
                    return <p>Searching…</p>
                }
                return <p>Searching failed.</p>
            }
            }
        </Query>)
    }
}

export default Podcasts