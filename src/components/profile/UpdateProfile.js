import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isDate, isEmpty} from 'lodash'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Query} from "graphql-react"
import classnames from "classnames"
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {updateProfileBasicInfo,uploadProfilePicture} from "../../shared/queries"


class UpdateProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            email: this.props.email,
            role: this.props.role,
            password: this.props.password,
            ethereum_address: this.props.ethereum_address,
            file:'',
            errors: {},
            isLoading: false,
            invalid: false,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmitBasicInfo = this.onSubmitBasicInfo.bind(this)
        this.onSubmitPassword = this.onSubmitPassword.bind(this)
        this.onSubmitProfilePicture = this.onSubmitProfilePicture.bind(this)
        this.handleProfilePicture = this.handleProfilePicture.bind(this)
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

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    validatePassword(data) {
        let errors = {}
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

    isPasswordValid() {
        const {errors, isValid} = this.validatePassword(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmitBasicInfo(e) {
        e.preventDefault()
        if (this.isValid()) {

            this.setState({errors: {}, isLoading: false})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            id: this.props.id,
                            username: this.state.username,
                            email: this.state.email,
                            role: this.state.role,
                            ethereum_address: this.state.ethereum_address
                        },
                        query: updateProfileBasicInfo
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.props.onClose()
                    }
                }
            )
        }
    }

    handleProfilePicture({
                             target: {
                                 validity,
                                 files: [file]
                             }
                         }) {
        if (validity.valid) {
            this.setState({file})
        }
    }

    onSubmitPassword(e) {
        e.preventDefault()
        if (this.state.coverImage) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            id: this.props.id,
                            coverImage: this.state.coverImage,
                        },
                        query: ''
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            coverImage: ''
                        })
                        this.props.onClose()
                    }
                }
            )
        }
    }

    onSubmitProfilePicture(e) {
        e.preventDefault()
        if (this.state.file) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            file: this.state.file
                        },
                        query: uploadProfilePicture
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.props.onClose()
                    }
                }
            )
        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, description, title, paid, tags,} = this.state
        let {hosts} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Edit podcast</ModalHeader>
                    <ModalBody>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-basic-info-tab" data-toggle="tab"
                                   href="#nav-basic-info" role="tab" aria-controls="nav-basic-info"
                                   aria-selected="true">Basic info</a>
                                <a className="nav-item nav-link" id="nav-cover-image-tab" data-toggle="tab"
                                   href="#nav-cover-image" role="tab" aria-controls="nav-cover-image"
                                   aria-selected="false">Password</a>
                                <a className="nav-item nav-link" id="nav-podcast-tab" data-toggle="tab"
                                   href="#nav-podcast" role="tab" aria-controls="nav-podcast"
                                   aria-selected="false">Profile Picture</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-basic-info" role="tabpanel"
                                 aria-labelledby="nav-basic-info-tab">
                                <br/>
                                <br/>
                                <form onSubmit={this.onSubmitBasicInfo}>
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
                                    />
                                    <TextFieldGroup
                                        label="Etheruem"
                                        type="text"
                                        name="ethereum_address"
                                        value={this.state.ethereum_address}
                                        onChange={this.onChange}
                                        error={errors.ethereum_address}
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
                                                    type="submit">Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="nav-cover-image" role="tabpanel"
                                 aria-labelledby="nav-cover-image-tab">
                                <br/>
                                <h5>Update password</h5>
                                <br/>

                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        label="Old Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        label="New Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        label="Confirm New Password "
                                        type="password"
                                        name="passwordConfirmation"
                                        value={this.state.passwordConfirmation}
                                        onChange={this.onChange}
                                        error={errors.passwordConfirmation}
                                    />


                                    <div className="form-group">
                                        <button disabled={this.state.isLoading || this.state.invalid}
                                                className="btn btn-primary btn-sm"
                                                type="submit">Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="nav-podcast" role="tabpanel"
                                 aria-labelledby="nav-podcast-tab">
                                <br/>
                                <br/>
                                <form onSubmit={this.onSubmitProfilePicture}>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="customFile">Select picture</label>
                                        <div className="col-sm-10">
                                            <input type="file" className="form-control-sm" id="customFile"
                                                   name="file" accept="image/*" onChange={this.handleProfilePicture}/>

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="paid"></label>
                                        <div className="col-sm-10">
                                            <div className="form-group">
                                                <button disabled={isLoading || invalid}
                                                        className="form-control from-control-sm btn btn-primary btn-sm"
                                                        type="submit">Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }
}


UpdateProfile.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.array.isRequired,
    profilePicture: PropTypes.object.isRequired,
    ethereum_address: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default UpdateProfile


