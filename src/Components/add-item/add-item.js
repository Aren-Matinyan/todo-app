import React, {Component} from 'react'

import PropTypes from 'prop-types'
import {Button, Form, InputGroup, Modal} from "react-bootstrap"
// import styles from './add-item.module.css'

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

    onSubmit = () => {
        this.props.addTask(this.state.inputValue, this.state.description)
        this.onCancel()
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.onSubmit()
        }
    }

    onCancel = () => {
        this.props.onHide()
        this.setState({
            inputValue: '',
            description: '',
        })
    }

    render() {

        const {inputValue, description} = this.state

        return (
            <Modal
                show={this.props.show}
                onHide={this.onCancel}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <InputGroup>
                        <Form.Control placeholder="What needs to be done?"
                                      onChange={this.handleChange}
                                      value={inputValue}
                                      onKeyDown={this.handleKeyDown}
                        />
                    </InputGroup>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control as="textarea" rows={3}
                                  placeholder="Description"
                                  onChange={this.descriptionChange}
                                  value={description}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.onSubmit}
                            variant='outline-success'>
                        Add
                    </Button>
                    <Button onClick={this.onCancel}
                            variant='outline-primary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

AddItem.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired,
}
