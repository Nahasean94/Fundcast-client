import React from 'react'
import PodcastView from '../PodcastView'
import shortid from 'shortid'
import {fetchPodcastsByTags, tags as queryTags} from "../../../shared/queries"
import {fundcastFetchOptionsOverride} from '../../../shared/fetchOverrideOptions'
import {Consumer, Query} from 'graphql-react'
import Link from "react-router-dom/es/Link"


let tags = []

class TagPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row flex-xl-nowrap">
                    <div className="col-2 col-md-2 bd-sidebar">
                        <h3>Tags</h3>
                        {/*<form>*/}
                            {/*<div className="input-group">*/}
                                {/*<input type="text"*/}
                                       {/*className="form-control form-control-sm"*/}
                                       {/*placeholder="Search "*/}
                                       {/*aria-label="Search " aria-describedby="basic-addon1"*/}
                                       {/*onChange={this.onChange} name="tsc"/>*/}
                            {/*</div>*/}
                        {/*</form>*/}
                        {/*<hr/>*/}
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            query={queryTags}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.tags.length > 0) {
                                        tags = data.tags
                                        return (<ul className="list-unstyled">
                                            <li><strong><Link to="/tags">All</Link></strong></li>
                                            {data.tags.map(tag => {
                                                const tagLink=`/tags/${tag.id}`
                                                return (<li><strong><Link to={tagLink}>{tag.name}</Link></strong></li>)
                                            })}
                                        </ul>)
                                    }
                                    else {
                                        return <p>No tags found</p>
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
                    <div className="col-10 col-md-10 col-xl-10 bd-content">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            variables={{id: window.location.pathname.split('/')[2]}}
                            query={fetchPodcastsByTags}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.fetchPodcastsByTags) {
                                        return data.fetchPodcastsByTags.map(podcast =>
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

export default TagPage

