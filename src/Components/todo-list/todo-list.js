import React from 'react'

import TodoListItem from "../todo-list-item/todo-list-item"

import {Row, Col} from 'react-bootstrap'
import styles from './todo-list.module.css'

const TodoList = ({tasks, deleteTask}) => {

    const elements = tasks.map((item) => {
        return (
            <Col key={item._id}
                 xs={12} sm={6} md={4} lg={3} xl={3}>
                <TodoListItem task={item}
                              deleteTask={() => deleteTask(item._id)}/>
            </Col>

        )
    })

    return (
        <Row className={styles.todoList}>
            {elements}
        </Row>
    )
}

export default TodoList