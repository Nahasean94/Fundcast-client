import React from 'react'
import {clearPosts, getProfileDetails} from "../../actions/postsActions"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {timeSince} from "../../shared/TimeSince"
import {likeComment} from "../../actions/commentsActions"
import {ProfileLink} from "../../shared/ProfileLink"
import jwt from "jsonwebtoken"
import ProfilePictureModal from "../../modals/ProfilePictureModal"

class CommentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.comment,
            authorPicture: '',
            authorUsername: '',
            show: false,
            showFullComment:false

        }
        this.onCommenting = this.onCommenting.bind(this)
        this.onLike = this.onLike.bind(this)
        this.onProfileLink = this.onProfileLink.bind(this)
        this.onProfilePicture = this.onProfilePicture.bind(this)
        this.onClose = this.onClose.bind(this)
        this.viewComment = this.viewComment.bind(this)

    }

    onProfilePicture(e) {
        e.preventDefault()
        this.setState({show: true})
    }

    onClose() {
        this.setState({show: !this.state.show})
    }

    onCommenting(e) {
        e.preventDefault()
    }

    onLike(e) {
        e.preventDefault()
        this.props.likeComment(this.state._id).then(post => {
            this.props.updatePost(post.data)
        })
    }

    onProfileLink(e) {
        e.preventDefault()
        const token = jwt.decode(localStorage.jwtToken)
        if (token.id === this.state.author && window.location.pathname !== '/profile') {
            this.props.clearPosts()
            this.context.router.history.push('/profile')
        }
        else if (token.id !== this.state.author && window.location.pathname === '/profile') {
            this.props.clearPosts()
            this.context.router.history.push(`/twinpal/${this.state.author}`)
        }

    }
    viewComment(e){
        e.preventDefault()
        this.setState({showFullComment:true})
    }

    componentDidMount() {
        // if(this.state.author){
        this.props.getProfileDetails(this.state.author).then(author => {
            this.setState({authorPicture: author.data.profile_picture, authorUsername: author.data.username})
        })
        // }
    }

    render() {
        const {body, authorUsername, authorPicture, timestamp,show,showFullComment} = this.state
        const more = <p>
            {body.substr(0, 599)}... <a href="" onClick={this.viewComment}>more</a></p>
        return (
            <div className="row">
                <div className="col-sm-2">
                    <p><img src={`/uploads/${authorPicture}`}
                            width="40" height="40"
                            className="avatar" onClick={this.onProfilePicture}/></p>
                </div>
                <div className="col-sm-10">
                    <ul className="list-inline list-unstyled">
                        <li className="list-inline-item author">
                            <a href="" onClick={this.onProfileLink} id={this.state.author}>{authorUsername}</a>
                        </li>
                        <span className="feed-meta">
                            <li className="list-inline-item">{timeSince(timestamp)}</li>
                            </span>
                    </ul>
                    {body.length > 600 &&!showFullComment ? more : body}

                    <div className="feed-meta">
                        <ul className="list-inline list-unstyled">
                            {/*<li className="list-inline-item"><a href="" onClick={this.onLike}><i*/}
                                {/*className="fa fa-thumbs-up"></i>*/}
                                {/*&nbsp;*/}
                                {/*{liked ? 'Liked' : 'Like'} {likes.length}  */}
                                {/*Like &nbsp; </a></li>*/}
                            {/*<li className="list-inline-item">*/}
                            {/*<ul className="list-unstyled">*/}
                            {/*{comments.length ? <Comments comments={comments} viewAll={viewAll}/> : ''}*/}
                            {/*</ul>*/}
                            {/*</li>*/}
                            {/*<li className="list-inline-item"><a href="" onClick={this.onCommenting}><i*/}
                                {/*className="fa fa-reply"></i>*/}
                                {/*&nbsp; Reply</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
                <ProfilePictureModal show={show} onClose={this.onClose} picture={authorPicture}
                                     username={authorUsername}/>

            </div>
        )
    }
}

CommentView.propTypes = {
    getProfileDetails: PropTypes.func.isRequired,
    likeComment: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired
}
CommentView.contextTypes = {
    router: PropTypes.object.isRequired
}
export default connect(null, {clearPosts, getProfileDetails, likeComment})(CommentView)