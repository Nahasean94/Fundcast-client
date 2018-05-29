import React from 'react'
import PropTypes from 'prop-types'
import validator from '../../../node_modules/validator/index.js'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'
import {connect} from 'react-redux'
import {login} from '../../actions/loginActions'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.checkUserExists = this.checkUserExists.bind(this)
    }


    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'This field must be an email'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            console.log(this.state)
            this.props.login(this.state).then(
                (res) => {
                    // this.props.addFlashMessage({type: 'success', text: 'You have signed up successfully'})
                    this.context.router.history.push('/')
                },
                err => this.setState({errors: err.response.data.errors, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, password, email, isLoading} = this.state
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                <TextFieldGroup
                    label="Email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    // checkUserExists={this.checkUserExists}
                />
                <TextFieldGroup
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-sm"
                            type="submit">Login
                    </button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm)