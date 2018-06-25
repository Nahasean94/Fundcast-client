import { getProfileInfo} from '../shared/queries'
import React from 'react'
import PostsColumn from './podcasts/PodcastsColumn'
import NewPodcastForm from './podcasts/NewPodcastForm'
import EditProfileModal from "../modals/EditProfileModal"
import UploadProfilePictureModal from "../modals/UploadProfilePictureModal"
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {Query, Consumer} from 'graphql-react'


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditProfileModal: false,
            showProfilePictureModal: false
        }

        this.onTwinpal = this.onTwinpal.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onEditProfile = this.onEditProfile.bind(this)
        this.onProfilePictureModal = this.onProfilePictureModal.bind(this)
        this.onCloseProfilePictureModal = this.onCloseProfilePictureModal.bind(this)
    }

    onProfilePictureModal() {
        this.setState({showProfilePictureModal: true})
    }

    onCloseProfilePictureModal() {
        this.setState({showProfilePictureModal: false})
    }


    onClose(e) {
        this.setState({showEditProfileModal: false})
    }

    onEditProfile(e) {
        e.preventDefault()
        this.setState({showEditProfileModal: true})
    }

    onTwinpal(e) {
        e.preventDefault()
        this.props.history.push(`/fundcast/${ e.target.id}`)
    }


    render() {
        const { showProfilePictureModal, showEditProfileModal} = this.state

        return <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            query={getProfileInfo}
        >
            {({loading, data}) => {
                if (data) {
                    const {username, birthday, email, first_name, last_name, profile_picture, fundcasts,} = data.getProfileInfo
                    const fundcastView = fundcasts.map(fundcast => {
                        return (
                            <li key={fundcast.id}><img src={`http://localhost:8080/uploads/${fundcast.profile_picture}`}
                                                      alt="Profile picture"
                                                      width="40"
                                                      height="40" className="avatar"/>

                                {/*<Link to={`/fundcast/${fundcast.id}`} className="ml1 no-underline black">*/}
                                {/*submit*/}
                                {/*</Link>*/}
                                <a href="" onClick={this.onTwinpal}
                                   id={fundcast.id}>{fundcast.username}</a>
                            </li>)

                    })
                    const profileInfo = <div>
                        <br/>

                        <img src={`http://localhost:8080/uploads/${profile_picture}`} alt="Profile picture" width="200"
                             height="200"/>
                        <button className="btn btn-primary btn-small" onClick={this.onProfilePictureModal}>Change pic
                        </button>
                        <ul>
                            <li>{username}</li>
                            <li>{birthday && new Date(birthday).toDateString()}</li>
                            <li>{email}</li>
                            <li>{first_name}</li>
                            <li>{last_name}</li>
                        </ul>

                        <button className="btn btn-primary btn-sm" onClick={this.onEditProfile}>Edit profile</button>
                    </div>
                    return (<div>
                        <div className="row">
                            <div className="col-sm-3">
                                {email ? profileInfo : 'loading'}
                            </div>
                            <div className="col-sm-6">

                                <div className="content-feed">
                                    <Consumer>{graphql => <NewPodcastForm graphql={graphql}/>}</Consumer>
                                </div>
                                <PostsColumn/>
                            </div>
                            <div className="col-sm-3">
                                <br/>
                                <h4>Twinpals</h4>
                                <ul className="list-unstyled">
                                    {fundcasts.length > 0 ? fundcastView : 'You have no fundcasts'}
                                </ul>
                            </div>
                        </div>
                        <Consumer>{graphql => <EditProfileModal graphql={graphql} profile={data.getProfileInfo}
                                                                onClose={this.onClose}
                                                                show={showEditProfileModal}/>}</Consumer>
                        <Consumer>{graphql => <UploadProfilePictureModal graphql={graphql}
                                                                         show={showProfilePictureModal}
                                                                         onClose={this.onCloseProfilePictureModal}/>}</Consumer>
                    </div>)

                } else if (loading) {
                    return (
                        <p>Loading…</p>
                    )
                }
                else {
                    return (
                        <p>Loading failed.</p>
                    )
                }
            }
            }
        </Query>
        // const {loading, error, getProfileInfo} = this.props.data
        // if (loading) return <p>Loading...</p>
        // if (error) return <p>{error}(</p>


        // return (
        //     <div>
        //         <div className="row">
        //             <div className="col-sm-3">
        //                 {email ? profileInfo : 'loading'}
        //             </div>
        //             <div className="col-sm-6">
        //                 <br/>
        //                 <div className="content-feed">
        //                     <NewPostForm/>
        //                 </div>
        //                 <PostsColumn/>
        //             </div>
        //             <div className="col-sm-3">
        //                 <br/>
        //                 <h4>Twinpals</h4>
        //                 <ul className="list-unstyled">
        //                     {fundcasts.length > 0 ? fundcastView : 'You have no fundcasts'}
        //                 </ul>
        //             </div>
        //         </div>
        //         {/*{showEditProfileModal ? <EditProfileModal profile={getProfileInfo} onClose={this.onClose} show={showEditProfileModal}/> : ''}*/}
        //         {/*<UploadProfilePictureModal show={showProfilePictureModal} onClose={this.onCloseProfilePictureModal} picture={picture} onSave={this.onUpload}/>*/}
        //     </div>

    }
}

//
// Profile.propTypes = {
//     getProfileInfo: PropTypes.func.isRequired,
//     getTwinpals: PropTypes.func.isRequired,
//     clearPosts: PropTypes.func.isRequired,
//     saveProfilePicture: PropTypes.func.isRequired,
// }
// Profile.contextTypes = {
//     router: PropTypes.object.isRequired
// }
// export default connect(null, {getProfileInfo, getTwinpals, clearPosts,saveProfilePicture})(Profile)
export default Profile
// export default graphql(getProfileInfo)(Profile)