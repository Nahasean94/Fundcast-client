import React from 'react'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../../shared/TextFieldsGroup'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {
    addAudioFile,
    addBasicInfo,
    addCoverImageFile,
    hosts as queryHosts,
    tags as queryTags,
} from "../../../shared/queries"
import Select from 'react-select'
import {Query} from 'graphql-react'
import PropTypes from 'prop-types'

let hostOptions, tagOptions

class NewPodcastForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            podcast: '',
            coverImage: '',
            paid: 0,
            isPayable: false,
            amount: 0,
            message: '',
            errors: {},
            isLoading: false,
            invalid: false,
            ethereum_address:'',
            tags: [],
            hosts: [],

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmitBasicInfo = this.onSubmitBasicInfo.bind(this)
        this.onSubmitCoverImage = this.onSubmitCoverImage.bind(this)
        this.onSubmitAudioFile = this.onSubmitAudioFile.bind(this)
        this.handlePodcastChange = this.handlePodcastChange.bind(this)
        this.handleCoverImageChange = this.handleCoverImageChange.bind(this)
        this.handleTagsChange = this.handleTagsChange.bind(this)
        this.handleHostsChange = this.handleHostsChange.bind(this)
        this.handlePaymentChange = this.handlePaymentChange.bind(this)

    }

    handleTagsChange = (tags) => {
        this.setState({tags})
    }
    handleHostsChange = (hosts) => {
        this.setState({hosts})
    }
    handlePaymentChange = (paid) => {

        if (paid.target.value == 0) {
            this.setState({paid: paid.target.value, isPayable: false, amount: 0})

        } else {
            this.setState({paid: paid.target.value, isPayable: true})

        }
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
        }
        if (data.title.length < 3) {
            errors.title = 'Description must be more than 3 charaters'
        }
        if (validator.isEmpty(data.description)) {
            errors.description = 'This field is required'
        }
        if (data.tags.length < 1) {
            errors.tags = 'This field is required'
        }
        if(data.ethereum_address){
            if(data.ethereum_address.length<42||data.ethereum_address.length>42){
                errors.ethereum_address='Ethereum address must be 42 characters'
            }
        }
        if (data.hosts.length < 1) {
            errors.hosts = 'This field is required'
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

    onSubmitBasicInfo(e) {
        e.preventDefault()
        let {hosts, tags} = this.state
        hosts = hosts.map(host => {
            return host.value
        })
        tags = tags.map(tag => {
            return tag.value
        })
        if (this.isValid()) {
            console.log(this.state)
            this.setState({errors: {}, isLoading: false})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    // resetOnLoad: true,
                    operation: {
                        variables: {
                            title: this.state.title,
                            description: this.state.description,
                            hosts: hosts,
                            paid: this.state.paid,
                            amount: this.state.amount,
                            ethereum_address: this.state.ethereum_address,
                            tags: tags,
                        },
                        query: addBasicInfo
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        console.log(data)
                        if (data.addBasicInfo)
                            this.setState({id: data.addBasicInfo.id, message: 'Successfully added basic info.'})

                    }
                }
            )
        }
    }

    handlePodcastChange({
                            target: {
                                validity,
                                files: [file]
                            }
                        }) {
        if (validity.valid) {
            this.setState({podcast: file})
        }
    }

    handleCoverImageChange({
                               target: {
                                   validity,
                                   files: [file]
                               }
                           }) {
        if (validity.valid) {
            this.setState({coverImage: file})
        }
    }

    onSubmitCoverImage(e) {
        e.preventDefault()
        if (this.state.coverImage) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    // resetOnLoad: true,
                    operation: {
                        variables: {
                            id: this.state.id,
                            coverImage: this.state.coverImage,
                        },
                        query: addCoverImageFile
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            coverImage: '', message: 'Successfully added cover image.'
                        })
                    }
                }
            )
        }
    }

    onSubmitAudioFile(e) {
        e.preventDefault()
        if (this.state.podcast) {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            id: this.state.id,
                            podcast: this.state.podcast
                        },
                        query: addAudioFile,
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            coverImage: '', message: 'Successfully added audio file.'
                        })
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

        const {errors, isLoading, invalid, description, title, paid, tags, message, isPayable, amount,ethereum_address} = this.state
        let {hosts} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Create new podcast</ModalHeader>
                    <ModalBody>
                        {message && <div className="alert alert-success">{message}</div>}
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-basic-info-tab" data-toggle="tab"
                                   href="#nav-basic-info" role="tab" aria-controls="nav-basic-info"
                                   aria-selected="true">Basic info</a>
                                <a className="nav-item nav-link" id="nav-cover-image-tab" data-toggle="tab"
                                   href="#nav-cover-image" role="tab" aria-controls="nav-cover-image"
                                   aria-selected="false">Cover image</a>
                                <a className="nav-item nav-link" id="nav-podcast-tab" data-toggle="tab"
                                   href="#nav-podcast" role="tab" aria-controls="nav-podcast"
                                   aria-selected="false">Audio File</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-basic-info" role="tabpanel"
                                 aria-labelledby="nav-basic-info-tab">
                                <br/>
                                <br/>
                                <form onSubmit={this.onSubmitBasicInfo}>

                                    <TextFieldGroup
                                        label="Title"
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={this.onChange}
                                        error={errors.title}

                                    />
                                    <div className="form-group row">
                                        <label className="col-sm-2 control-label">Description</label>
                                        <div className="col-sm-10">
                                            <div className="form-group">
                                <textarea name="description" onChange={this.onChange} className="form-control" rows="3"
                                          cols="20" value={description}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Access</label>
                                        <div className="col-sm-10">
                                            <fieldset>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input form-check-inline" type="radio"
                                                           value={0} name="paid"
                                                           onChange={this.handlePaymentChange}
                                                           id="free"/>
                                                    <label className="form-check-label" htmlFor="free">Free</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input form-check-inline" type="radio"
                                                           value={1} name="paid"
                                                           onChange={this.handlePaymentChange}
                                                           id="paid"/>
                                                    <label className="form-check-label" htmlFor="paid">Paid</label>
                                                </div>

                                            </fieldset>
                                        </div>

                                    </div>
                                    {isPayable && <div>
                                    <TextFieldGroup
                                        label="Amount ($)"
                                        type="number"
                                        name="amount"
                                        value={amount}
                                        onChange={this.onChange}
                                        error={errors.amount}

                                    />
                                    <TextFieldGroup
                                        label="Ethereum Address"
                                        type="string"
                                        name="ethereum_address"
                                        value={ethereum_address}
                                        onChange={this.onChange}
                                        error={errors.ethereum_address}

                                    /></div>}
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="hosts">Tags</label>
                                        <div className="col-sm-10">
                                            <Query
                                                loadOnMount
                                                loadOnReset
                                                fetchOptionsOverride={fundcastFetchOptionsOverride}
                                                query={queryTags}
                                            >
                                                {({loading, data}) => {
                                                    if (data) {
                                                        tagOptions = data.tags.map(tag => {
                                                            return {
                                                                label: tag.name,
                                                                value: tag.name
                                                            }
                                                        })
                                                        return <Select.Creatable
                                                            closeOnSelect={true}
                                                            multi={true}
                                                            onChange={this.handleTagsChange}
                                                            options={tagOptions}
                                                            placeholder="Search tags"
                                                            removeSelected={true}
                                                            value={tags}/>
                                                    }
                                                    else if (loading) {
                                                        return <p>Loading…</p>
                                                    }
                                                    return <p>Loading failed.</p>
                                                }
                                                }
                                            </Query>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="tags">Hosts</label>
                                        <div className="col-sm-10">
                                            <Query
                                                loadOnMount
                                                loadOnReset
                                                fetchOptionsOverride={fundcastFetchOptionsOverride}
                                                query={queryHosts}
                                            >
                                                {({loading, data}) => {
                                                    if (data) {
                                                        hostOptions = data.hosts.map(host => {
                                                            return {
                                                                label: <div><img
                                                                    src={`http://localhost:8080/uploads/${host.profile_picture}`}
                                                                    width="30" height="20"
                                                                    className="rounded-circle"/>{host.username}
                                                                </div>,
                                                                value: host.id
                                                            }
                                                        })
                                                        return <Select
                                                            closeOnSelect={true}
                                                            multi={true}
                                                            onChange={this.handleHostsChange}
                                                            options={hostOptions}
                                                            placeholder="Search hosts..."
                                                            removeSelected={true}
                                                            value={hosts}/>
                                                    }
                                                    else if (loading) {
                                                        return <p>Loading…</p>
                                                    }
                                                    return <p>Loading failed.</p>
                                                }
                                                }
                                            </Query>
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
                            </div>
                            <div className="tab-pane fade" id="nav-cover-image" role="tabpanel"
                                 aria-labelledby="nav-cover-image-tab">
                                <br/>
                                <h5>Choose a new cover image</h5>
                                <br/>

                                <form onSubmit={this.onSubmitCoverImage}>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="paid">Cover image</label>
                                        <div className="col-sm-10">
                                            <div className="">
                                                <input type="file" className="form-control-sm" id="customFile"
                                                       name="coverImage" accept="image/*"
                                                       onChange={this.handleCoverImageChange}/>
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
                            </div>
                            <div className="tab-pane fade" id="nav-podcast" role="tabpanel"
                                 aria-labelledby="nav-podcast-tab">
                                <br/>
                                <h5>Choose a new cover audio file</h5>
                                <br/>
                                <form onSubmit={this.onSubmitAudioFile}>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label" htmlFor="paid">Podcast audio
                                            file</label>
                                        <div className="col-sm-10">
                                            <input type="file" className="form-control-sm" id="customFile"
                                                   name="podcast" accept="audio/*" onChange={this.handlePodcastChange}/>

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

NewPodcastForm.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // hosts: PropTypes.array.isRequired,
    // paid: PropTypes.bool.isRequired,
    // tags: PropTypes.array.isRequired,
    // coverImage: PropTypes.object.isRequired,
    // podcast: PropTypes.string.isRequired,
    // id: PropTypes.string.isRequired,
}
NewPodcastForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NewPodcastForm


