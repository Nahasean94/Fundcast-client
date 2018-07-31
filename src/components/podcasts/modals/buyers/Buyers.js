import React from 'react'
import PropTypes from 'prop-types'
import BuyersView from "./BuyersView"
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from "reactstrap"

class Buyers extends React.Component {

    render() {
        const {show, onClose} = this.props

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>List of buyers</ModalHeader>
                    <ModalBody>
                        {this.props.buyers.length>0? <table className="table ">
                            <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.buyers.map(buyer => {
                                return <BuyersView buyer={buyer}/>

                            })}
                            </tbody>
                        </table>:<p>No buyers list found</p>}
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

Buyers.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Buyers
