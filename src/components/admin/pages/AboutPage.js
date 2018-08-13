import React from 'react'
import Menu from "../Menu"
import PropTypes from "prop-types"
import EditAbout from "./modals/EditAbout"
import {Consumer, Query} from "graphql-react"
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {fetchUserProfile, getAbout} from "../../../shared/queries"

class AboutPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateAboutModal: false,
            about: '',
            loading: false,
            error: false
        }
        this.showUpdateAboutModal = this.showUpdateAboutModal.bind(this)
        this.closeUpdateAboutModal = this.closeUpdateAboutModal.bind(this)
    }

    showUpdateAboutModal() {
        this.setState({showUpdateAboutModal: true})
    }

    closeUpdateAboutModal() {
        this.setState({showUpdateAboutModal: false})
    }

    // componentDidMount() {
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fundcastFetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 query: getAbout
    //             }
    //         })
    //         .request.then(({data, loading, error}) => {
    //
    //             if (data && data.getAbout) {
    //                 console.log(data.getAbout.about)
    //                 this.setState({about: data.getAbout.about})
    //             }
    //             else if (loading) {
    //                 this.setState({loading: true})
    //             }
    //             else if (error) {
    //                 this.setState({error: true})
    //             }
    //
    //         }
    //     )
    // }

    render() {
        const { about} = this.state
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-sm- col-md-2 bd-sidebar">
                    <Menu router={this.context.router} active="dashboard"/>
                </div>
                <div className="col-sm-10 col-md-10 col-xl-10 bd-content">
                    <button className="btn btn-primary btn-sm" onClick={this.showUpdateAboutModal}>Update about</button>
                    <hr/>
                    <Query
                        loadOnMount
                        loadOnReset
                        fetchOptionsOverride={fundcastFetchOptionsOverride}
                        query={getAbout}
                    >
                        {({loading, data}) => {
                            if (data) {
                                if (data.getAbout) {
                                    const {about} = data.getAbout
                                    return <div>
                                        <h3>About fundcast</h3>
                                        <br/>
                                        <p>{about}</p>
                                        <Consumer>{graphql => <EditAbout about={about} graphql={graphql} show={this.state.showUpdateAboutModal}
                                                                         onClose={this.closeUpdateAboutModal}/>}</Consumer>
                                    </div>
                                } else {
                                    <p>Add information about Fundcast</p>
                                }

                            } else if (loading) {
                                return (
                                    <p>Loading…</p>
                                )
                            }
                            return (
                                <p>Add information about Fundcast
                                    <Consumer>{graphql => <EditAbout about={about} graphql={graphql} show={this.state.showUpdateAboutModal}
                                                                     onClose={this.closeUpdateAboutModal}/>}</Consumer></p>
                            )
                        }
                        }
                    </Query>
                </div>

            </div>

        </div>)
    }
}

AboutPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default () => <Consumer>{graphql => <AboutPage graphql={graphql}/>}</Consumer>