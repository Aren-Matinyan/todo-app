import React, {Component} from 'react'

import PropTypes from 'prop-types'
import {Button, Form, InputGroup, Modal} from "react-bootstrap"
// import styles from './add-item.module.css'

export default class EditTask extends Component {

    state = {
        inputValue: this.props.editTask.taskName,
        description: this.props.editTask.description
    }

    handleChange = (event, propName) => {
        this.setState({
            [propName]: event.target.value
        })
    }

    onSubmit = () => {
        this.props.editedTask(this.state.inputValue, this.state.description, this.props.editTask._id)
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
            inputValue: this.props.editTask.taskName,
            description: this.props.editTask.description,
        })
    }

    render() {

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
                                      onChange={(event) => this.handleChange(event, "inputValue")}
                                      value={this.state.inputValue}
                                      onKeyDown={this.handleKeyDown}
                        />
                    </InputGroup>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control as="textarea" rows={3}
                                  placeholder="Description"
                                  onChange={(event) => this.handleChange(event, "description")}
                                  value={this.state.description}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.onSubmit}
                            variant='outline-success'>
                        Edit
                    </Button>
                    <Button onClick={this.onCancel}
                            variant='outline-primary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTask.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired,
    editTask: PropTypes.object.isRequired,
    editedTask: PropTypes.func.isRequired
}
