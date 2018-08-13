import React from 'react'
import Menu from "../Menu"
import PropTypes from "prop-types"
import {Consumer, Query} from "graphql-react"
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {getFaqs} from "../../../shared/queries"
import NewFaq from "./modals/NewFaq"
import jwt from 'jsonwebtoken'
import classnames from 'classnames'

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


    render() {
        const {about} = this.state
        let isAdmin = false
        if (localStorage.getItem("Fundcast")) {
            let token = jwt.decode(localStorage.getItem("Fundcast"))
            if (token.role === 'admin') {
                isAdmin = true
            }
        }
        return (<div className={classnames("container",{isAdmin:"container-fluid"})}>
            <div className="row">
                {isAdmin &&  <div className="col-sm- col-md-2 bd-sidebar">
                    <Menu router={this.context.router} active="dashboard"/>
                </div>}
                <div className="col-sm-10 col-md-10 col-xl-10 bd-content">
                    {isAdmin && <button className="btn btn-primary btn-sm" onClick={this.showUpdateFaqsModal}>Add FAQ</button>}
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
                {isAdmin && <Consumer>{graphql => <NewFaq graphql={graphql} show={this.state.showUpdateFaqsModal}
                                                          onClose={this.closeUpdateFaqsModal}/>}</Consumer>}

            </div>

        </div>)
    }
}

FaqsPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default () => <Consumer>{graphql => <FaqsPage graphql={graphql}/>}</Consumer>