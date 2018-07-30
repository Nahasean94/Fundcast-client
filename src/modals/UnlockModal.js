import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Fundcast from '../blockchain/build/contracts/Fundcast.json'
import getWeb3 from '../utils/getWeb3'

const contract = require('truffle-contract')
class UnlockModal extends React.Component {
    constructor(props){
        super(props)
        this.unlockPodcast=this.unlockPodcast.bind(this)
    }

    unlockPodcast(){
        const cost=(this.props.podcast.payment.amount/459.94)*1000000000000000000
        const fundcast = contract(Fundcast)
        fundcast.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let fundcastInstance

        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            fundcast.deployed().then((instance) => {
                fundcastInstance = instance
                return fundcastInstance.unlockPodcast("0x86497dac3bba3061f4cc673d0ea0a6efefec5ec4", {from: coinbase,value:cost})
            }).then((result) => {
                this.state.web3.eth.getBalance('0x86497dac3bba3061f4cc673d0ea0a6efefec5ec4').then(balance=>{
                    console.log(balance/1000000000000000000)
                })
                // console.log(result)
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
                            <p>Unlock the podcast by sending {this.props.podcast.payment.amount/459.94} ethers or USD{this.props.podcast.payment.amount} to host</p>
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
export default UnlockModal