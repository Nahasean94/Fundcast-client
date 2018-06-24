import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty, isDate} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import {connect} from 'react-redux'

import jwt from "jsonwebtoken"


class NewStudentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            podcast: '',
            coverImage: '',
            hosts: [],
            paid: false,
            genre: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.checkStudentExists = this.checkStudentExists.bind(this)
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
        }
        if (data.title.length<3||data.title.length>15) {
            errors.title = 'Description must be between 3 and 15 characters'
        }
        if (validator.isEmpty(data.description)) {
            errors.description = 'This field is required'
        }

        if (validator.isEmpty(data.paid)) {
            errors.paid = 'This field is required'
        }
        if (validator.isEmpty(data.genre)) {
            errors.genre = 'This field is required'
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
            this.props.registerStudent(this.state).then(
                (student) => {
                    // this.props.addFlashMessage({
                    //     type: 'success',
                    //     text: 'You have signed up successfully. Please use the login in form below to access your account'
                    // })
                    this.props.onClose()
                    this.props.addStudent(student.data)
                    this.setState({
                        title: '',
                        description: '',
                        podcast: '',
                        coverImage: '',
                        hosts: [],
                        paid: false,
                        genre: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    componentDidMount() {
        if (window.location.pathname === '/school_admin/students') {
            const token = jwt.decode(localStorage.schoolAdminJwtToken)
            this.setState({school_upi: token.school_upi})
            this.props.getSchoolCategory({upi: token.school_upi}).then(category => {
                if (category) {
                    this.setState({category: category.data.category})
                    console.log(category.data.category)
                }
            })


        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, description, title, last_name, genre, school_upi, category} = this.state


        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Add a new podcast</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.onChange}
                                error={errors.title}
                            />
                            <div className="form-group">
                                <label className="control-label">Description</label>
                                <textarea name="description" onChange={this.onChange} className="form-control" rows="3" cols="20"/>
                            </div>
                            <fieldset className="form-group ">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input form-check-inline" type="radio"
                                           value="student" name="searchType" onChange={this.onChange} id="searchStudent" />
                                    <label className="form-check-label" htmlFor="searchStudent">Free</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input form-check-inline" type="radio"
                                           value="institution" name="searchType" onChange={this.onChange}
                                           id="searchInstitution"/>
                                    <label className="form-check-label" htmlFor="searchInstitution">Paid</label>
                                </div>

                            </fieldset>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid">Hosts</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-sm" id="paid" name="paid"
                                            required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="you">You</option>
                                        <option value="me">Me</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid">Genre</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-sm" id="paid" name="paid"
                                            required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="religion">Religion</option>
                                        <option value="catering">Catering</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid">Podcast audio file</label>
                                <div className="col-sm-10">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input form-control-sm" id="customFile" accept="audio/*"/>
                                            <label className="custom-file-label" htmlFor="customFile">Choose
                                                audio file</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid">Cover image</label>
                                <div className="col-sm-10">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input form-control-sm" id="customFile" accept="image/*"/>
                                            <label className="custom-file-label" htmlFor="customFile">Choose
                                                cover image for the podcast</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid"></label>
                                <div className="col-sm-10">
                            <div className="form-group">
                                <button disabled={isLoading || invalid} className="form-control from-control-sm btn btn-primary btn-sm" type="submit">Save
                                </button>
                            </div>
                                </div>
                            </div>
                        </form>
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


NewStudentForm.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
NewStudentForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NewStudentForm
// export default connect(null, {addStudent, registerStudent, addFlashMessage, getSchoolCategory})(NewStudentForm)

