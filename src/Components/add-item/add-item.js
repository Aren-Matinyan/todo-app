import React, {Component} from 'react'

import {Button, Form, Row, Col} from "react-bootstrap"
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

    render() {
        return (
            <Row className={"justify-content-center"}>
                <Col xs={8}>
                    <Form className={styles.addItem}>
                        <div className="d-flex">
                            <Form.Control type="text"
                                          placeholder="What needs to be done?"
                                          variant='form-control'
                                          onChange={this.handleChange}
                                          value={this.state.inputValue}/>

                            <Button onClick={this.onClick}
                                    variant='outline-success'>
                                Click to add
                            </Button>
                        </div>
                        <Form.Control as="textarea" rows={3}
                                      onChange={this.descriptionChange}
                                      value={this.state.description}
                                      className={styles.textarea}/>
                    </Form>
                </Col>
            </Row>
        )
    }
}