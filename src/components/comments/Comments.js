import React from 'react'
import CommentView from './CommentView'
import {addComment, findPodcastComments} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Query} from 'graphql-react'
import validator from 'validator'
import {isEmpty} from 'lodash'
import classnames from "classnames"

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            errors: {},
            liked:false,
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    validateInput(data) {
        let errors = {}

        if (data.comment.length < 4) {
            errors.comment = 'Comment must be more than 4 characters'
        }
        if (validator.isEmpty(data.comment)) {
            errors.comment = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onChange(e) {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit(e) {
        e.preventDefault()
        if (this.isValid() && localStorage.getItem('Fundcast')) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            podcast_id: window.location.pathname.split('/')[2],
                            comment: this.state.comment,
                        },
                        query: addComment
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            comment: '',
                            errors: {},
                            isLoading: false,
                            invalid: false,
                            message: data
                                ? <li key={data.addComment.id}><CommentView comment={data.addComment}/></li>
                                : `Posting failed failed.`
                        })
                    }
                }
            )

        }
    }

    render() {
        const {errors} = this.state
        const commentError = errors.comment
        return (
            <div className="container">
                <h3>Comments</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea name="comment" onChange={this.onChange}
                                  className={classnames("form-control form-control-sm", {"is-invalid": commentError})}
                                  rows="3" placeholder="Add comment" onClick={this.onChange} value={this.state.comment}/>
                        {commentError && <div className="invalid-feedback">{commentError}</div>}
                    </div>
                    <div className="row">
                        <div className="col-sm-2 offset-sm-10">
                            <button className="btn btn-primary" type="submit" onClick={this.onSubmit}>Comment
                            </button>
                        </div>
                    </div>
                </form>
                <hr/>
                <Query
                    loadOnMount
                    loadOnReset
                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                    variables={{
                        podcast_id: window.location.pathname.split('/')[2],

                    }}
                query= {findPodcastComments}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.findPodcastComments.length>0) {

                            return <ul className="list-unstyled">
                                {data.findPodcastComments.map(comment => {
                                    return (
                                        <li key={comment.id}><CommentView comment={comment}/></li>)
                                })
                                }

                            </ul>
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>No comments found</p>
                }

                }
            </Query>
    </div>

    )
    }
}

export default Comments
