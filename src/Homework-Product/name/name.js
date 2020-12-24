import React, {Component} from "react";

export default class Name extends Component {

    render() {

        const {name} = this.props

        return (
            <div>{name}</div>
        )
    }
}