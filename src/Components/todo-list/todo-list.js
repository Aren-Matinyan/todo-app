import React from 'react'

import TodoListItem from "../todo-list-item/todo-list-item";

const TodoList = ({tasks}) => {

    return (
        <ul>
            <TodoListItem tasks={tasks}/>
        </ul>
    )
}

export default TodoList