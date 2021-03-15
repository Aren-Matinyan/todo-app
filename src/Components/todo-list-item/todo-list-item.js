import React, {useState, useEffect} from 'react'

import EditTask from "../edit-task/edit-task"
import moment from "moment"
import PropTypes from "prop-types"
import {textTruncate} from '../../helpers/utils'
import {connect} from "react-redux"
import {deleteTask, toggleDone} from "../store/actions"
import {Link} from "react-router-dom"
import {Button, Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faCheck, faEdit, faHistory} from '@fortawesome/free-solid-svg-icons'
import styles from './todo-list-item.module.css'

const TodoListItem = ({task, deleteTask, toggleDone, selectedTask, checkItem, editTasksSuccess}) => {

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const toggleEditModal = () => {
        setOpenModalEdit(!openModalEdit)
    }

    useEffect(() => {
        setOpenModalEdit(false)
    }, [editTasksSuccess])

    const toggleDoneTask = () => {
        const sendTask = {...task}
        if (sendTask.status === 'done') {
            sendTask.status = 'active'
        } else {
            sendTask.status = 'done'
        }
        toggleDone(sendTask)
    }

    return (
        <Card border={selectedTask.has(task._id) ? "danger" : (task.status === "done" ? "success" : "secondary")}
              className={styles.todoCard}>
            <Card.Body>
                <input type="checkbox"
                       onChange={checkItem}
                       checked={selectedTask.has(task._id)}/>
                <Link to={`/task/${task._id}`}
                      className={styles.title}>
                    <Card.Title>{textTruncate(task.title, 15)}</Card.Title>
                </Link>
                <Card.Text> Description: {textTruncate(task.description, 60)} </Card.Text>
                <Card.Text> Status: {task.status === 'done' ? "Done" : "Active"} </Card.Text>
                <Card.Text> Created: {moment(task.created_at).format('D MMM, YYYY')} </Card.Text>
                <Card.Text> Date: {moment(task.date).format('D MMM, YYYY')} </Card.Text>
                <Button onClick={() => deleteTask(task._id)}
                        disabled={!!selectedTask.size}
                        variant='outline-danger float-right'>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>

                <Button variant="outline-warning float-right"
                        disabled={!!selectedTask.size}
                        className="mr-2 ml-2"
                        onClick={toggleEditModal}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>

                <Button disabled={!!selectedTask.size}
                        variant={`${task.status === 'done' ? 'outline-secondary' : 'outline-success'} float-right`}
                        onClick={toggleDoneTask}>
                    <FontAwesomeIcon icon={task.status === 'done' ? faHistory : faCheck}/>
                </Button>
            </Card.Body>
            {openModalEdit && <EditTask taskForEdit={task}
                                        onClose={toggleEditModal}/>}
        </Card>
    )
}

TodoListItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    toggleDone: PropTypes.func.isRequired,
    editTasksSuccess: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        editTasksSuccess: state.editTasksSuccess
    }
}

const mapDispatchToProps = {
    deleteTask,
    toggleDone
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)