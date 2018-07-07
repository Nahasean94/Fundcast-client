import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {deletePodcast} from "../../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../../shared/fetchOverrideOptions"

class ConfirmDeletePodcast extends React.Component {
    constructor(props) {
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(e) {
        e.preventDefault()
        this.props.graphql
            .query({
                fetchOptionsOverride: fundcastFetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {
                        id: this.props.id
                    },
                    query: deletePodcast
                }
            })
            .request.then(({data}) => {
            if(data) {
                this.context.router.history.push('/profile')
            }
        }
    )

    }

    render() {
        const {show, onClose,} = this.props
        if (show) {
            return (<Modal isOpen={show} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Confirm deletion</ModalHeader>
                <ModalBody>
                    <h4>Are you sure you want to delete this podcast? All comments and statistics will be delete also.
                        This operation cannot be undone</h4>
                    <button className="btn btn-danger btn-sm" onClick={this.onDelete}>Delete</button>
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

ConfirmDeletePodcast.propTypes = {
    id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
ConfirmDeletePodcast.contextTypes = {
    router: PropTypes.object.isRequired
}
export default ConfirmDeletePodcast
