import React, {PureComponent} from 'react'

import PropTypes from 'prop-types'
import {Button, Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faCheckCircle, faEdit} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"
import moment from "moment"
import styles from './todo-list-item.module.css'
import {textTruncate} from '../../helpers/utils'

export default class TodoListItem extends PureComponent {

    render() {

        const {task, deleteTask, selectedTask, editTask, checkItem, toggleDone} = this.props

        return (
            <Card border={selectedTask.has(task._id) ? "danger" : "success"} className={styles.todoCard}>
                <Card.Body>
                    <input type="checkbox"
                           onChange={checkItem}
                           checked={selectedTask.has(task._id)}/>
                    <Link to={`/task/${task._id}`}
                          className={styles.title}>
                        <Card.Title>{task.title}</Card.Title>
                    </Link>
                    <Card.Text> Description: {textTruncate(task.description)} </Card.Text>
                    <Card.Text> Status: {task.status === 'done' ? "Done" : "Active"} </Card.Text>
                    <Card.Text> Created: {moment(task.created_at).format('D MMM, YYYY')} </Card.Text>
                    <Card.Text> Date: {moment(task.date).format('D MMM, YYYY')} </Card.Text>
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
    toggleDone: PropTypes.func.isRequired
}