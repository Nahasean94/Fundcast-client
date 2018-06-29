import React from 'react'
import PropTypes from 'prop-types'
import {timeSince} from "../../shared/TimeSince"
import jwt from "jsonwebtoken"
import ProfilePictureModal from "../../modals/ProfilePictureModal"

class CommentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.comment,

        }

        // this.onLike = this.onLike.bind(this)
        this.onProfileLink = this.onProfileLink.bind(this)
        // this.onProfilePicture = this.onProfilePicture.bind(this)
        // this.onClose = this.onClose.bind(this)
        this.viewComment = this.viewComment.bind(this)

    }

    onProfilePicture(e) {
        e.preventDefault()
        this.setState({show: true})
    }

    // onClose() {
    //     this.setState({show: !this.state.show})
    // }
    //
    // onCommenting(e) {
    //     e.preventDefault()
    // }
    //
    // onLike(e) {
    //     e.preventDefault()
    //     this.props.likeComment(this.state._id).then(post => {
    //         this.props.updatePost(post.data)
    //     })
    // }

    onProfileLink(e) {
        e.preventDefault()
        const {author} = this.props.comment
        const token = jwt.decode(localStorage.getItem("Twinpal"))
        if (token.id === author.id && window.location.pathname !== '/profile') {
            this.context.router.history.push('/profile')
        }
        else if (token.id !== author.id && window.location.pathname === '/profile') {
            this.context.router.history.push(`/twinpal/${author.id}`)
        }
        else if (token.id !== author.id && window.location.pathname !== '/profile') {
            this.context.router.history.push(`/twinpal/${author.id}`)
        }

    }

    viewComment(e) {
        e.preventDefault()
        this.setState({showFullComment: true})
    }

    // componentDidMount() {
    //     // if(author.id){
    //     this.props.getProfileDetails(author.id).then(author => {
    //         this.setState({authorPicture: author.data.profile_picture, authorUsername: author.data.username})
    //     })
    //     // }
    // }

    render() {
        const {show, showFullComment} = this.state
        const {author, body, timestamp} = this.props.comment
        const more = <p>
            {body.substr(0, 599)}... <a href="" onClick={this.viewComment}>more</a></p>
        return (
            <div className="row">
                <div className="col-sm-1">
                    <p><img src={`http://localhost:8080/uploads/${author.profile_picture}`}
                            width="60" height="40"
                            className="avatar" onClick={this.onProfilePicture}/></p>
                </div>
                <div className="col-sm-11">
                    <ul className="list-inline list-unstyled">
                        <li className="list-inline-item author">
                            <a href="" onClick={this.onProfileLink} id={author.id}>{author.username}</a>
                        </li>
                        <span className="feed-meta">
                            <li className="list-inline-item">{timeSince(timestamp)}</li>
                            </span>
                    </ul>
                    {body.length > 600 && !showFullComment ? more : body}

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
                {/*<ProfilePictureModal show={show} onClose={this.onClose} picture={author.profile_picture}*/}
                                     {/*username={author.username}/>*/}

            </div>
        )
    }
}

CommentView.contextTypes = {
    router: PropTypes.object.isRequired
}
export default CommentView
// export default connect(null, {clearPosts, getProfileDetails, likeComment})(CommentView)