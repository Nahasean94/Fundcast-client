import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updatePodcast as showUpdatedPodcast} from "../actions/podcastsActions"
import {updatePodcast} from '../shared/queries'
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"

class EditPodcastModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editedPodcast: ''
        }
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSave() {
        const {editedPodcast} = this.state
        if (editedPodcast !== '') {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fundcastFetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {id: this.props.postId, body: editedPodcast},
                        query: updatePodcast
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.props.showUpdatedPodcast(data.updatePodcast)
                    }

                }
            )
        }
        this.props.onClose()
    }

    onChange(e) {
        this.setState({editedPodcast: e.target.value})
    }

    render() {
        const {show, onClose} = this.props
        let content = this.props.post
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Edit post</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                <textarea name="updatePodcast" onChange={this.onChange} className="form-control" rows="10" cols="20"
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

EditPodcastModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.string.isRequired,
    showUpdatedPodcast: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, {showUpdatedPodcast})(EditPodcastModal)