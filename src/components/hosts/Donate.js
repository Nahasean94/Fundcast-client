import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Fundcast from '../../blockchain/build/contracts/Fundcast.json'
import getWeb3 from '../../utils/getWeb3'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {isEmpty} from "lodash"

const contract = require('truffle-contract')

class Donate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
            errors: {},
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateInput(data) {
        let errors = {}

        if (data.amount < 1) {
            errors.hosts = 'Minimum you can donate is 1 USD'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            const amount = this.state.amount
            const cost = (amount / 459.94) * 1000000000000000000

            const fundcast = contract(Fundcast)
            fundcast.setProvider(this.state.web3.currentProvider)
            // Declaring this for later so we can chain functions on SimpleStorage.
            let fundcastInstance

            // Get accounts.
            this.state.web3.eth.getCoinbase((error, coinbase) => {

                fundcast.deployed().then(async (instance) => {
                    fundcastInstance = instance
                    return await fundcastInstance.unlockPodcast(this.props.ethereum_address, {
                        from: coinbase,
                        value: cost
                    })
                }).then(unlocked => {
                    this.setState({
                        message: `Successfully donated ${amount} USD to ${this.props.ethereum_address}`,
                        amount: 0
                    })
                })
            })

        }
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
        const {errors, amount, message} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Donate to host</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            {message && <div className="alet alert-primary">{message}</div>}
                            <TextFieldGroup
                                label="Amont in USD"
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={this.onChange}
                                error={errors.amount}
                            />
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="paid"></label>
                                <div className="col-sm-10">
                                    <div className="form-group">
                                        <button className="form-control from-control-sm btn btn-primary btn-sm"
                                                type="submit">Donate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
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

Donate.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Donate