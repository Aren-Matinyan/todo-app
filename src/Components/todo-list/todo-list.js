import React from 'react'

import TodoListItem from "../todo-list-item/todo-list-item"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Row, Col} from 'react-bootstrap'

const TodoList = ({tasks, checkItem, selectedTask}) => {

    const elements = tasks.map((item) => {
        return (
            <Col key={item._id}
                 xs={12} sm={6} md={4} lg={3} xl={3}>
                <TodoListItem task={item}
                              checkItem={() => checkItem(item._id)}
                              selectedTask={selectedTask}/>
            </Col>
        )
    })

    return (
        <Row>
            {elements}
        </Row>
    )
}

TodoList.propTypes = {
    tasks: PropTypes.array.isRequired,
    checkItem: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    }
}


export default connect(mapStateToProps)(TodoList)