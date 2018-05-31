import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'
import {twinpalFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {signup,isUserExists} from "../../shared/queries"


class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            birthday: '',
            errors: {},
            isLoading: false,
            invalid: false,
            loading:false,
            message:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkUserExists = this.checkUserExists.bind(this)
    }

    checkUserExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            this.props.graphql
                .query({
                    fetchOptionsOverride: twinpalFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {email: val},
                        query:isUserExists
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        let errors = this.state.errors
                        let invalid
                        if (data.isUserExists.exists) {
                            invalid = true
                            errors[field] = 'There is user with such ' + field
                        } else {
                            invalid = false
                            errors[field] = ''
                        }
                        this.setState({errors, invalid})
                    }
                }
            )
        }
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'This field must be an email'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
        }
        if (validator.isEmpty(data.passwordConfirmation)) {
            errors.passwordConfirmation = 'This field is required'
        }
        if (!validator.equals(data.password, data.passwordConfirmation)) {
            errors.passwordConfirmation = 'Passwords must match'
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
            this.props.graphql
                .query({
                    fetchOptionsOverride: twinpalFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            email: this.state.email,
                            password: this.state.password,
                            birthday: this.state.birthday
                        },
                        query: signup
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                            birthday: '',
                            errors: {},
                            isLoading: false,
                            invalid: false,
                            loading: false,
                            message: data
                                ? `You can now use your email and password to log in.`
                                : `Signup failed.`
                        })
                        // this.context.router.history.push('/')
                    }
                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors,loading,message} = this.state
        if (loading) {
            return <p>Creating account…</p>
        }
        if (message) {
            return <p>{message}</p>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Create a free account</h3>
                <TextFieldGroup
                    label="First name"
                    type="first_name"
                    name="first_name"
                    value={this.state.first_name} autoFocus={true}
                    onChange={this.onChange}
                    error={errors.first_name}
                />
                <TextFieldGroup
                    label="Last name"
                    type="last_name"
                    name="last_name"
                    value={this.state.last_name} autoFocus={true}
                    onChange={this.onChange}
                    error={errors.last_name}
                />
                <TextFieldGroup
                    label="Email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    checkUserExists={this.checkUserExists}
                />
                <TextFieldGroup
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                />
                <TextFieldGroup
                    label="Confirm Password "
                    type="password"
                    name="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    onChange={this.onChange}
                    error={errors.passwordConfirmation}
                />
                <TextFieldGroup
                    label="Date of birth"
                    type="date"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChange}
                    error={errors.birthday}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-sm"
                            type="submit">Sign up
                    </button>
                </div>
            </form>
        )
    }
}


SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm