import React from 'react'
import * as jwt from "jsonwebtoken"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {getTagSubscribers, subscribeToTag, unSubscribeFromTag} from "../../shared/queries"

class TagsSubscriptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubscribed: false,
            token: '',
            subscribers: [],
            tagName: ''
        }
        this.onSubscribe = this.onSubscribe.bind(this)
        this.onUnsubscribe = this.onUnsubscribe.bind(this)
    }

    componentDidMount() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        if (token) {
            this.setState({token: token})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            tag: window.location.pathname.split('/')[2],
                        },
                        query: getTagSubscribers
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            tagName: data.getTagSubscribers.name,
                            subscribers: data.getTagSubscribers.subscribers
                        })
                        data.getTagSubscribers.subscribers.map(subscriber => {
                            if (subscriber.id === token.id) {
                                this.setState({isSubscribed: true})
                            }
                        })
                    }
                }
            )
        }
    }

    onSubscribe(e) {
        e.preventDefault()
        if (this.state.token) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            tag: window.location.pathname.split('/')[2],
                        },
                        query: subscribeToTag
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({isSubscribed: true, subscribers: data.subscribeToTag.subscribers})
                    }
                }
            )
        }
    }

    onUnsubscribe(e) {
        e.preventDefault()
        if (this.state.token) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            tag: window.location.pathname.split('/')[2],
                        },
                        query: unSubscribeFromTag
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({isSubscribed: false, subscribers: data.unSubscribeFromTag.subscribers})
                    }
                }
            )
        }
    }

    render() {
        const {isSubscribed} = this.state
        const subscribeButton = <button
            className="btn btn-primary"
            onClick={this.onSubscribe}>Subscribe {this.state.subscribers.length}</button>
        const unSubscribeButton = <button
            className="btn btn-outline-primary"
            onClick={this.onUnsubscribe}>Unsubscribe {this.state.subscribers.length}</button>


        return (
            <ul className="list-inline">
                <li className="list-inline-item"><h3>Tag: {this.state.tagName}</h3></li>
                <li className="list-inline-item pull-right">
                    {isSubscribed ? unSubscribeButton : subscribeButton}
                </li>
                <hr/>
            </ul>
        )
    }
}

export default TagsSubscriptions