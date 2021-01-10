import React, {Component} from 'react'

import styles from './add-item.module.css'
import {Button, Form} from "react-bootstrap";

export default class AddItem extends Component {

    state = {
        inputValue: ''
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    onClick = () =>{
        this.props.addTask(this.state.inputValue)
        this.setState({
            inputValue: ''
        })
    }

    render() {
        return (
            <Form className={`${styles.addItem} d-flex`}>
                <Form.Control type="text" placeholder="Add task..."
                              variant='form-control'
                              onChange={this.handleChange}
                              value={this.state.inputValue}/>

                <Button onClick={this.onClick}
                        variant='btn btn-outline-secondary'>
                    Click to add
                </Button>
            </Form>
        )
    }
}