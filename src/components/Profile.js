import {connect} from 'react-redux'
import {getProfileInfo, getTwinpals,saveProfilePicture} from '../actions/profileActions'
import PropTypes from 'prop-types'
import React from 'react'
import PostsColumn from '../components/posts/PostsColumn'
import NewPostForm from '../components/posts/NewPostForm'
import {clearPosts} from '../actions/postsActions'
import EditProfileModal from "../modals/EditProfileModal"
import UploadProfilePictureModal from "../modals/UploadProfilePictureModal"
import {setCurrentUser} from "../actions/loginActions"
import jwt from "jsonwebtoken"
import setAuthorizationToken from "../utils/setAuthorizationToken"
import {initializeToken} from './../initializeToken'
let upload

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            birthday: '',
            email: '',
            first_name: '',
            last_name: '',
            profile_picture: '',
            twinpals: [],
            show: false,
            picture:'',
            selectedFile:'',
            showProfilePictureModal: false
        }
        this.onTwinpal = this.onTwinpal.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onEditProfile = this.onEditProfile.bind(this)
        this.onProfilePictureDialog = this.onProfilePictureDialog.bind(this)
        this.onSelectImage = this.onSelectImage.bind(this)
        this.onCloseProfilePictureModal = this.onCloseProfilePictureModal.bind(this)
        this.onUpload = this.onUpload.bind(this)




        initializeToken()

    }

    componentDidMount() {
        this.props.clearPosts()
        this.props.getProfileInfo().then(profileInfo => {
            this.setState(profileInfo.data)
        })
        this.props.getTwinpals().then(twinpals => {
            this.setState({twinpals: twinpals.data})
        })
    }

    onCloseProfilePictureModal() {
        this.setState({showProfilePictureModal: false})
    }
onUpload(e){
        e.preventDefault()
    const {selectedFile} = this.state
    if (selectedFile !== '') {
        const data = new FormData()
        data.append('profile_picture', selectedFile)
        // window.alert("This thing is uploading profile picture")
        this.props.saveProfilePicture(data).then(
            profile => {
                this.setState({newPost: ''})
                upload.files=undefined
                this.setState({showProfilePictureModal: false})
                this.setState({selectedFile:''})
                window.location.reload()
            }
        )
    }

}
    onClose(e) {
        // e.preventDefault()
        this.setState({show: false})
    }

    onEditProfile(e) {
        e.preventDefault()
        this.setState({show: true})
    }

    onTwinpal(e) {
        e.preventDefault()
        this.props.clearPosts()
        this.context.router.history.push(`/twinpal/${ e.target.id}`)
    }

    onProfilePictureDialog(e) {
        e.preventDefault()
        document.getElementById('profilePictureInput').click()
    }

    onSelectImage(event) {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            this.setState({showProfilePictureModal: true})
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = (e) => {
                this.setState({picture: e.target.result, selectedFile: file})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    render() {
        const {username, birthday, email, first_name, last_name, profile_picture, twinpals,picture,showProfilePictureModal} = this.state
        const twinpalView = twinpals.map(twinpal => {
            return (
                <li key={twinpal._id}><img src={`/uploads/${twinpal.profile_picture}`} alt="Profile picture" width="40"
                                           height="40" className="avatar"/><a href="" onClick={this.onTwinpal}
                                                                              id={twinpal._id}>{twinpal.username}</a>
                </li>
            )
        })
        const profileInfo = <div>
            <br/>

            <img src={`uploads/${profile_picture}`} alt="Profile picture" width="200" height="200"/>
            <button className="btn btn-primary btn-small" onClick={this.onProfilePictureDialog}>Change pic</button>
            <ul>
                <li>{username}</li>
                <li>{birthday && new Date(birthday).toDateString()}</li>
                <li>{email}</li>
                <li>{first_name}</li>
                <li>{last_name}</li>
            </ul>
            <input type="file" id="profilePictureInput" name="upload" style={{display: 'none'}}
                   onChange={this.onSelectImage}
                   accept=".jpg,.gif,.png,.jpeg" ref={node => {
                upload = node
            }}/>
            <button className="btn btn-primary btn-sm" onClick={this.onEditProfile}>Edit profile</button>
        </div>
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        {profile_picture ? profileInfo : ''}
                    </div>
                    <div className="col-sm-6">
                        <br/>
                        <div className="content-feed">
                            <NewPostForm/>
                        </div>
                        <PostsColumn />
                    </div>
                    <div className="col-sm-3">
                        <br/>
                        <h4>Twinpals</h4>
                        <ul className="list-unstyled">
                            {twinpals ? twinpalView : 'You have no twinpals'}
                        </ul>
                    </div>
                </div>
                {profile_picture ? <EditProfileModal profile={this.state} onClose={this.onClose}/> : ''}
                <UploadProfilePictureModal show={showProfilePictureModal} onClose={this.onCloseProfilePictureModal} picture={picture} onSave={this.onUpload}/>
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileInfo: PropTypes.func.isRequired,
    getTwinpals: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired,
    saveProfilePicture: PropTypes.func.isRequired,
}
Profile.contextTypes = {
    router: PropTypes.object.isRequired
}
export default connect(null, {getProfileInfo, getTwinpals, clearPosts,saveProfilePicture})(Profile)