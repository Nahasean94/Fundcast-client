import React from 'react'
import {podcast, podcasts} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import {timeSince} from "../../shared/TimeSince"
import RelatedPodcasts from "./RelatedPodcasts"
import shortid from "shortid"
import Comments from "../comments/Comments"


const PodcastPage = () => {


    return (
        <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            variables={{id: window.location.pathname.split('/')[2]}}
            query={podcast}
        >
            {({loading, data}) => {
                if (data) {
                    const {id, title, description, tags, listens, hosts, timestamp, payment, coverImage, likes, audioFile} = data.podcast
                    const imageView =
                        <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="350" height="270"
                             alt={title} className="rounded"/>
                    const audioView = <audio src={`http://localhost:8080/uploads/${audioFile.path}`} controls={true}
                                             className="rounded" style={{width: '100%'}}/>
                    return <div className="row">
                        <div className="col-sm-3">
                            {imageView}
                        </div>
                        <div className="col-sm-7">
                            <h3>{title}</h3>
                            <strong>HOSTED BY:</strong> <a href="" onClick={this.onProfileLink}
                                                           id={hosts[0].id}>{hosts[0].username}</a>
                            <div className="feed-meta">
                                <ul className="list-inline list-unstyled">
                                    <li className="list-inline-item">Added about {timeSince(timestamp)}</li>
                                </ul>
                            </div>
                            <br/>
                            {audioView}
                            <br/>
                            <br/>
                            <div className="view-podcast"> {description}
                            </div>
                        <hr/>
                            <Consumer>{graphql=><Comments graphql={graphql}/>}</Consumer>
                        </div>
                        <div className="col-sm-2">
                            {
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
                                                            <Consumer>{graphql => <RelatedPodcasts podcast={podcast}
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
                            }

                        </div>

                    </div>

                } else if (loading) {
                    return (
                        <p>Loading…</p>
                    )
                }
                else {

                }
                return (
                    <p>Loading failed.</p>
                )
            }
            }
        </Query>)


}
export default PodcastPage
