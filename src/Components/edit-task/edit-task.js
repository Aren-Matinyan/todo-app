import React, {Component} from 'react'

import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import {Button, Form, Modal} from "react-bootstrap"

export default class EditTask extends Component {

    state = {
        ...this.props.taskForEdit,
        date: new Date(this.props.taskForEdit.date)
    }

    handleChange = (event, propName) => {
        this.setState({
            [propName]: event.target.value
        })
    }

    onSubmit = () => {
        const title = this.state.title.trim()
        const description = this.state.description.trim()
        const {date} = this.state
        if (!title) {
            return
        }
        this.props.onSave({
            ...this.state,
            title,
            description,
            date: moment(date).format("YYYY-MM-DD")
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.onSubmit()
        }
    }

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
    }

    render() {
        const {title, description} = this.state
        const {onClose} = this.props
        return (
            <Modal
                show={true}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Task
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Control placeholder="What needs to be done?"
                                  onChange={(event) => this.handleChange(event, "title")}
                                  onKeyDown={this.handleKeyDown}
                                  value={title}
                                  className='mb-3'/>

                    <Form.Control as="textarea" rows={3}
                                  placeholder="Description"
                                  onChange={(event) => this.handleChange(event, "description")}
                                  value={description}/>
                    <DatePicker minDate={new Date()}
                                selected={this.state.date}
                                onChange={this.handleChangeDate}
                                className='mb-3'/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.onSubmit}
                            variant='outline-success'>Edit</Button>
                    <Button onClick={onClose}
                            variant='outline-primary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTask.propTypes = {
    taskForEdit: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}