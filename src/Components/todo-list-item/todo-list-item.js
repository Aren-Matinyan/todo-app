import React, {Component} from 'react'

import {Button} from 'react-bootstrap'

import styles from './todo-list-item.module.css'

export default class TodoListItem extends Component {

    state = {
        done: false
    }

    doneTask = () => {
        this.setState(() => {
            return {
                done: !this.state.done
            }
        })
    }

    render() {

        const {task, deleteTask} = this.props
        const {done} = this.state

        return (
            <span className={ done ? `${styles.todoTask} ${styles.done}` : styles.todoTask}
                  onClick={this.doneTask}>
                  {task.taskName}

                <Button onClick={deleteTask}
                        variant='btn btn-outline-success btn-sm float-right'>
                        Delete
                </Button>
            </span>
        )
    }
}