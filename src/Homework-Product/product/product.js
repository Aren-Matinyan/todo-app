import React, {Component} from "react";

import Name from "../name/name";
import Price from "../price/price";
import Description from "../description/description";

export default class Product extends Component {

    render() {

        const {name, price, description} = this.props

        return (
            <div>
                <Name name ={name}/>
                <Price price = {price}/>
                <Description description = {description}/>
            </div>
        )
    }
}