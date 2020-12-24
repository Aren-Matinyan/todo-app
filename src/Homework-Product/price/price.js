import React, {Component} from "react";

export default class Price extends Component {

    constructor(props) {
        super(props)
        this.state = {
            price: this.props.price
        }
    }

    onChangeCurrency = () => {

        let {price} = this.state
        const realPrice = parseFloat(price)

        if (price.includes("$")) {
            price = realPrice * 500 + "֏"
        } else {
            price = realPrice / 500 + "$"
        }

        this.setState({
            price: price
        })
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