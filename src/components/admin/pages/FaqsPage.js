import React from 'react'
import Menu from "../Menu"
import PropTypes from "prop-types"
import {Consumer, Query} from "graphql-react"
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {getFaqs} from "../../../shared/queries"
import NewFaq from "./modals/NewFaq"

class FaqsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateFaqsModal: false,
            about: '',
            loading: false,
            error: false
        }
        this.showUpdateFaqsModal = this.showUpdateFaqsModal.bind(this)
        this.closeUpdateFaqsModal = this.closeUpdateFaqsModal.bind(this)
    }

    showUpdateFaqsModal() {
        this.setState({showUpdateFaqsModal: true})
    }

    closeUpdateFaqsModal() {
        this.setState({showUpdateFaqsModal: false})
    }

    // componentDidMount() {
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fundcastFetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 query: getFaqs
    //             }
    //         })
    //         .request.then(({data, loading, error}) => {
    //
    //             if (data && data.getFaqs) {
    //                 console.log(data.getFaqs.about)
    //                 this.setState({about: data.getFaqs.about})
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
        const {about} = this.state
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-sm- col-md-2 bd-sidebar">
                    <Menu router={this.context.router} active="dashboard"/>
                </div>
                <div className="col-sm-10 col-md-10 col-xl-10 bd-content">
                    <button className="btn btn-primary btn-sm" onClick={this.showUpdateFaqsModal}>Add FAQ</button>
                    <hr/>
                    <Query
                        loadOnMount
                        loadOnReset
                        fetchOptionsOverride={fundcastFetchOptionsOverride}
                        query={getFaqs}
                    >
                        {({loading, data}) => {
                            if (data) {
                                if (data.getFaqs) {

                                    return <ul className="list-unstyled">

                                        {data.getFaqs.map(faq => {
                                            return <li>
                                                <h5>{faq.question}</h5>
                                                <p>{faq.answer}</p>
                                            </li>
                                        })}
                                    </ul>
                                }
                            } else if (loading) {
                                return (
                                    <p>Loading…</p>
                                )
                            }
                            return (
                                <p>No FAQs Found</p>
                            )

                        }}
                    </Query>
                </div>
                <Consumer>{graphql => <NewFaq graphql={graphql} show={this.state.showUpdateFaqsModal}
                                              onClose={this.closeUpdateFaqsModal}/>}</Consumer>

            </div>

        </div>)
    }
}

FaqsPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default () => <Consumer>{graphql => <FaqsPage graphql={graphql}/>}</Consumer>