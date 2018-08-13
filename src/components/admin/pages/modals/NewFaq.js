import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {isEmpty} from "lodash"
import {fundcastFetchOptionsOverride} from "../../../../shared/fetchOverrideOptions"
import {getAbout, newFaq} from "../../../../shared/queries"
import {Query} from "graphql-react"
import TextFieldGroup from "../../../../shared/TextFieldsGroup"
import validator from 'validator'

class NewFaq extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: this.props.answer,
            errors: {},
            message: '',
            question:''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateInput(data) {
        let errors = {}
        if (data.answer.length < 3) {
            errors.answer = 'About must be more than 3 characters'
        }
        if (validator.isEmpty(data.question)) {
            errors.question = 'This field cannot be empty'
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
                            question: this.state.question,
                            answer: this.state.answer
                        },
                        query: newFaq,
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
        let {answer,question}=this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Add new FAQ</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Question"
                                type="text"
                                name="question"
                                value={question}
                                onChange={this.onChange}
                                error={errors.question}

                            />
                            <div className="form-group row">
                                <label className="col-sm-2 control-label">Answer</label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                <textarea name="answer" onChange={this.onChange} className="form-control" rows="3"
                                          cols="20" value={answer}/>
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

export default NewFaq