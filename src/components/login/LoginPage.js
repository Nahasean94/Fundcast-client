import React from 'react'
import LoginForm from './LoginForm'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {userLoginRequest, isUserExists} from '../../actions/signupActions'
// import {addFlashMessage} from '../../actions/flashMessages'

class LoginPage extends React.Component {

    render() {
        const {userLoginRequest, addFlashMessage, isUserExists} = this.props
        return (

                <div >
                    <LoginForm />
                </div>

        )
    }
}

// LoginPage.propTypes = {
//     userLoginRequest: PropTypes.func.isRequired,
//     addFlashMessage: PropTypes.func.isRequired,
//     isUserExists: PropTypes.func.isRequired
//
// }

export default LoginPage