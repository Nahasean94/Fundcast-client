import React from 'react'
import Comments from '../comments/Comments'
import PropTypes from 'prop-types'
import {addComment, deletePost, likePost, unlikePost,} from '../../shared/queries'
import jwt from "jsonwebtoken"
import {timeSince} from "../../shared/TimeSince"
import ProfilePictureModal from "../../modals/ProfilePictureModal"
import PostModal from "../../modals/PostModal"
import EditPostModal from "../../modals/EditPostModal"
import DeletePostModal from "../../modals/DeletePostModal"
import {Consumer} from 'graphql-react'
import {connect} from 'react-redux'
import {twinpalFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {deletePost as removePost, updatePost} from "../../actions/postsActions"

const commentForm = (onChange, onComment) => {
    return (
        <form>
            <div className="form-group">
                <textarea rows="1" cols="10" className="form-control" onChange={onChange} autoFocus="true"/>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href=""><i className="fa fa-camera"></i>
                            Media</a></li>
                    </ul>
                </div>
                <div>
                    <div className="pull-right">
                        <button className="btn btn-primary btn-sm" onClick={onComment}>Post
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </form>

    )
}

class PostView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.post,
            commenting: false,
            liked: false,
            comment: '',
            comments: [],
            authorUsername: '',
            authorPicture: '',
            profileName: '',
            viewAll: false,
            show: false,
            showPostModal: false,
            showEditPostModal: false,
            showDeletePostModal: false
        }
        this.onLike = this.onLike.bind(this)
        this.onComment = this.onComment.bind(this)
        this.onCommenting = this.onCommenting.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onProfileLink = this.onProfileLink.bind(this)
        this.onProfilePicture = this.onProfilePicture.bind(this)
        this.onClose = this.onClose.bind(this)
        this.viewPost = this.viewPost.bind(this)
        this.onClosePostModal = this.onClosePostModal.bind(this)
        this.onEditPost = this.onEditPost.bind(this)
        this.isAuthor = this.isAuthor.bind(this)
        this.onCloseEditPostModal = this.onCloseEditPostModal.bind(this)
        this.onDeletePostModal = this.onDeletePostModal.bind(this)
        this.onCloseDeletePostModal = this.onCloseDeletePostModal.bind(this)
        this.onDeletePost = this.onDeletePost.bind(this)

    }

    async componentWillMount() {
        const token = jwt.decode(localStorage.getItem("Twinpal")) ? jwt.decode(localStorage.getItem("Twinpal")) : ''

        let liked = false
        await this.props.post.likes.map(liker => {
            if (token) {
                if (liker.person.id === token.id) {
                    liked = true
                }
            } else {
                liked = false
            }
        })
        if (liked) {
            this.setState({liked: true})
        }
    }

    onLike(e) {
        e.preventDefault()
        const token = jwt.decode(localStorage.getItem("Twinpal")) ? jwt.decode(localStorage.getItem("Twinpal")) : ''
        if (token) {

            if (this.state.author !== token.id) {
                if (this.state.liked) {
                    this.props.graphql
                        .query({
                            fetchOptionsOverride: twinpalFetchOptionsOverride,
                            resetOnLoad: true,
                            operation: {
                                variables: {id: this.state.id},
                                query: unlikePost
                            }
                        })
                        .request.then(({data}) => {
                            if (data) {
                                this.props.updatePost(data.unlikePost)
                            }

                        }
                    )
                }
                else {
                    this.props.graphql
                        .query({
                            fetchOptionsOverride: twinpalFetchOptionsOverride,
                            resetOnLoad: true,
                            operation: {
                                variables: {id: this.state.id},
                                query: likePost
                            }
                        })
                        .request.then(({data}) => {
                            if (data) {
                                this.props.updatePost(data.likePost)
                            }

                        }
                    )
                }
            } else {
                //TODO add a flash message to tell user they cannot like their own post
            }

        }

    }

    onCommenting(e) {
        e.preventDefault()
        const token = jwt.decode(localStorage.getItem("Twinpal")) ? jwt.decode(localStorage.getItem("Twinpal")) : ''
        if (token) {
            this.setState({commenting: true})
        }
    }

    onComment(e) {
        e.preventDefault()
        this.setState({commenting: false})
        this.props.graphql
            .query({
                fetchOptionsOverride: twinpalFetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {post_id: this.state.id, comment: this.state.comment},
                    query: addComment
                }
            })
            .request.then(({data}) => {
                if (data) {
                    this.props.updatePost(data.addComment)
                }

            }
        )
        this.setState({viewAll: true})

    }

    onProfileLink(e) {

        e.preventDefault()
        const {author, profile} = this.props.post
// this.props.clearPosts()
        const token = jwt.decode(localStorage.getItem("Twinpal")) ? jwt.decode(localStorage.getItem("Twinpal")) : ''
        if (token) {
            if (token.id !== author.id && token.id !== profile.id) {
                this.context.router.history.push(`/twinpal/${ e.target.id}`)
            }
            else if (token.id === author.id && token.id === profile.id) {
                if (window.location.pathname !== '/profile') {
                    this.context.router.history.push('/profile')
                }
            }
            else if (token.id === author.id && token.id !== profile.id) {
                if (window.location.pathname !== '/profile' && token.id === e.target.id) {

                    this.context.router.history.push('/profile')
                } else {
                    if (token.id !== e.target.id) {
                        this.context.router.history.push(`/twinpal/${profile.id}`)
                    }
                }
            }
            else if (token.id !== author.id && token.id === profile.id) {
                if (window.location.pathname === '/profile' && token.id !== e.target.id) {

                    this.context.router.history.push(`/twinpal/${author.id}`)
                }
                else if (window.location.pathname !== '/profile' && token.id === e.target.id) {

                    this.context.router.history.push('/profile')
                }
            }
        } else {
            this.context.router.history.push(`/twinpal/${ e.target.id}`)
        }

    }

    onProfilePicture(e) {
        e.preventDefault()
        this.setState({show: true})
    }

    onChange(e) {
        e.preventDefault()
        this.setState({comment: e.target.value})
    }

//
    onClose() {
        this.setState({show: !this.state.show})
    }

    onClosePostModal() {
        this.setState({showPostModal: !this.state.showPostModal})
    }

    viewPost(e) {
        e.preventDefault()
        this.setState({showPostModal: true})
    }

    isAuthor() {
        const token = jwt.decode(localStorage.getItem("Twinpal")) ? jwt.decode(localStorage.getItem("Twinpal")) : ''
        const {author} = this.state
        if (!token) {
            return false
        }
        return token.id === author.id
    }

    onEditPost(e) {
        e.preventDefault()
        this.setState({showEditPostModal: true})
    }

    onCloseEditPostModal() {
        this.setState({showEditPostModal: false})
    }

    onDeletePostModal(e) {
        e.preventDefault()
        this.setState({showDeletePostModal: true})
    }

    onCloseDeletePostModal() {
        this.setState({showDeletePostModal: false})
    }

    onDeletePost() {
        this.props.graphql
            .query({
                fetchOptionsOverride: twinpalFetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {id: this.state.id},
                    query: deletePost
                }
            })
            .request.then(({data}) => {
            if (data) {
                this.props.removePost(data.deletePost)
            }
        })

    }

    render() {
        const {showPostModal, show, liked, commenting, viewAll, showEditPostModal, showDeletePostModal} = this.state
        const {id, body, timestamp, scope, uploads, author, profile, likes} = this.props.post
        let {comments} = this.props.post
        const authorUsername = jwt.decode(localStorage.getItem('Twinpal')) ? jwt.decode(localStorage.getItem('Twinpal')).username : ""
        const targetProfile = <span>
             <li className="list-inline-item"><i className="fa fa-angle-double-right" aria-hidden="true"></i></li> <li
            className="list-inline-item author">{authorUsername && profile.username === authorUsername ? '' :<a href="" onClick={this.onProfileLink}
                                                                                                                      id={profile.id}>{ profile.username}</a>} &nbsp;</li>
        </span>
        const more = <p>
            {body !== undefined &&
            body.substr(0, 599)}... <a href="">more</a></p>
        // const upload = uploads > 0 ?
        const upload = uploads.length > 0 ?
            <img src={`http://localhost:8080/uploads/${uploads[0].path}`} width="600" height="400"
                 alt="Uploads"/> : ''
        const postActions = <div className="btn-group">
            <strong className="dropdown-toggle dropdown-toggle-split more-options" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">actions</span>
            </strong>
            <div className="dropdown-menu">
                {uploads.length > 0 && body === undefined ? '' :
                    <a className="dropdown-item" href="" onClick={this.onEditPost}>Edit post</a>}
                <a className="dropdown-item" href="" onClick={this.onDeletePostModal}>Delete post</a>
                <a className="dropdown-item" href="#">Edit post visibility</a>
            </div>
        </div>
        //TODO add edit post visibility
        return (
            <div>
                <div className="well">
                    <div className="row">
                        <div className="col-sm-2">
                            <p><img src={`http://localhost:8080/uploads/${author.profile_picture}`}
                                    onClick={this.onProfilePicture}
                                    width="70" height="70"
                                    className="avatar"/></p>
                        </div>
                        <div className="col-sm-10">
                            <ul className="list-inline list-unstyled">
                                <li className="list-inline-item author">
                                    <h6><a href="" onClick={this.onProfileLink}
                                           id={author.id}>{author.username}</a></h6>
                                </li>
                                <span className="feed-meta">
                                    {profile.username && targetProfile}
                                    <li className="list-inline-item">{scope}</li>
                                <li className="list-inline-item">{timeSince(timestamp)}</li>
                                    {this.isAuthor() ? postActions : ''}

                            </span>
                            </ul>
                            {/*<div className="view-post" >*/}
                            {/*{body !== undefined ? body.length > 600 ? more : body : upload}*/}

                            {/*</div>*/}
                            <div className="view-post" onClick={this.viewPost}>
                                {body !== '' ? body.length > 600 ? more : body : upload}
                            </div>
                            <div className="feed-meta">
                                <ul className="list-inline list-unstyled">

                                    <li className="list-inline-item"><a href="" onClick={this.onLike}><i
                                        className="fa fa-thumbs-up"></i>
                                        &nbsp; {liked ? 'Liked' : 'Like'} {likes.length}  &nbsp; </a></li>
                                    <li className="list-inline-item">
                                        <ul className="list-unstyled">
                                            {comments.length > 0 ?
                                                <Comments comments={comments} history={this.props.history}
                                                          viewAll={viewAll}/> : ''}
                                        </ul>
                                    </li>

                                </ul>
                            </div>

                            <ProfilePictureModal show={show} onClose={this.onClose} picture={author.profile_picture}
                                                 username={author.username}/>
                            <PostModal show={showPostModal} onClose={this.onClosePostModal} post={body}
                                       uploads={uploads} username={author.username}/>
                            <Consumer>{graphql => <EditPostModal graphql={graphql} show={showEditPostModal}
                                                                 post={body}
                                                                 onClose={this.onCloseEditPostModal}
                                                                 postId={id}/>}</Consumer>
                            <DeletePostModal show={showDeletePostModal} onClose={this.onCloseDeletePostModal}
                                             onDeletePost={this.onDeletePost}/>
                        </div>
                    </div>
                </div>

                <p className="list-inline-item"><a href="" onClick={this.onCommenting}><i
                    className="fa fa-comment"></i>
                    &nbsp; Leave a comment</a>
                </p>
                {commenting ? commentForm(this.onChange, this.onComment) : ''}
            </div>
        )
    }

}

PostView.propTypes = {
    post: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    // likePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    // saveComment: PropTypes.func.isRequired,
    // getComments: PropTypes.func.isRequired,
    // getProfileDetails: PropTypes.func.isRequired,
    // clearPosts: PropTypes.func.isRequired,
    // unlikePost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    // deletePost: PropTypes.func.isRequired,
}
PostView.contextTypes = {
    router: PropTypes.object.isRequired
}

// export default PostView
export default connect(null, {removePost, updatePost})(PostView)