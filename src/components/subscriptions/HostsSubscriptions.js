import React from 'react'
import * as jwt from "jsonwebtoken"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {subscribeToHost, unSubscribeFromHost} from "../../shared/queries"

class HostsSubscriptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubscribed: false,
            token: ''
        }
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        if (token) {
            this.state.token = token
            this.props.subscribers.map(subscriber => {
                if (subscriber === token.id) {
                    this.state.isSubscribed = true
                }
            })
        }
        this.onSubscribe = this.onSubscribe.bind(this)
        this.onUnsubscribe = this.onUnsubscribe.bind(this)
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
                            host: window.location.pathname.split('/')[2],
                        },
                        query: subscribeToHost
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({isSubscribed: true})
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
                            host: window.location.pathname.split('/')[2],
                        },
                        query: unSubscribeFromHost
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({isSubscribed: false})
                    }
                }
            )
        }
    }

    render() {
        const {isSubscribed} = this.state
        const subscribeButton = <button
            className="btn btn-lg btn-primary"
            onClick={this.onSubscribe}>Subscribe {this.props.subscribers.length}</button>
        const unSubscribeButton = <button
            className="btn btn-lg btn-outline-primary"
            onClick={this.onUnsubscribe}>Unsubscribe {this.props.subscribers.length}</button>


        return (
            isSubscribed ? unSubscribeButton : subscribeButton
        )
    }
}

export default HostsSubscriptions