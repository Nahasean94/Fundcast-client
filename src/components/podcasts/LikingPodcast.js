import React, {Component} from 'react'
import {likePodcast, unlikePodcast} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import * as jwt from "jsonwebtoken"

class LikingPodcast extends Component {
    constructor(props){
        super(props)
        this.state={
            liked:false
        }
        this.onLike=this.onLike.bind(this)
    }
    async componentWillMount() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        let liked = false
        if(token){
        await this.props.likes.map(liker => {
            if (liker.liked_by === token.id) {
                liked = true
            }
        })
        if (liked) {
            this.setState({liked: true})
        }
        }
    }

    onLike(e) {
        e.preventDefault()
        if(localStorage.getItem('Fundcast')){
        if (this.state.liked) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            id: window.location.pathname.split('/')[2],
                        },
                        query: unlikePodcast
                    }
                })
                .request.then(({data}) => {
                    if (data.unlikePodcast) {
                        this.setState({
                           liked:false,
                        })

                    }
                }
            )
        }
        else {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            id: window.location.pathname.split('/')[2],
                        },
                        query: likePodcast
                    }
                })
                .request.then(({data}) => {
                    if (data.likePodcast) {
                        this.setState({
                           liked:true
                        })

                    }
                }
            )
        }
        }

    }
    render(){
        const{liked}=this.state
        const {likes}=this.props
        return(
            <h6><a href="" onClick={this.onLike}><i
                className="fa fa-thumbs-up"></i>
                &nbsp; {liked ? 'Unlike' : 'Like'} {likes.length}  &nbsp; </a></h6>
        )
    }

}

export default LikingPodcast