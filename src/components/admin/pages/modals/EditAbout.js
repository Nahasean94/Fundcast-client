import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {isEmpty} from "lodash"
import {fundcastFetchOptionsOverride} from "../../../../shared/fetchOverrideOptions"
import {getAbout, updateAbout} from "../../../../shared/queries"
import {Query} from "graphql-react"

class EditAbout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            about: this.props.about,
            errors: {},
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount() {
        this.props.graphql
            .query({
                fetchOptionsOverride: fundcastFetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    query: getAbout
                }
            })
            .request.then(({data}) => {
                if (data) {
                    console.log(data.getAbout.about,"lsdfsd")
                    this.setState({about: data.getAbout.about})
                }
            }
        )
    }

    validateInput(data) {
        let errors = {}
        if (data.about.length < 3) {
            errors.about = 'About must be more than 3 characters'
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
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            about: this.state.about
                        },
                        query: updateAbout,
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


    render() {
        const {show, onClose} = this.props
        const {errors} = this.state
        let {about}=this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>About Fundcast</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-2 control-label">About</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                <textarea name="about" onChange={this.onChange} className="form-control" rows="3"
                                          cols="20" value={about}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid"></label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <button className="form-control from-control-sm btn btn-primary btn-sm"
                                                type="submit">Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>)
        }
        else {
            return null
        }
    }
}

export default EditAbout