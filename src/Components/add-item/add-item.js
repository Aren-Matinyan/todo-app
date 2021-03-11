import React, {Component, createRef} from 'react'

import {Button, FormControl, Modal} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import PropTypes from 'prop-types'
import {addTask} from "../store/actions"
import {connect} from "react-redux"

class AddItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            date: new Date()
        }
        this.titleRef = createRef()
    }

    componentDidMount() {
        this.titleRef.current.focus()
    }

    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        const title = this.state.title.trim()
        const description = this.state.description.trim()
        const {date} = this.state

        if (!title) {
            return
        }

        const newTask = {
            title,
            description,
            date: moment(date).format("YYYY-MM-DD")
        }

        this.props.addTask(newTask)
    }

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
    }

    render() {
        const {onClose} = this.props

        return (
            <>
                <Modal className={this.props.className}
                       show={true}
                       onHide={onClose}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl placeholder="Title"
                                     onChange={this.handleChange}
                                     name='title'
                                     onKeyPress={this.handleKeyDown}
                                     className='mb-3'
                                     ref={this.titleRef}/>
                        <FormControl placeholder="Description"
                                     as="textarea"
                                     rows={5}
                                     name='description'
                                     onChange={this.handleChange}
                                     className='mb-3'/>
                        <DatePicker minDate={new Date()}
                                    selected={this.state.date}
                                    onChange={this.handleChangeDate}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}
                                variant='success'>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

AddItem.propTypes = {
    onClose: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
}

const mapDispatchToProps = {
    addTask
}


export default connect(null, mapDispatchToProps)(AddItem)