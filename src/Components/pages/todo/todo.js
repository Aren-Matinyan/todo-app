import React, {Component} from "react"

import TodoList from "../../todo-list/todo-list"
import Confirm from "../../confirm/confirm"
import AddItem from "../../add-item/add-item"
import SearchTask from "../../search-task/search-task"
import Progress from "../../progress/progress"
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {getTasks, deleteTask, deleteTasks, getUser} from '../../../store/actions'
import {Button, Container, Row, Col} from "react-bootstrap"
import styles from './todo.module.css'

class Todo extends Component {

    state = {
        selectedTask: new Set(),
        showConfirm: false,
        searchValue: '',
        openNewTaskModal: false,
        statusFilter: 'All'
    }

    componentDidMount() {
        this.props.getTasks()
        this.props.getUser()
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            })
            return
        }
        if (!prevProps.deleteTaskSuccess && this.props.deleteTaskSuccess) {
            this.setState({
                showConfirm: false,
                selectedTask: new Set()
            })
        }
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    checkItem = (itemId) => {
        const selectedTask = new Set(this.state.selectedTask)
        if (selectedTask.has(itemId)) {
            selectedTask.delete(itemId)
        } else {
            selectedTask.add(itemId)
        }
        this.setState({
            selectedTask
        })
    }

    removeSelected = () => {
        const {selectedTask} = this.state
        this.props.deleteTasks(selectedTask)
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    selectAll = () => {
        const selectAll = this.props.tasks.map((task) => task._id)
        this.setState({
            selectedTask: new Set(selectAll)
        })
    }

    deSelectAll = () => {
        this.setState({
            selectedTask: new Set()
        })
    }

    render() {
        const {showConfirm, selectedTask, openNewTaskModal} = this.state
        const {tasks} = this.props

        return (
            <>
                <Container className={styles.todoApp}>
                    <Row>
                        <Col xs={12}>
                            <Progress/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SearchTask/>
                        </Col>
                    </Row>

                    <Button variant="primary"
                            onClick={this.toggleNewTaskModal}
                            disabled={!!selectedTask.size}>
                        Add Task
                    </Button>

                    <Button variant='warning'
                            className='float-right  mr-2'
                            onClick={this.deSelectAll}>Deselect all</Button>
                    <Button variant='warning'
                            className='float-right mr-2'
                            onClick={this.selectAll}>Select all</Button>

                    <TodoList tasks={tasks}
                              selectedTask={selectedTask}
                              checkItem={this.checkItem}/>

                    <Button variant="danger float-right"
                            disabled={!selectedTask.size}
                            onClick={this.toggleConfirm}
                            className='mt-1 mb-1'>
                        Remove selected
                    </Button>

                </Container>
                {openNewTaskModal && <AddItem onClose={this.toggleNewTaskModal}/>}
                {showConfirm && <Confirm onClose={this.toggleConfirm}
                                         onConfirm={this.removeSelected}
                                         count={selectedTask.size}/>}
            </>
        )
    }
}

Todo.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTaskSuccess: PropTypes.bool.isRequired,
    deleteTaskSuccess: PropTypes.bool.isRequired,
    getTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    deleteTasks: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTaskSuccess: state.deleteTaskSuccess
    }
}

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks,
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)