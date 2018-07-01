import React from 'react'
import PodcastView from '../PodcastView'
import shortid from 'shortid'
import {podcasts, tags as queryTags} from "../../../shared/queries"
import {fundcastFetchOptionsOverride} from '../../../shared/fetchOverrideOptions'
import {Consumer, Query} from 'graphql-react'
import Link from "react-router-dom/es/Link"



class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            tags: [],
            message: '',
            error: ''
        }
        // this.onChange = this.onChange.bind(this)
        // this.getTags()
    }

    // getTags() {
    //     return <Query
    //         loadOnMount
    //         loadOnReset
    //         fetchOptionsOverride={fundcastFetchOptionsOverride}
    //         query={queryTags}
    //     >
    //         {({loading, data}) => {
    //             if (data) {
    //                 if (data.tags.length > 0) {
    //                     this.setState({tags: data.tags})
    //                 }
    //                 else {
    //                     this.setState({message: "No tags found"})
    //                 }
    //             }
    //             else if (loading) {
    //                 this.setState({message: "Loading"})
    //
    //             }
    //             else this.setState({message: "Loading failed"})
    //         }
    //         }
    //     </Query>
    // }

    // onChange(e) {
    //     // let arr_results = []
    //     // this.props.clearTeachers()
    //     searchResults.length = 0
    //     this.render()
    //     for (let i = 0; i < tags.length; i++) {
    //         let exp = new RegExp(e.target.value, 'i')
    //         if (String(tags[i].name).match(exp)) {
    //             searchResults.push(tags[i])
    //             this.render()
    //             // arr_results.push(teachers[i])
    //             // this.props.addTeacher(teachers[i])
    //         }
    //
    //     }
    // }

    render() {
        // const {loading, message, tags} = this.state
        return (
            <div className="container">
                <div className="row flex-xl-nowrap">
                    <div className="col-2 col-md-2 bd-sidebar">
                        {/*<form>*/}
                        {/*<div className="input-group">*/}
                        {/*<input type="text"*/}
                        {/*className="form-control form-control-sm"*/}
                        {/*placeholder="Search "*/}
                        {/*aria-label="Search " aria-describedby="basic-addon1"*/}
                        {/*onChange={this.onChange} name="tsc"/>*/}
                        {/*</div>*/}
                        {/*</form>*/}
                        {/*<hr/>*/}

                        {/*{loading ?*/}
                        {/*<p>Loading…</p>*/}
                        {/*: message ? <p>{message}</p> :*/}
                        {/*<ul className="list-unstyled">*/}
                        {/*<li><strong><Link to="/tags">All</Link></strong></li>*/}
                        {/*{tags.map(tag => {*/}
                        {/*const tagLink = `/tags/${tag.id}`*/}
                        {/*return (<li><strong><Link to={tagLink}>{tag.name}</Link></strong></li>)*/}
                        {/*})}*/}
                        {/*</ul>*/}
                        {/*}*/}


                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            query={queryTags}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.tags.length > 0) {
                                        return (<ul className="list-unstyled">
                                            <li><strong><Link to="/tags">All</Link></strong></li>
                                            {data.tags.map(tag => {
                                                const tagLink = `/tags/${tag.id}`
                                                return (<li><strong><Link to={tagLink}>{tag.name}</Link></strong></li>)
                                            })}
                                        </ul>)
                                    }
                                    else {
                                        return <p>No tags found</p>
                                    }
                                }
                                else if (loading) {
                                    return <p>Loading…</p>
                                }
                                return <p>Loading failed.</p>
                            }
                            }
                        </Query>
                    </div>
                    <div className="col-10 col-md-10 col-xl-10 bd-content">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            query={podcasts}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.podcasts) {
                                        return data.podcasts.map(podcast =>
                                            (
                                                <div key={shortid.generate()}>
                                                    <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                       graphql={graphql}/>}</Consumer>
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
                        </Query>
                    </div>
                </div>
            </div>)


    }

}

export default Tags

