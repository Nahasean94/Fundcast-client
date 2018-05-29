import {connect} from 'react-redux'
import {getTwinpalProfile} from '../actions/profileActions'
import PropTypes from 'prop-types'
import React from 'react'
import PostsColumn from "./posts/PostsColumn"
import NewPostForm from "./posts/NewPostForm"

class TwinpalProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            birthday: '',
            profile_picture: '',
        }
    }

    componentDidMount() {
        if(!this.props.twinpalId){

        this.props.getTwinpalProfile(window.location.pathname.split('/')[2]).then(profileInfo => {
            this.setState(profileInfo.data)
        })
        }
        else{

        }
    }

    render() {
        const {username, birthday, profile_picture} = this.state
        return (
            <div className="row">
                <div className="col-sm-3">
                    <br/>

                    <img src={`/uploads/${profile_picture}`} alt="Profile picture" width="200" height="200"/>
                    <ul>
                        <li>{username}</li>
                        <li>{new Date(birthday).toDateString()}</li>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <br/>
                    <br/>
                    <div className="content-feed">
                        <NewPostForm/>
                    </div>
                    <PostsColumn profilePicture={profile_picture}/>
                </div>


            </div>
        )
    }
}

TwinpalProfile.propTypes = {
    getTwinpalProfile: PropTypes.func.isRequired,
    twinpalId:PropTypes.string
}
TwinpalProfile.contextTypes={
    router:PropTypes.object.isRequired
}
export default connect(null, {getTwinpalProfile})(TwinpalProfile)