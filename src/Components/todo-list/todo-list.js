import React from 'react'

import TodoListItem from "../todo-list-item/todo-list-item"

import styles from './todo-list.module.css'

const TodoList = ({tasks, deleteTask}) =>{

    const elements = tasks.map((item)=>{
        return (
            <li key={item.id} className="list-group-item ">
                <TodoListItem task = {item}
                              deleteTask = {() => deleteTask(item.id)}/>
            </li>
        )
    })

    return (
        <ul className={`list-group ${styles.todoList}`} >
            {elements}
        </ul>
    )
}

export default TodoList