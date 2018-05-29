import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class UploadProfilePictureModal extends React.Component {
    render() {
        const {show, onClose, picture,onSave} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Upload a new profile picture</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <img src={picture} alt="photo" width="600" height="500"/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Close</Button>{' '}
                        <Button color="primary" onClick={onSave}>Upload</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return null
        }
    }
}

UploadProfilePictureModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    picture: PropTypes.string.isRequired,
    onSave:PropTypes.func.isRequired,
}
export default UploadProfilePictureModal