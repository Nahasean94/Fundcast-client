import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                // this.props.addFlashMessage({
                //     type: 'error',
                //     text: 'You do not have permission to access this page. Please login first'
                // })
                this.context.router.history.push('/admin/signin')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.history.push('/admin')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }

    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.adminLoginReducers.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate)
}