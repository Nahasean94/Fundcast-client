import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { updatePost as showUpdatedPost} from "../actions/postsActions"
import { updatePost} from '../shared/queries'
import {twinpalFetchOptionsOverride} from "../shared/fetchOverrideOptions"

class EditPostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editedPost: ''
        }
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSave() {
        const { editedPost} = this.state
        if (editedPost !== '') {
            this.props.graphql
                .query({
                    fetchOptionsOverride: twinpalFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {id: this.props.postId,body:editedPost},
                        query: updatePost
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.props.showUpdatedPost(data.updatePost)
                    }

                }
            )
        }
        this.props.onClose()
    }

    onChange(e) {
        this.setState({editedPost: e.target.value})
    }

    render() {
        const {show, onClose} = this.props
        let content=this.props.post
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Edit post</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                <textarea name="updatePost" onChange={this.onChange} className="form-control" rows="10" cols="20"
                         defaultValue={content}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onSave}>Save</Button>{' '}
                    </ModalFooter>
                </Modal>

            )
        }
        else return null
    }
}

EditPostModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.string.isRequired,
    showUpdatedPost:PropTypes.func.isRequired,
    postId:PropTypes.string.isRequired
}

export default connect(null,{showUpdatedPost})(EditPostModal)