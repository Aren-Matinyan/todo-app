import React, {Component} from "react"

import {Button, Card, Container, Row, Col} from "react-bootstrap"
import moment from "moment"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheckCircle, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import EditTask from "../../edit-task/edit-task"
import {getTask, deleteTask} from "../../store/actions"
import {connect} from "react-redux"
import PropTypes from "prop-types"

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
        const taskId = this.props.match.params.taskId
        this.props.deleteTask(taskId, 'single')
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

SingleTask.propTypes = {
    task: PropTypes.object.isRequired,
    editTaskSuccess: PropTypes.bool.isRequired,
    getTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess
    }
}

const mapDispatchToProps = {
    getTask,
    deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)
