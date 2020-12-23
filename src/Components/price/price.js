import React, {Component} from "react";

export default class Price extends Component {

    constructor(props) {
        super(props)
        this.state = {
            price: this.props.price
        }
    }

    onChangeCurrency = () => {

        const {price} = this.state

        if (price[price.length - 1] === "$") {
            this.setState({
                price: price.slice(0, price.length - 1) * 500 + "֏"
            })
        } else {
            this.setState({
                price: price.slice(0, price.length - 1) / 500 + "$"
            })
        }
    }

    render() {

        const {price} = this.state

        return (
            <>
                <span>{price}</span>
                <button onClick={this.onChangeCurrency}>Change the currency</button>
            </>
        )
    }
}