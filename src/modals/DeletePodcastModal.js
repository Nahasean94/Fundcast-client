import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class DeletePodcastModal extends React.Component {
    render() {
        const {show, onClose,onDeletePost} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Delete Post</ModalHeader>
                    <ModalBody>
                        <strong>Please Confirm that you want to delete this post. This operation cannot be undone</strong>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClose}>Cancel</Button>{' '}
                        <Button color="danger" onClick={onDeletePost}>Delete</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null

    }
}

DeletePodcastModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDeletePost:PropTypes.func.isRequired,
}
export default DeletePodcastModal