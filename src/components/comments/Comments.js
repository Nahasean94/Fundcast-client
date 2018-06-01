// import React from 'react'
// import CommentView from './CommentView'
// import PropTypes from 'prop-types'
// import {addComment, clearComments, deleteComment, saveComment, updateComment} from "../../actions/commentsActions"
// import {connect} from 'react-redux'
//
// const AllComments = ({comments, toggleHidden}) => {
//     return (
//         <div>
//             {comments.map(comment => {
//                 return (
//                     <li key={comment._id}><CommentView comment={comment}/></li>)
//             })
//             }
//             <li><a href="" onClick={toggleHidden}>Show less</a></li>
//         </div>
//     )
// }
//
// class Comments extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             hidden: this.props.viewAll
//         }
//         this.toggleHidden = this.toggleHidden.bind(this)
//     }
//
//     // componentWillReceiveProps(nextProps) {
//     //     if (nextProps.comments !== this.props.comments) {
//     //         this.props.comments.map(comment => {
//     //             this.props.addComment(comment)
//     //         })
//     //     }
//     // }
//
//     toggleHidden(e) {
//         e.preventDefault()
//         this.setState({hidden: !this.state.hidden})
//     }
//
//     render() {
//         const {hidden} = this.state
//         const comments = this.props.comments
//         const otherComments = <li><a href="" onClick={this.toggleHidden}>View
//             all {comments.length} comments</a>
//         </li>
//         return (
//             <span>
//                 <li hidden={hidden} className="list-inline-item"><CommentView comment={comments[0]}/></li>
//                 {hidden ? <AllComments comments={comments} toggleHidden={this.toggleHidden}/> : ''}
//                 {comments.length > 1 && !hidden ? otherComments : ''}
//             </span>
//         )
//     }
// }
//
// Comments.propTypes = {
//     comments: PropTypes.array.isRequired,
//     addComment: PropTypes.func.isRequired,
//     clearComments: PropTypes.func.isRequired,
//     deleteComment: PropTypes.func.isRequired,
//     updateComment: PropTypes.func.isRequired,
//     viewAll: PropTypes.bool.isRequired
// }
//
// // function mapStateToProps(state) {
// //     return {
// //         comments: state.commentsReducers
// //     }
// // }
// //
//
// export default connect(null, {
//     addComment,
//     clearComments,
//     deleteComment,
//     updateComment,
//     saveComment
// })(Comments)
import React from 'react'
import CommentView from './CommentView'
import PropTypes from 'prop-types'
// import {addComment, clearComments, deleteComment, saveComment, updateComment} from "../../actions/commentsActions"
// import {connect} from 'react-redux'

const AllComments = ({comments, toggleHidden}) => {
    return (
        <div>
            {comments.map(comment => {
                return (
                    <li key={comment.id}><CommentView comment={comment}/></li>)
            })
            }
            <li><a href="" onClick={toggleHidden}>Show less</a></li>
        </div>
    )
}

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: this.props.viewAll
        }
        this.toggleHidden = this.toggleHidden.bind(this)
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.comments !== this.props.comments) {
    //         this.props.comments.map(comment => {
    //             this.props.addComment(comment)
    //         })
    //     }
    // }

    toggleHidden(e) {
        e.preventDefault()
        this.setState({hidden: !this.state.hidden})
    }

    render() {
        const {hidden} = this.state
        const comments = this.props.comments
        const otherComments = <li><a href="" onClick={this.toggleHidden}>View
            all {comments.length} comments</a>
        </li>
        return (
            <span>
                <li hidden={hidden} className="list-inline-item"><CommentView comment={comments[0]}/></li>
                {hidden ? <AllComments comments={comments} toggleHidden={this.toggleHidden} /> : ''}
                {comments.length > 1 && !hidden ? otherComments : ''}
            </span>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    // history: PropTypes.object.isRequired,
    // addComment: PropTypes.func.isRequired,
    // clearComments: PropTypes.func.isRequired,
    // deleteComment: PropTypes.func.isRequired,
    // updateComment: PropTypes.func.isRequired,
    viewAll: PropTypes.bool.isRequired
}

// function mapStateToProps(state) {
//     return {
//         comments: state.commentsReducers
//     }
// }
//

export default Comments
// export default connect(null, {
//     addComment,
//     clearComments,
//     deleteComment,
//     updateComment,
//     saveComment
// })(Comments)