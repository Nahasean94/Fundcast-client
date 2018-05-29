import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class PostModal extends React.Component {
    render() {
        const {show, onClose, post, username, uploads} = this.props
        const upload = uploads.length>0 ? <img src={`/uploads/${uploads[0].path}`} width="400" height="350" alt="Uploads"/> : ''
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>{username}</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <p>{post ? post : upload}</p>
                        </div>
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

PostModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.string,
    uploads: PropTypes.array
}
export default PostModal