import React, {Component} from 'react'

import './todo-list-item.css'

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

        let classNames = 'todo-task'

        if (done) {
            classNames += ' done'
        }

        return (
            <span className={classNames}
                  onClick={this.doneTask}>
                  {task.taskName}

                <button onClick={deleteTask}
                        className='btn btn-outline-success btn-sm float-right'>
                        Delete
                  </button>
            </span>
        )
    }
}