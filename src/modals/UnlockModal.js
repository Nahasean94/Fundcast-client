import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Fundcast from '../blockchain/build/contracts/Fundcast.json'
import getWeb3 from '../utils/getWeb3'
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {unlockPodcast} from "../shared/queries"
import jwt from 'jsonwebtoken'

const contract = require('truffle-contract')

class UnlockModal extends React.Component {
    constructor(props) {
        super(props)
        this.unlockPodcast = this.unlockPodcast.bind(this)
    }


    unlockPodcast() {
        const cost = (this.props.podcast.payment.amount / 459.94) * 1000000000000000000
        const hosts = this.props.podcast.hosts
        const fundcast = contract(Fundcast)
        fundcast.setProvider(this.state.web3.currentProvider)
        console.log(this.props.podcast.payment.ethereum_address)
        // Declaring this for later so we can chain functions on SimpleStorage.
        let fundcastInstance

        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            fundcast.deployed().then(async (instance) => {
                fundcastInstance = instance
                return await fundcastInstance.unlockPodcast(this.props.podcast.payment.ethereum_address, {
                    from: coinbase,
                    value: cost
                })
            }).then(unlocked => {
                return this.state.web3.eth.getBalance(this.props.podcast.payment.ethereum_address).then(balance => {
                    console.log(balance / 1000000000000000000)
                    if (localStorage.getItem("Fundcast")) {
                        const token = jwt.decode(localStorage.getItem("Fundcast"))
                        this.props.graphql
                            .query({
                                fetchOptionsOverride: fundcastFetchOptionsOverride,
                                resetOnLoad: true,
                                operation: {
                                    variables: {
                                        podcast: this.props.podcast.id,
                                        buyer: token.id,
                                        amount: this.props.podcast.payment.amount,
                                    },
                                    query: unlockPodcast
                                }
                            })
                            .request.then(({data}) => {
                                if (data) {
                                    const link = `/podcasts/${data.unlockPodcast.id}`
                                    this.context.router.history.push(link)
                                }
                            }
                        )
                    }
                })

            })
        })
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    render() {
        const {show, onClose} = this.props

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Unlock podcast to listen</ModalHeader>
                    <ModalBody>
                        <div className="modal-body">
                            <p>Unlock the podcast by sending {this.props.podcast.payment.amount / 459.94} ethers or
                                {this.props.podcast.payment.amount} USD to hosts</p>
                            <button className="btn btn-primary" onClick={this.unlockPodcast}>Unlock</button>
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
UnlockModal.contextTypes = {
    router: PropTypes.object.isRequired
}
export default UnlockModal