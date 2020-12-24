import React from 'react'

const TodoListItem = ({tasks}) => {

    return (
        tasks.map((item) => {
            return (
                <li key={item.id}>
                    {item.taskName}
                </li>)
        })
    )
}

export default TodoListItem