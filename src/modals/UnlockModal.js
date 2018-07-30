import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

class UnlockModal extends React.Component {
    render() {
        const {show, onClose} = this.props

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Unlock podcast to listen</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <p>We are about to finish this system</p>
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

UnlockModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    podcast: PropTypes.object.isRequired,
}
export default UnlockModal