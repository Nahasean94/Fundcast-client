import React from 'react'

class BuyersView extends React.Component {
    render() {
        const {buyer,timestamp,amount} = this.props.buyer

        return (
            <tr>
                <td>{buyer.username}</td>
                <td>{amount}</td>
                <td>{new Date(timestamp).toLocaleDateString()}</td>
            </tr>
        )
    }
}

export default BuyersView