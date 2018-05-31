// import {connect} from 'react-redux'
// import {getTwinpalProfile} from '../actions/profileActions'
// import PropTypes from 'prop-types'
// import React from 'react'
// import PostsColumn from "./posts/PostsColumn"
// import NewPostForm from "./posts/NewPostForm"
//
// class TwinpalProfile extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: '',
//             birthday: '',
//             profile_picture: '',
//         }
//     }
//
//     componentDidMount() {
//         if(!this.props.twinpalId){
//
//         this.props.getTwinpalProfile(window.location.pathname.split('/')[2]).then(profileInfo => {
//             this.setState(profileInfo.data)
//         })
//         }
//         else{
//
//         }
//     }
//
//     render() {
//         const {username, birthday, profile_picture} = this.state
//         return (
//             <div className="row">
//                 <div className="col-sm-3">
//                     <br/>
//
//                     <img src={`http://localhost:8080/uploads/${profile_picture}`} alt="Profile picture" width="200" height="200"/>
//                     <ul>
//                         <li>{username}</li>
//                         <li>{new Date(birthday).toDateString()}</li>
//                     </ul>
//                 </div>
//                 <div className="col-sm-6">
//                     <br/>
//                     <br/>
//                     <div className="content-feed">
//                         <NewPostForm/>
//                     </div>
//                     <PostsColumn profilePicture={profile_picture}/>
//                 </div>
//
//
//             </div>
//         )
//     }
// }
//
// TwinpalProfile.propTypes = {
//     getTwinpalProfile: PropTypes.func.isRequired,
//     twinpalId:PropTypes.string
// }
// TwinpalProfile.contextTypes={
//     router:PropTypes.object.isRequired
// }
// export default connect(null, {getTwinpalProfile})(TwinpalProfile)
// import {connect} from 'react-redux'
// import {getTwinpalProfile} from '../actions/profileActions'
// import PropTypes from 'prop-types'
import React from 'react'
import PostsColumn from "./posts/PostsColumn"
import NewPostForm from "./posts/NewPostForm"
import {fetchPalProfile} from "../shared/queries"
// import {graphql} from 'react-apollo'
// import shortid from "shortid"
import {withRouter} from 'react-router'
import {twinpalFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {getProfileInfo} from "../shared/queries"
import {Query,Consumer} from 'graphql-react'
// class TwinpalProfile extends React.Component {

const TwinpalProfile = () => {


    return (
        <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={twinpalFetchOptionsOverride}
            variables={{id: window.location.pathname.split('/')[2]}}
            query={fetchPalProfile}
        >
            {({loading, data}) => {
                if (data) {
                    const {username, birthday, profile_picture} = data.fetchPalProfile

                    return <div className="row">
                        <div className="col-sm-3">
                            <br/>
                            <img src={`http://localhost:8080/uploads/${profile_picture}`} alt="Profile picture"
                                 width="200" height="200"/>
                            <ul>
                                <li>{username}</li>
                                <li>{new Date(birthday).toDateString()}</li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <br/>
                            <br/>
                            <div className="content-feed">
                                <Consumer>{graphql=><NewPostForm graphql={graphql}/>}</Consumer>

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
// console.log("in twinpal profile")
// TwinpalProfile.propTypes = {
//     getTwinpalProfile: PropTypes.func.isRequired,
//     twinpalId:PropTypes.string
// }
// TwinpalProfile.contextTypes={
//     router:PropTypes.object.isRequired
// }
// export default graphql(fetchPalProfile,  {
//     options: (props) => ({
//         fetchPolicy: 'network-only',
//         variables: {
//             id: window.location.pathname.split('/')[2],
//         },
//     }),
// })(withRouter(TwinpalProfile))
export default TwinpalProfile

// export default graphql(fetchPalProfile,  {
//     options: (props) => ({
//         fetchPolicy: 'network-only',
//         variables: {
//             id: window.location.pathname.split('/')[2],
//         },
//     }),
// })(withRouter(TwinpalProfile))