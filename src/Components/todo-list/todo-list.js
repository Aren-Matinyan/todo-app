import React from 'react'

import TodoListItem from "../todo-list-item/todo-list-item"
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap'
import styles from './todo-list.module.css'

const TodoList = ({tasks, deleteTask, checkItem, selectedTask}) => {

    const elements = tasks.map((item) => {
        return (
            <Col key={item._id}
                 xs={12} sm={6} md={4} lg={3} xl={3}>
                <TodoListItem task={item}
                              checkItem={() => checkItem(item._id)}
                              deleteTask={() => deleteTask(item._id)}
                              selectedTask={selectedTask}/>
            </Col>
        )
    })

    return (
        <Row className={styles.todoList}>
            {elements}
        </Row>
    )
}

TodoList.propTypes = {
    tasks: PropTypes.array.isRequired,
    selectedTask: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default TodoList