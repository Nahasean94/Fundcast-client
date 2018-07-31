import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {isUserExists, signup} from "../../shared/queries"
import classnames from 'classnames'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            role: '',
            errors: {},
            isLoading: false,
            invalid: false,
            loading: false,
            message: ''
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
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {email: val},
                        query: isUserExists
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

        if (validator.isEmpty(data.username)) {
            errors.username = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'This field must be an email'
        }
        if (validator.isEmpty(data.role)) {
            errors.role = 'This field is required'
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
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            username: this.state.username,
                            email: this.state.email,
                            password: this.state.password,
                            role: this.state.role
                        },
                        query: signup
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            username: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                            role: '',
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
        const {errors, loading, message} = this.state
        if (loading) {
            return <p>Creating account…</p>
        }
        if (message) {
            return <p>{message}</p>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Create account</h3>

                <TextFieldGroup
                    label="Username"
                    type="username"
                    name="username"
                    value={this.state.username} autoFocus={true}
                    onChange={this.onChange}
                    error={errors.username}
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
                <div className="form-group row">
                    <div className="col-sm-2">
                        <label className="col-form-label" htmlFor="role">Account type</label>
                    </div>
                    <div className="col-sm-10">
                        <select
                            className={classnames("form-control form-control-sm", {"is-invalid": errors.role})}
                            name="role" required="true" onChange={this.onChange}
                            value={this.state.role}>
                            <option>Select</option>
                            <option value="listener">Listener</option>
                            <option value="host">Host</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <button disabled={this.state.isLoading || this.state.invalid}
                                className="form-control form-control-sm btn btn-primary btn-sm"
                                type="submit">Signup
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}


SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm