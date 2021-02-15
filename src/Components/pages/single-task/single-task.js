import React, {Component} from "react"

import {Button, Card, Container, Row, Col} from "react-bootstrap"
import moment from "moment"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheckCircle, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import EditTask from "../../edit-task/edit-task";

export default class SingleTask extends Component {

    state = {
        task: null,
        openModalEdit: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }
                this.setState({
                    task: res
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteTask = () => {

        const taskId = this.state.task._id

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                this.props.history.push('/')

            })
            .catch((error) => {
                console.log(error)
            })
    }

    toggleEditModal = () => {
        this.setState({
            openModalEdit: !this.state.openModalEdit
        })
    }

    saveEditedTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                this.setState({
                    task: res,
                    openModalEdit: false
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const {task, openModalEdit} = this.state

        return (
            <div className="mt-3">
                <Container>
                    <Row>
                        <Col xs={12}>
                            {task ?
                                <Card className='text-center'>
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text> Description: {task.description} </Card.Text>
                                        <Card.Text> Status: {task.status === 'done' ? "Done" : "Active"} </Card.Text>
                                        <Card.Text> Created: {moment(task.created_at).format('D MMM, YYYY')} </Card.Text>
                                        <Card.Text> Date: {moment(task.date).format('D MMM, YYYY')} </Card.Text>
                                        <Button variant='outline-success'
                                            // onClick={toggleDone}
                                        >
                                            <FontAwesomeIcon icon={faCheckCircle}/>
                                        </Button>

                                        <Button variant="outline-warning"
                                                className="mr-2 ml-2"
                                                onClick={this.toggleEditModal}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </Button>

                                        <Button variant='outline-danger'
                                                onClick={this.deleteTask}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                    </Card.Body>
                                </Card> : "Task data not exists"}
                        </Col>
                    </Row>
                </Container>
                {openModalEdit && <EditTask taskForEdit={task}
                                            onSave={this.saveEditedTask}
                                            onClose={this.toggleEditModal}/>}
            </div>
        )
    }
}

