import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {saveUpdatedPost, updatePost} from "../actions/postsActions"

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
            const data = new FormData()
            data.append('body', editedPost)
            data.append('id', this.props.postId)
            this.props.saveUpdatedPost(data).then(
                post => {
                    this.setState({editedPost: ''})
                    this.props.updatePost(post.data)
                    this.props.onClose()
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
    updatePost:PropTypes.func.isRequired,
    saveUpdatedPost:PropTypes.func.isRequired,
    postId:PropTypes.string.isRequired
}

export default connect(null,{updatePost,saveUpdatedPost})(EditPostModal)