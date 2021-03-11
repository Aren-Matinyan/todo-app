import React, {useState, useEffect} from 'react'

import {Button, Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faCheckCircle, faEdit} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"
import moment from "moment"
import styles from './todo-list-item.module.css'
import {textTruncate} from '../../helpers/utils'
import {deleteTask} from "../store/actions"
import {connect} from "react-redux"
import EditTask from "../edit-task/edit-task"
import PropTypes from "prop-types";

const TodoListItem = ({task, deleteTask, selectedTask, checkItem, editTasksSuccess}) => {

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const toggleEditModal = () => {
        setOpenModalEdit(!openModalEdit)
    }

    useEffect(() => {
        setOpenModalEdit(false)
    }, [editTasksSuccess])

    return (
        <Card border={selectedTask.has(task._id) ? "danger" : "success"} className={styles.todoCard}>
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
                        variant='outline-success float-right'>
                    <FontAwesomeIcon icon={faCheckCircle}/>
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
    editTasksSuccess: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    return {
        editTasksSuccess: state.editTasksSuccess
    }
}

const mapDispatchToProps = {
    deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)