import React, {Component} from 'react'
import {addHistory, addListens} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"

class ListeningPodcast extends Component {
    constructor(props) {
        super(props)
        this.addListener = this.addListener.bind(this)
    }

    addListener() {
        let token
        if (localStorage.getItem('Fundcast')) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            podcast_id: window.location.pathname.split('/')[2],
                        },
                        query: addHistory
                    }
                })
                .request.then(({data}) => {
                    // if (data.unlikePodcast) {
                    //     this.setState({
                    //         liked:false,
                    //     })
                    //
                    // }
                }
            )
        } else {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            podcast_id: window.location.pathname.split('/')[2],
                        },
                        query: addListens
                    }
                })
                .request.then(({data}) => {
                    // if (data.unlikePodcast) {
                    //     this.setState({
                    //         liked:false,
                    //     })
                    //
                    // }
                }
            )
        }
    }

    render() {
        const {listens, audioFile} = this.props.podcast
        return (
            <audio src={`http://localhost:8080/uploads/${audioFile.path}`} controls={true}
                   className="rounded" style={{width: '100%'}} onPlay={this.addListener}/>
        )
    }

}

export default ListeningPodcast