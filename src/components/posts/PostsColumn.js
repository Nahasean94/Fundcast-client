import React from 'react'
import PostView from './PostView'
import PropTypes from 'prop-types'
import {getPosts, getUserPosts, getNewsFeed} from "../../actions/profileActions"
import {addPost, clearPosts} from '../../actions/postsActions'
import {connect} from 'react-redux'
import shortid from 'shortid'
import Loader from 'react-loader-spinner'


class PostsColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.clearPosts()
        if (window.location.pathname === '/') {
            return this.props.getNewsFeed().then(posts => {
                this.setState({isLoading: false})
                if (posts.data.length > 0) {
                    console.log(posts.data)
                    return posts.data.map(p => {
                        return this.props.addPost(p)
                    })
                }
            })
        }
        else if (window.location.pathname === '/profile') {
            return this.props.getPosts().then(posts => {
                this.setState({isLoading: false})
                if (posts.data.length > 0) {
                    return posts.data.map(p => {
                        return this.props.addPost(p)
                    })
                }

            })
        }
        else {
            return this.props.getUserPosts(window.location.pathname.split('/')[2]).then(posts => {
                this.setState({isLoading: false})
                if (posts.data.length > 0) {
                    posts.data.map(p => {
                        return this.props.addPost(p)
                    })
                }
            })
        }

    }

    render() {
        // if (this.state.isLoading) {
        //     const style = {
        //         'border': '16px solid #f3f3f3',
        //         'border-radius': '50%',
        //         'border-top': '16px solid #3498db',
        //         'width': '120px',
        //         'height': '120px',
        //         'animation': 'spin 2s linear infinite',
        //
        //     }
        //     const style2 = {
        //         '@keyframes spin': {
        //             '0%': {
        //                 'transform': 'rotate(0deg)'
        //             },
        //             '100%': {
        //                 'transform': 'rotate(360deg)'
        //             }
        //         }
        //     }

        //     return (
        //         <div style={{style, style2}}/>
        //     )
        // }
        return this.props.posts.map(post => {
            // console.log(post)
            return (
                <div key={shortid.generate()}>
                    <PostView post={post}/>

                </div>
            )
        })
    }
}


PostsColumn.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getUserPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    getNewsFeed: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {posts: state.postsReducers}
}

export default connect(mapStateToProps, {getPosts, addPost, getUserPosts, getNewsFeed, clearPosts})(PostsColumn)