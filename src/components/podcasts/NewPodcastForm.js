import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isDate, isEmpty} from 'lodash'
import TextFieldGroup from '../../shared/TextFieldsGroup'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {createNewPodcast} from "../../shared/queries"


class NewPodCastForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            podcast: '',
            coverImage: '',
            hosts: [],
            paid: false,
            tags: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handlePodcastChange = this.handlePodcastChange.bind(this)
        this.handleCoverImageChange = this.handleCoverImageChange.bind(this)
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
        }
        if (data.title.length < 3 ) {
            errors.title = 'Description must be more than 3'
        }
        if (validator.isEmpty(data.description)) {
            errors.description = 'This field is required'
        }

        if (validator.isEmpty(data.paid)) {
            errors.paid = 'This field is required'
        }
        if (validator.isEmpty(data.tags)) {
            errors.tags = 'This field is required'
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

    handlePodcastChange({
                     target: {
                         validity,
                         files: [file]
                     }
                 }) {
        if (validity.valid) {
            this.setState({podcast:file})
        }
    }
    handleCoverImageChange({
                     target: {
                         validity,
                         files: [file]
                     }
                 }) {
        if (validity.valid) {
            this.setState({coverImage:file})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {

            this.setState({errors: {}, isLoading: false})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            title: this.state.title,
                            description: this.state.description,
                            hosts: this.state.hosts,
                            paid: this.state.paid,
                            tags: this.state.tags,
                            coverImage: this.state.coverImage,
                            podcast: this.state.podcast,
                        },
                        query: createNewPodcast
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            title: '',
                            description: '',
                            podcast: '',
                            coverImage: '',
                            hosts: [],
                            paid: false,
                            tags: '',
                            errors: {},
                            isLoading: false,
                            invalid: false,
                            message: data
                                ? `Successfully added a new podcast.`
                                : `Posting failed failed.`
                        })
                        // this.context.router.history.push('/')
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

        const {errors, isLoading, invalid, description, title, tags,} = this.state


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
                                <textarea name="description" onChange={this.onChange} className="form-control" rows="3"
                                          cols="20"/>
                            </div>
                            <fieldset className="form-group ">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input form-check-inline" type="radio"
                                           value={0} name="paid" onChange={this.onChange}
                                           id="free"/>
                                    <label className="form-check-label" htmlFor="free">Free</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input form-check-inline" type="radio"
                                           value={1} name="paid" onChange={this.onChange}
                                           id="paid"/>
                                    <label className="form-check-label" htmlFor="paid">Paid</label>
                                </div>

                            </fieldset>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="hosts">Hosts</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-sm" id="hosts" name="hosts"
                                            required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="5b311c84a9845c2a8cecd4eb">You</option>
                                        <option value="5b30f667575dbd2170c7ca7a">Me</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="tags">Tags</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-sm" id="tags" name="tags"
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
                                        <input type="file" className="custom-file-input form-control-sm" id="customFile"
                                               name="podcast" accept="audio/*" onChange={this.handlePodcastChange}/>
                                        <label className="custom-file-label" htmlFor="customFile">Choose audio
                                            file</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid">Cover image</label>
                                <div className="col-sm-10">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input form-control-sm" id="customFile"
                                               name="coverImage" accept="image/*" onChange={this.handleCoverImageChange}/>
                                        <label className="custom-file-label" htmlFor="customFile">Choose cover image for
                                            the podcast</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid"></label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <button disabled={isLoading || invalid}
                                                className="form-control from-control-sm btn btn-primary btn-sm"
                                                type="submit">Save
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


NewPodCastForm.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
NewPodCastForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NewPodCastForm


