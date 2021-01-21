import React, {Component} from "react"

import {Form, Button, InputGroup} from "react-bootstrap";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class SearchTask extends Component {

    state = {
        changedValue: ''
    }

    handleChange = (event) => {
        const changedValue = event.target.value
        this.setState({changedValue})
        this.props.onTaskSearch(changedValue)
    }

    clearSearchPanel = () => {
        this.setState({changedValue: ''})
        this.props.onTaskSearch('')
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search..."
                    value={this.state.changedValue}
                    onChange={this.handleChange}/>
                <InputGroup.Append>
                    <Button onClick={this.clearSearchPanel}
                            variant="outline-secondary">
                        <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}