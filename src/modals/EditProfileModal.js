import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import TextFieldGroup from "../shared/TextFieldsGroup"
import validator from "validator"
import {isEmpty} from "lodash"
import {updateProfile} from "../shared/queries"

import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"


class EditProfileModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.profile,
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            username: this.state.username,
                            email: this.state.email,
                            birthday: this.state.birthday,
                        },
                        query: updateProfile
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.props.onClose()
                        this.setState({isLoading: false})
                        //TODO add a way to change the username in navigation bar
                        window.location.reload()
                    }

                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show} = this.props
        const {onClose} = this.props
        const {errors, isLoading, invalid, first_name, last_name, birthday, email, username,} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Edit profile</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <h3>Basic information</h3>
                                <TextFieldGroup
                                    label="First name"
                                    type="first_name"
                                    name="first_name"
                                    value={first_name} autoFocus={true}
                                    onChange={this.onChange}
                                    error={errors.first_name}
                                />
                                <TextFieldGroup
                                    label="Last name"
                                    type="last_name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={this.onChange}
                                    error={errors.last_name}
                                />
                                <TextFieldGroup
                                    label="Username"
                                    type="username"
                                    name="username"
                                    value={username}
                                    onChange={this.onChange}
                                    error={errors.username}
                                />
                                <TextFieldGroup
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    label="Date of birth"
                                    type="date"
                                    name="birthday"
                                    value={birthday}
                                    onChange={this.onChange}
                                    error={errors.birthday}
                                />
                                <div className="form-group">
                                    <button disabled={isLoading || invalid} className="btn btn-primary btn-sm"
                                            type="submit">Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={onClose}>Cancel</Button>{' '}

                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return null
        }
    }
}

EditProfileModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    // editProfile: PropTypes.func.isRequired
}
EditProfileModal.contextTypes = {
    router: PropTypes.object.isRequired
}
export default EditProfileModal