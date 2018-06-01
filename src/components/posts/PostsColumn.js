import React from 'react'
import PostView from './PostView'
import PropTypes from 'prop-types'
// import {getPosts, getUserPosts, getNewsFeed} from "../../actions/profileActions"
// import {addPost, clearPosts} from '../../actions/postsActions'
import {connect} from 'react-redux'
import shortid from 'shortid'
// import Loader from 'react-loader-spinner'
import {fetchNewsFeed, fetchPalPosts, fetchProfilePosts} from "../../shared/queries"
import {twinpalFetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {Query,Consumer} from 'graphql-react'


class PostsColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        if (window.location.pathname === '/') {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                query={fetchNewsFeed}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchNewsFeed) {
                            return data.fetchNewsFeed.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PostView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)
        }
        else if (window.location.pathname === '/profile') {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                query={fetchProfilePosts}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchProfilePosts) {
                            return data.fetchProfilePosts.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PostView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)

        }
        else {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                variables={{id: window.location.pathname.split('/')[2]}}
                query={fetchPalPosts}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchPalPosts) {
                            return data.fetchPalPosts.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PostView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)

        }
    }

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
    // return this.props.posts.map(post => {
    // console.log(post)
    // return (
    //     {/*<div key={shortid.generate()}>*/}
    //         {/*<PostView post={post}graphql={graphql}/>}</Consumer>*/}
    //
    // {/*</div>*/}
    // )
    // })
    // }
}


// PostsColumn.propTypes = {
//     getPosts: PropTypes.func.isRequired,
//     getUserPosts: PropTypes.func.isRequired,
//     addPost: PropTypes.func.isRequired,
//     getNewsFeed: PropTypes.func.isRequired,
//     clearPosts: PropTypes.func.isRequired,
//     posts: PropTypes.array.isRequired
// }
//
// function mapStateToProps(state) {
//     return {posts: state.postsReducers}
// }

export default PostsColumn
// export default connect(mapStateToProps, {getPosts, addPost, getUserPosts, getNewsFeed, clearPosts})(PostsColumn)