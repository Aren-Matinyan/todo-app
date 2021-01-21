import React, {Component} from 'react'

import {Button, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import styles from './todo-list-item.module.css'
import EditTaskModalWindow from "../edit-task-modal-window/edit-task-modal-window";

export default class TodoListItem extends Component {

    state = {
        done: false
    }

    doneTask = () => {
        this.setState(() => {
            return {
                done: !this.state.done,
            }
        })
    }

    render() {

        const {task, deleteTask, selectedTask, editedTask} = this.props
        const {done} = this.state

        return (
            <Card border={selectedTask.has(task._id) ? "danger" : "success"} className={styles.todoCard}>
                <Card.Body>
                    <input type="checkbox"
                           onChange={this.props.checkItem}
                           checked={selectedTask.has(task._id)}/>
                    <Card.Title
                        className={done ? `${styles.todoTask} ${styles.done}` : styles.todoTask}
                        onClick={this.doneTask}>{task.taskName}</Card.Title>
                    <Card.Text> Description: {task.description} </Card.Text>
                    <Card.Text> Status: {done ? "Done" : "Active"} </Card.Text>
                    <Card.Text> Created: {task.created} </Card.Text>
                    <Button onClick={deleteTask}
                            disabled={!!selectedTask.size}
                            variant='outline-danger float-right'>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                    <EditTaskModalWindow editTask={task}
                                         selectedTask={selectedTask}
                                         editedTask={editedTask}/>
                </Card.Body>
            </Card>
        )
    }
}

TodoListItem.propTypes = {
    task: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired
}