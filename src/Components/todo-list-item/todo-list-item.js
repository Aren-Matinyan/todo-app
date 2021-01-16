import React, {Component} from 'react'

import {Button, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './todo-list-item.module.css'

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

        const {task, deleteTask, selectedTask} = this.props
        const {done} = this.state

        return (
            <Card border={selectedTask.has(task._id) ? "danger" : "success"} className={styles.todoCard}>
                <Card.Body>
                    <input type="checkbox"
                           onChange={this.props.checkItem}/>
                    <Card.Title
                        className={done ? `${styles.todoTask} ${styles.done}` : styles.todoTask}
                        onClick={this.doneTask}>{task.taskName}</Card.Title>
                    <Card.Text> Description: {task.description} </Card.Text>
                    <Card.Text> Status: {done ? "Done" : "Active"} </Card.Text>
                    <Card.Text> Created: {task.created} </Card.Text>
                    <Button onClick={deleteTask}
                            disabled={!!selectedTask.size}
                            variant='outline-danger float-right'>
                        Delete
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
    selectedTask: PropTypes.object.isRequired
}