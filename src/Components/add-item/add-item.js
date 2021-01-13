import React, {Component} from 'react'

import {Button, Form, Row, Col, InputGroup} from "react-bootstrap"
import styles from './add-item.module.css'

export default class AddItem extends Component {

    state = {
        inputValue: '',
        description: ''
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    descriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onClick = () => {
        this.props.addTask(this.state.inputValue, this.state.description)
        this.setState({
            inputValue: '',
            description: ''
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.onClick()
        }
    }

    render() {
        return (
            <Row className={"justify-content-center"}>
                <Col xs={8} className={styles.addItem}>
                    <InputGroup className="d-flex">
                        <Form.Control placeholder="What needs to be done?"
                                      onChange={this.handleChange}
                                      value={this.state.inputValue}
                                      disabled={!!this.props.selectedTask.size}
                                      onKeyDown={this.handleKeyDown}
                        />

                        <Button onClick={this.onClick}
                                disabled={!!this.props.selectedTask.size}
                                variant='outline-success'>
                            Click to add
                        </Button>
                    </InputGroup>
                    <Form.Control as="textarea" rows={3}
                                  onChange={this.descriptionChange}
                                  value={this.state.description}
                                  className={styles.textarea}/>
                </Col>
            </Row>
        )
    }
}