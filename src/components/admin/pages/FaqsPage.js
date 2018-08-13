import React from 'react'
import Menu from "../Menu"
import PropTypes from "prop-types"

class FaqsPage extends React.Component {
    render() {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-sm- col-md-2 bd-sidebar">
                    <Menu router={this.context.router} active="dashboard"/>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-6 offset-sm-2 bd-content">
                   Faqs Page
                </div>
            </div>

        </div>)
    }
}

FaqsPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default FaqsPage