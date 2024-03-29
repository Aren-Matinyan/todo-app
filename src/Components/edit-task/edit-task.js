import React, {Component, createRef} from 'react'

import moment from "moment"
import PropTypes from 'prop-types'
import {editTask} from "../../store/actions"
import {connect} from "react-redux"
import {Button, Form, Modal} from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class EditTask extends Component {

    state = {
        ...this.props.taskForEdit,
        date: new Date(this.props.taskForEdit.date)
    }

    titleRef = createRef()

    componentDidMount() {
        this.titleRef.current.focus()
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
        const editedTask = {
            ...this.state,
            title,
            description,
            date: moment(date).format("YYYY-MM-DD")
        }
        this.props.editTask(editedTask, this.props.from)
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
            <Modal show={true}
                   onHide={onClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
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
                                  className='mb-3'
                                  ref={this.titleRef}/>

                    <Form.Control as="textarea" rows={3}
                                  placeholder="Description"
                                  onChange={(event) => this.handleChange(event, "description")}
                                  value={description}
                                  className='mb-3'/>

                    <DatePicker minDate={new Date()}
                                selected={this.state.date}
                                onChange={this.handleChangeDate}
                                className='mb-3'/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.onSubmit}
                            variant='success'>Edit</Button>
                    <Button onClick={onClose}
                            variant='primary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTask.propTypes = {
    taskForEdit: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    editTask
}

export default connect(null, mapDispatchToProps)(EditTask)