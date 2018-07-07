import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {createNewPodcast, unPublishPodcast} from "../../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"

class UnpublishPodcastModal extends React.Component {
    constructor(props) {
        super(props)
        this.unpublish = this.unpublish.bind(this)
    }

    unpublish(e) {
        e.preventDefault()
        this.props.graphql
            .query({
                fetchOptionsOverride: fundcastFetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {
                       id:this.props.id
                    },
                    query: unPublishPodcast
                }
            })
            .request.then(({data}) => {
                if (data) {
                    this.props.onClose()
                }
            }
        )

    }

    render() {
        const {show, onClose,} = this.props

        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Are you sure you want to unpublish this podcast?</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger btn-sm" onClick={this.unpublish}>Unpublish</button>
                    &nbsp;
                    <button className="btn btn-dark btn-sm" onClick={onClose}>Cancel</button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>)
        }
        else return null
    }

}

UnpublishPodcastModal.propTypes = {
    id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default UnpublishPodcastModal
