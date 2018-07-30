import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {uploadProfilePicture} from "../shared/queries"

let upload

class UploadProfilePictureModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            picture: '',
            selectedFile: '',
            hideInput: false
        }
        this.onSelectImage = this.onSelectImage.bind(this)
        this.onUpload = this.onUpload.bind(this)
    }

    onSelectImage(event) {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            this.setState({hideInput: true})
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = (e) => {
                this.setState({picture: e.target.result, selectedFile: file})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    onUpload(e) {
        e.preventDefault()
        const {selectedFile} = this.state
        if (selectedFile !== '') {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {file: selectedFile},
                        query: uploadProfilePicture
                    }
                })
                .request.then(({data}) => {
                    if (data.uploadProfilePicture) {
                        window.location.reload()
                    }
                    {
                        //TODO to show sth went wrong
                    }

                }
            )
        }

    }

    render() {
        const {hideInput, picture} = this.state
        const {show, onClose} = this.props
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Upload a new profile picture</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="file" id="profilePictureInput" className="form-control" name="upload"
                                       hidden={hideInput}
                                       onChange={this.onSelectImage}
                                       accept=".jpg,.gif,.png,.jpeg" ref={node => {
                                    upload = node
                                }}/>
                            </div>
                            {picture ? <img src={picture} alt="photo" width="600" height="500"/> : ''}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Close</Button>{' '}
                        <Button color="primary" onClick={this.onUpload}>Upload</Button>{' '}
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
}
export default UploadProfilePictureModal