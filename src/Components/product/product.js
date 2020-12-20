import React, {Component} from "react";

import Name from "../name/name";
import Price from "../price/price";
import Description from "../description/description";

export default class Product extends Component {

    render() {
        return (
            <div>
                <Name name ={this.props.name}/>
                <Price price = {this.props.price}/>
                <Description description = {this.props.description}/>
            </div>
        )
    }
}