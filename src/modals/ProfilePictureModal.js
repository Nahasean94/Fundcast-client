import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ProfilePictureModal extends React.Component {
    render() {
        const {show, onClose, picture,username} = this.props
        if (show) {
            return (
            <Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>{username}</ModalHeader>
                <ModalBody>
                    <div className="modal-body">
                        <img src={`/uploads/${picture}`} alt="Let me see" width="600" height="500"/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
            )
        }
        else {
            return null
        }
    }
}

ProfilePictureModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    picture: PropTypes.string.isRequired
}
export default ProfilePictureModal