// import React from 'react'
// import Comments from '../comments/Comments'
// import PropTypes from 'prop-types'
// import {
//     likePost, updatePost, getProfileDetails, clearPosts, unlikePost, removePost,
//     deletePost
// } from '../../actions/postsActions'
// import {connect} from 'react-redux'
// import jwt from "jsonwebtoken"
// import {timeSince} from "../../shared/TimeSince"
// import {getComments, saveComment} from "../../actions/commentsActions"
// import ProfilePictureModal from "../../modals/ProfilePictureModal"
// import PostModal from "../../modals/PostModal"
// import EditPostModal from "../../modals/EditPostModal"
// import DeletePostModal from "../../modals/DeletePostModal"
//
// const commentForm = (onChange, onComment) => {
//     return (
//         <form>
//             <div className="form-group">
//                 <textarea rows="1" cols="10" className="form-control" onChange={onChange} autoFocus="true"/>
//             </div>
//             <div className="row">
//                 <div className="col-sm-6">
//                     <ul className="list-inline">
//                         <li className="list-inline-item"><a href=""><i className="fa fa-camera"></i>
//                             Media</a></li>
//                         <li className="list-inline-item"><a href=""><i className="fa fa-map-marker"></i>
//                             Location</a></li>
//                     </ul>
//                 </div>
//                 <div>
//                     <div className="pull-right">
//                         <button className="btn btn-primary btn-sm" onClick={onComment}>Post
//                             Comment
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </form>
//
//     )
// }
//
// class PostView extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             ...this.props.post,
//             commenting: false,
//             liked: false,
//             comment: '',
//             comments: [],
//             authorUsername: '',
//             authorPicture: '',
//             profileName: '',
//             viewAll: false,
//             show: false,
//             showPostModal: false,
//             showEditPostModal: false,
//             showDeletePostModal: false
//         }
//         this.onLike = this.onLike.bind(this)
//         this.onComment = this.onComment.bind(this)
//         this.onCommenting = this.onCommenting.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.onProfileLink = this.onProfileLink.bind(this)
//         this.onProfilePicture = this.onProfilePicture.bind(this)
//         this.onClose = this.onClose.bind(this)
//         this.viewPost = this.viewPost.bind(this)
//         this.onClosePostModal = this.onClosePostModal.bind(this)
//         this.onEditPost = this.onEditPost.bind(this)
//         this.isAuthor = this.isAuthor.bind(this)
//         this.onCloseEditPostModal = this.onCloseEditPostModal.bind(this)
//         this.onDeletePostModal = this.onDeletePostModal.bind(this)
//         this.onCloseDeletePostModal = this.onCloseDeletePostModal.bind(this)
//         this.onDeletePost = this.onDeletePost.bind(this)
//
//     }
//
//     componentDidMount() {
//         const {author, profile} = this.state
//         this.props.getComments(this.state._id).then(comments => {
//             if (comments) {
//                 this.setState({comments: comments.data})
//             }
//         })
//
//         if (profile._id && author._id !== profile._id) {
//             this.setState({profileName: profile.username})
//         }
//
//     }
//
//     async componentWillMount() {
//         const token = jwt.decode(localStorage.jwtToken)
//         let liked = false
//         await this.state.likes.map(liker => {
//             if (liker.liked_by === token.id) {
//                 liked = true
//             }
//         })
//         if (liked) {
//             this.setState({liked: true})
//         }
//     }
//
//     onLike(e) {
//         e.preventDefault()
//         if (this.state.liked) {
//             this.props.unlikePost(this.state._id).then(post => {
//                 this.props.updatePost(post.data)
//             })
//         }
//         else {
//
//             this.props.likePost(this.state._id).then(post => {
//                 this.props.updatePost(post.data)
//             })
//         }
//     }
//
//     onCommenting(e) {
//         e.preventDefault()
//         this.setState({commenting: true})
//     }
//
//     onComment(e) {
//         e.preventDefault()
//         this.setState({commenting: false})
//         this.props.saveComment(this.state._id, this.state.comment).then(comment => {
//             this.props.getComments(this.state._id).then(comments => {
//                 if (comments) {
//                     this.setState({comments: []})
//                     this.setState({comments: comments.data})
//                     this.setState({viewAll: true})
//                 }
//             })
//         })
//     }
//
//     onProfileLink(e) {
//         e.preventDefault()
//         const {author, profile} = this.state
// // this.props.clearPosts()
//         const token = jwt.decode(localStorage.jwtToken)
//      if (token.id !== author._id && token.id !== profile._id) {
//             // if (window.location.pathname === '/' ) {
//                 this.context.router.history.push(`/twinpal/${ e.target.id}`)
//             // }
//         }
//      else if (token.id === author._id && token.id === profile._id) {
//              if (window.location.pathname !== '/profile') {
//                 this.context.router.history.push('/profile')
//             }
//         }
//         else if (token.id === author._id && token.id !== profile._id) {
//             if (window.location.pathname !== '/profile' && token.id === e.target.id) {
//
//                 this.context.router.history.push('/profile')
//             } else {
//                 if (token.id !== e.target.id) {
//                     this.context.router.history.push(`/twinpal/${profile._id}`)
//                 }
//             }
//         }
//         else if (token.id !== author._id && token.id === profile._id) {
//             if (window.location.pathname === '/profile' && token.id !== e.target.id) {
//
//                 this.context.router.history.push(`/twinpal/${author._id}`)
//             }
//             else if (window.location.pathname !== '/profile' && token.id === e.target.id) {
//
//                 this.context.router.history.push('/profile')
//             }
//         }
//
//     }
//
//     onProfilePicture(e) {
//         e.preventDefault()
//         this.setState({show: true})
//     }
//
//     onChange(e) {
//         e.preventDefault()
//         this.setState({comment: e.target.value})
//     }
//
//     onClose() {
//         this.setState({show: !this.state.show})
//     }
//
//     onClosePostModal() {
//         this.setState({showPostModal: !this.state.showPostModal})
//     }
//
//     viewPost(e) {
//         e.preventDefault()
//         this.setState({showPostModal: true})
//     }
//
//     isAuthor() {
//         const token = jwt.decode(localStorage.jwtToken)
//         const {author} = this.state
//         return token.id === author._id
//     }
//
//     onEditPost(e) {
//         e.preventDefault()
//         this.setState({showEditPostModal: true})
//     }
//
//     onCloseEditPostModal() {
//         this.setState({showEditPostModal: false})
//     }
//
//     onDeletePostModal(e) {
//         e.preventDefault()
//         this.setState({showDeletePostModal: true})
//     }
//
//     onCloseDeletePostModal() {
//         this.setState({showDeletePostModal: false})
//     }
//
//     onDeletePost() {
//         this.props.removePost(this.state._id).then(post => {
//             this.props.deletePost(post.data)
//             this.setState({showDeletePostModal: false})
//         })
//     }
//
//     render() {
//         const {_id, showPostModal, body, authorUsername, likes, show, timestamp, scope, liked, commenting, comments, viewAll, profileName, uploads, author, profile, showEditPostModal, showDeletePostModal} = this.state
//
//         const targetProfile = <span>
//              <li className="list-inline-item"><i className="fa fa-angle-double-right" aria-hidden="true"></i></li> <li
//             className="list-inline-item author"><a href="" onClick={this.onProfileLink}
//                                                    id={profile._id}>{profile.username}</a> &nbsp;</li>
//         </span>
//         const more = <p>
//             {body !== undefined &&
//             body.substr(0, 599)}... <a href="" onClick={this.viewPost}>more</a></p>
//         const upload = uploads.length > 0 ?
//             <img src={`/uploads/${uploads[0].path}`} width="600" height="550" alt="Uploads"/> : ''
//         const postActions = <div className="btn-group">
//             <strong className="dropdown-toggle dropdown-toggle-split more-options" data-toggle="dropdown"
//                     aria-haspopup="true" aria-expanded="false">
//                 <span className="sr-only">actions</span>
//             </strong>
//             <div className="dropdown-menu">
//                 {uploads.length > 0 && body === undefined ? '' :
//                     <a className="dropdown-item" href="" onClick={this.onEditPost}>Edit post</a>}
//                 <a className="dropdown-item" href="" onClick={this.onDeletePostModal}>Delete post</a>
//                 <a className="dropdown-item" href="#">Edit post visibility</a>
//             </div>
//         </div>
//         return (
//             <div>
//                 <div className="well">
//                     <div className="row">
//                         <div className="col-sm-2">
//                             <p><img src={`/uploads/${author.profile_picture}`}
//                                     width="70" height="70" onClick={this.onProfilePicture}
//                                     className="avatar"/></p>
//                         </div>
//                         <div className="col-sm-10">
//                             <ul className="list-inline list-unstyled">
//                                 <li className="list-inline-item author">
//                                     <h6><a href="" onClick={this.onProfileLink}
//                                            id={author._id}>{author.username}</a></h6>
//                                 </li>
//                                 <span className="feed-meta">
//                                     {profileName && targetProfile}
//                                     <li className="list-inline-item">{scope}</li>
//                                 <li className="list-inline-item">{timeSince(timestamp)}</li>
//                                     {this.isAuthor() ? postActions : ''}
//
//                             </span>
//                             </ul>
//                             <div className="view-post" onClick={this.viewPost}>
//                                 {body !== undefined ? body.length > 600 ? more : body : upload}
//
//                             </div>
//                             <div className="feed-meta">
//                                 <ul className="list-inline list-unstyled">
//                                     <li className="list-inline-item"><a href="" onClick={this.onLike}><i
//                                         className="fa fa-thumbs-up"></i>
//                                         &nbsp; {liked ? 'Liked' : 'Like'} {likes.length}  &nbsp; </a></li>
//                                     <li className="list-inline-item">
//                                         <ul className="list-unstyled">
//                                             {comments.length ? <Comments comments={comments} viewAll={viewAll}/> : ''}
//                                         </ul>
//                                     </li>
//
//                                 </ul>
//                             </div>
//
//                             <ProfilePictureModal show={show} onClose={this.onClose} picture={author.profile_picture}
//                                                  username={author.username}/>
//                             <PostModal show={showPostModal} onClose={this.onClosePostModal} post={body}
//                                        uploads={uploads} username={authorUsername}/>
//                             <EditPostModal show={showEditPostModal} post={body} onClose={this.onCloseEditPostModal}
//                                            postId={_id}/>
//                             <DeletePostModal show={showDeletePostModal} onClose={this.onCloseDeletePostModal}
//                                              onDeletePost={this.onDeletePost}/>
//                         </div>
//                     </div>
//                 </div>
//
//                 <p className="list-inline-item"><a href="" onClick={this.onCommenting}><i
//                     className="fa fa-comment"></i>
//                     &nbsp; Leave a comment</a>
//                 </p>
//                 {commenting ? commentForm(this.onChange, this.onComment) : ''}
//             </div>
//         )
//     }
// }
//
//
// PostView.propTypes = {
//     post: PropTypes.object.isRequired,
//     likePost: PropTypes.func.isRequired,
//     updatePost: PropTypes.func.isRequired,
//     saveComment: PropTypes.func.isRequired,
//     getComments: PropTypes.func.isRequired,
//     getProfileDetails: PropTypes.func.isRequired,
//     clearPosts: PropTypes.func.isRequired,
//     unlikePost: PropTypes.func.isRequired,
//     removePost: PropTypes.func.isRequired,
//     deletePost: PropTypes.func.isRequired,
// }
// PostView.contextTypes = {
//     router: PropTypes.object.isRequired
// }
//
// export default connect(null, {
//     likePost,
//     updatePost,
//     getComments,
//     saveComment,
//     getProfileDetails, clearPosts, unlikePost, removePost, deletePost,
// })(PostView)
import React from 'react'
import Comments from '../comments/Comments'
import PropTypes from 'prop-types'
import {likePost, unlikePost, deletePost, addComment} from '../../shared/queries'
// import {compose, graphql} from 'react-apollo'
import jwt from "jsonwebtoken"
import {timeSince} from "../../shared/TimeSince"
// // import {getComments, saveComment} from "../../actions/commentsActions"
// import ProfilePictureModal from "../../modals/ProfilePictureModal"
// import PostModal from "../../modals/PostModal"
// import EditPostModal from "../../modals/EditPostModal"
// import DeletePostModal from "../../modals/DeletePostModal"

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
                        <li className="list-inline-item"><a href=""><i className="fa fa-map-marker"></i>
                            Location</a></li>
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

    //
    // componentDidMount() {
    //     const {author, profile} = this.state
    //     this.props.getComments(this.state.id).then(comments => {
    //         if (comments) {
    //             this.setState({comments: comments.data})
    //         }
    //     })
    //
    //     if (profile.id && author.id !== profile.id) {
    //         this.setState({profileName: profile.username})
    //     }
    //
    // }

    async componentWillMount() {
        const token = jwt.decode(localStorage.getItem("Twinpal"))
        let liked = false
        await this.props.post.likes.map(liker => {
            if (liker.person.id === token.id) {
                liked = true
            }
        })
        if (liked) {
            this.setState({liked: true})
        }
    }

//
    onLike(e) {
        e.preventDefault()
        if (this.state.liked) {
            this.props.unlikePost({
                variables: {
                    id: this.state.id
                }
            })
        }
        else {
            this.props.likePost({
                variables: {
                    id: this.state.id
                }
            })
        }
    }

    onCommenting(e) {
        e.preventDefault()
        this.setState({commenting: true})
    }

    onComment(e) {
        e.preventDefault()
        this.setState({commenting: false})
        this.props.addComment({
            variables: {
                post_id: this.state.id,
                comment: this.state.comment
            }
        }).then(comment => {
            // this.props.getComments(this.state.id).then(comments => {
            //     if (comments) {
            //         this.setState({comments: []})
            //         this.setState({comments: comments.data})
            //     }
            // })
            this.setState({viewAll: true})
        })
    }

    onProfileLink(e) {

        e.preventDefault()
        const {author, profile} = this.props.post
// this.props.clearPosts()
        const token = jwt.decode(localStorage.getItem('Twinpal'))
        if (token.id !== author.id && token.id !== profile.id) {
            // if (window.location.pathname === '/' ) {
             this.context.router.history.push(`/twinpal/${ e.target.id}`)
            // }
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
        const token = jwt.decode(localStorage.getItem("Twinpal"))
        const {author} = this.state
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
        this.props.deletePost({
            variables: {
                id: this.state.id
            }
        }).then(post => {
            // this.props.deletePost(post.data)
            this.setState({showDeletePostModal: false})
        })
    }

    render() {
        const {showPostModal, show, liked, commenting, viewAll, showEditPostModal, showDeletePostModal} = this.state
        const {id, body, timestamp, scope, uploads, author, profile, likes} = this.props.post
        let {comments}=this.props.post
        const targetProfile = <span>
             <li className="list-inline-item"><i className="fa fa-angle-double-right" aria-hidden="true"></i></li> <li
            className="list-inline-item author"><a href="" onClick={this.onProfileLink}
                                                   id={profile.id}>{profile.username}</a> &nbsp;</li>
        </span>
        const more = <p>
            {body !== undefined &&
            body.substr(0, 599)}... <a href="">more</a></p>
        // const upload = uploads > 0 ?
        const upload = uploads.length > 0 ?
            <img src={`http://localhost:8080/uploads/${uploads[0].path}`} width="600" height="550" alt="Uploads"/> : ''
        const postActions = <div className="btn-group">
            <strong className="dropdown-toggle dropdown-toggle-split more-options" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">actions</span>
            </strong>
            <div className="dropdown-menu">
                {/*{uploads > 0 && body === undefined ? '' :*/}
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
                            <p><img src={`http://localhost:8080/uploads/${author.profile_picture}`} onClick={this.onProfilePicture}
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

                            {/*<ProfilePictureModal show={show} onClose={this.onClose} picture={author.profile_picture}*/}
                            {/*username={author.username}/>*/}
                            {/*<PostModal show={showPostModal} onClose={this.onClosePostModal} post={body}*/}
                            {/*uploads={uploads} username={author.username}/>*/}
                            {/*<EditPostModal show={showEditPostModal} post={body} onClose={this.onCloseEditPostModal}*/}
                            {/*postId={id}/>*/}
                            {/*<DeletePostModal show={showDeletePostModal} onClose={this.onCloseDeletePostModal}*/}
                            {/*onDeletePost={this.onDeletePost}/>*/}
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
    // updatePost: PropTypes.func.isRequired,
    // saveComment: PropTypes.func.isRequired,
    // getComments: PropTypes.func.isRequired,
    // getProfileDetails: PropTypes.func.isRequired,
    // clearPosts: PropTypes.func.isRequired,
    // unlikePost: PropTypes.func.isRequired,
    // removePost: PropTypes.func.isRequired,
    // deletePost: PropTypes.func.isRequired,
}
PostView.contextTypes = {
    router: PropTypes.object.isRequired
}

export default PostView
// export default compose(graphql(likePost, {name: "likePost"}), graphql(unlikePost, {name: "unlikePost"}), graphql(deletePost, {name: "deletePost"}), graphql(addComment, {name: "addComment"}))(PostView)