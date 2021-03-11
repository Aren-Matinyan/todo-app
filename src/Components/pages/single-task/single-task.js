import React, {Component} from "react"

import {Button, Card, Container, Row, Col} from "react-bootstrap"
import moment from "moment"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheckCircle, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import EditTask from "../../edit-task/edit-task"
import {getTask} from "../../store/actions"
import {connect} from "react-redux"

class SingleTask extends Component {

    state = {
        openModalEdit: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        this.props.getTask(taskId)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openModalEdit: false
            })
        }
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

    render() {
        const {openModalEdit} = this.state
        const {task} = this.props

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
                                            from='single'
                                            onClose={this.toggleEditModal}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess
    }
}

const mapDispatchToProps = {
    getTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)
