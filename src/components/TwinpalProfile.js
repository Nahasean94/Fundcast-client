import React from 'react'
import PostsColumn from "./podcasts/PodcastsColumn"
import NewPodcastForm from "./podcasts/NewPodcastForm"
import {fetchPalProfile} from "../shared/queries"
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {Query, Consumer} from 'graphql-react'


const TwinpalProfile = () => {


    return (
        <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            variables={{id: window.location.pathname.split('/')[2]}}
            query={fetchPalProfile}
        >
            {({loading, data}) => {
                if (data) {
                    const {username, birthday, profile_picture} = data.fetchPalProfile

                    return <div className="row">
                        <div className="col-sm-3">

                            <img src={`http://localhost:8080/uploads/${profile_picture}`} alt="Profile picture"
                                 width="200" height="200"/>
                            <ul>
                                <li>{username}</li>
                                <li>{new Date(birthday).toDateString()}</li>
                            </ul>
                        </div>
                        <div className="col-sm-6">

                            <div className="content-feed">
                                <Consumer>{graphql => <NewPodcastForm graphql={graphql}/>}</Consumer>

                            </div>
                            <PostsColumn/>
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
export default TwinpalProfile
