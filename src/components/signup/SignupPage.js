import React from 'react'
import SignupForm from './SignupForm'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {userSignupRequest, isUserExists} from '../../actions/signupActions'
import {addFlashMessage} from '../../actions/flashMessages'

class SignupPage extends React.Component {

    render() {
        const {userSignupRequest, addFlashMessage, isUserExists} = this.props
        return (

                <div>
                    <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}
                                isUserExists={isUserExists}/>
                </div>

        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists})(SignupPage)