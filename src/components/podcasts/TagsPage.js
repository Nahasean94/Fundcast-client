import React from 'react'
import PodcastView from './PodcastView'
import shortid from 'shortid'
import {podcasts} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {Consumer, Query} from 'graphql-react'


class TagsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-2 col-md-2 bd-sidebar">

                    </div>
                    <div className="col-7 col-md-7 col-xl-7 bd-content">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            query={podcasts}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.podcasts) {
                                        return data.podcasts.map(podcast =>
                                            (
                                                <div key={shortid.generate()}>
                                                    <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                       graphql={graphql}/>}</Consumer>
                                                </div>
                                            )
                                        )
                                    }
                                }
                                else if (loading) {
                                    return <p>Loading…</p>
                                }
                                return <p>Loading failed.</p>
                            }
                            }
                        </Query>
                    </div>
                </div>
            </div>)


    }

}

export default TagsPage

