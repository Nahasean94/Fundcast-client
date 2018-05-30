import React from 'react'
import PropTypes from 'prop-types'
import validator from '../../../node_modules/validator/index.js'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'

import {twinpalFetchOptionsOverride} from "../../shared/fetchOverrideOptions"

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false,
            loading: false,
            message: ''

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
            this.setState({loading: true})
            this.props.graphql
                .query({
                    fetchOptionsOverride: twinpalFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {email: this.state.email, password: this.state.password},
                        query: `
       mutation($email: String!,$password:String!) {
              login(email:$email,password:$password){
                        ok
                        token
                        error
              }
            }
      `
                    }
                })
                .request.then(({data}) => {
                    if (data.login.token === null && !data.login.ok) {
                        this.setState({errors: {form: data.login.error}, isLoading: false})
                    }
                    else {
                        localStorage.setItem('Twinpal', data.login.token)
                        this.context.router.history.push('/')
                        this.setState({
                            loading: false,
                            message: data
                                ? `Logged in.`
                                : `Logging failed.`
                        })
                    }

                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, password, email, invalid, isLoading,} = this.state
        // if (loading) {
        //     return <p>Loading…</p>
        // }
        // if (message) {
        //     return <p>{message}</p>
        // }
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                <TextFieldGroup
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                    // checkUserExists={this.checkUserExists}
                />
                <TextFieldGroup
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                />
                <div className="form-group">
                    <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                            type="submit">Login
                    </button>
                </div>
            </form>
        )
    }
}


LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default LoginForm