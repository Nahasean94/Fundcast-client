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
                this.context.router.history.push('/signin')
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/')
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
        // addFlashMessage: PropTypes.func.isRequired
    }
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.loginReducers.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate)
}