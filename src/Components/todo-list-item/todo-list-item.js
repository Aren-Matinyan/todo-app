import React, {Component} from 'react'

import {Button, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faCheckCircle, faEdit} from '@fortawesome/free-solid-svg-icons'
import styles from './todo-list-item.module.css'

export default class TodoListItem extends Component {

    render() {
        const {task, deleteTask, selectedTask, editTask, checkItem, toggleDone} = this.props

        return (
            <Card border={selectedTask.has(task._id) ? "danger" : "success"} className={styles.todoCard}>
                <Card.Body>
                    <input type="checkbox"
                           onChange={checkItem}
                           checked={selectedTask.has(task._id)}/>
                    <Card.Title
                        className={task.done ? `${styles.todoTask} ${styles.done}` : styles.todoTask}>
                        {task.taskName}
                    </Card.Title>
                    <Card.Text> Description: {task.description} </Card.Text>
                    <Card.Text> Status: {task.done ? "Done" : "Active"} </Card.Text>
                    <Card.Text> Created: {task.created} </Card.Text>
                    <Button onClick={deleteTask}
                            disabled={!!selectedTask.size}
                            variant='outline-danger float-right'>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>

                    <Button variant="outline-warning float-right"
                            disabled={!!selectedTask.size}
                            className="mr-2 ml-2"
                            onClick={editTask}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>

                    <Button disabled={!!selectedTask.size}
                            variant='outline-success float-right'
                            onClick={toggleDone}>
                        <FontAwesomeIcon icon={faCheckCircle}/>
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

TodoListItem.propTypes = {
    task: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    toggleDone:PropTypes.func.isRequired
}