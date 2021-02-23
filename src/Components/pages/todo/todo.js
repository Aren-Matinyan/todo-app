import React, {Component} from "react"

import TodoList from "../../todo-list/todo-list"
import Confirm from "../../confirm/confirm"
import AddItem from "../../add-item/add-item"
import SearchTask from "../../search-task/search-task"
import EditTask from "../../edit-task/edit-task"
import Progress from "../../progress/progress"
import StatusFilter from "../../status-filter/status-filter"
import {getTasks, deleteTask, deleteTasks} from '../../store/actions'
import {Button, Container, Row, Col} from "react-bootstrap"
import styles from './todo.module.css'
import {connect} from 'react-redux'

class Todo extends Component {

    state = {
        selectedTask: new Set(),
        showConfirm: false,
        searchValue: '',
        openNewTaskModal: false,
        taskForEdit: null,
        statusFilter: 'All'
    }

    componentDidMount() {
        this.props.getTasks()
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            })
            return
        }
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                taskForEdit: null
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

    editTask = (taskForEdit) => {
        this.setState({taskForEdit})
    }

    search = (tasks, value) => {
        if (!value.trim) {
            return tasks
        }

        return tasks.filter((task) => task
            .title.toLowerCase()
            .includes(value.toLowerCase()))
    }

    onTaskSearch = (searchValue) => {
        this.setState({searchValue})
    }

    toggleDone = (id) => {

        const tasks = [...this.state.tasks]
        const idx = tasks.findIndex((task) => task._id === id)
        if (tasks[idx].status === 'active') {
            tasks[idx] = {...tasks[idx], status: 'done'}
        } else {
            tasks[idx] = {...tasks[idx], status: 'active'}
        }

        this.setState({tasks})
    }

    statusFilter = (tasks, filter) => {
        switch (filter) {
            case "All":
                return tasks
            case "Active":
                return tasks.filter((task) => task.status === 'active')
            case "Done":
                return tasks.filter((task) => task.status === 'done')
            default:
                return tasks
        }
    }

    changeFilter = (statusFilter) => {
        this.setState({statusFilter})
    }

    render() {

        const {searchValue, showConfirm, selectedTask, taskForEdit, statusFilter, openNewTaskModal} = this.state
        const {tasks} = this.props

        const visibleTasks = this.statusFilter(
            this.search(tasks, searchValue),
            statusFilter)

        return (
            <>
                <Container className={styles.todoApp}>
                    <Row>
                        <Col>
                            <Progress tasks={tasks}/>
                        </Col>
                    </Row>
                    <div className='d-flex '>
                        <SearchTask onTaskSearch={this.onTaskSearch}/>
                        <StatusFilter statusFilter={statusFilter}
                                      changeFilter={this.changeFilter}/>
                    </div>

                    <Button variant="outline-primary"
                            onClick={this.toggleNewTaskModal}>
                        Add Task
                    </Button>
                    <Button variant='outline-warning'
                            className='float-right'
                            onClick={this.deSelectAll}>Deselect all</Button>
                    <Button variant='outline-warning'
                            className='float-right mr-2'
                            onClick={this.selectAll}>Select all</Button>

                    <TodoList tasks={visibleTasks}
                              selectedTask={selectedTask}
                              checkItem={this.checkItem}
                              deleteTask={this.props.deleteTask}
                              editTask={this.editTask}
                              toggleDone={this.toggleDone}/>
                    <Button variant="outline-danger float-right"
                            disabled={!selectedTask.size}
                            onClick={this.toggleConfirm}>
                        Remove selected
                    </Button>
                </Container>
                {openNewTaskModal && <AddItem onClose={this.toggleNewTaskModal}/>}
                {showConfirm && <Confirm onClose={this.toggleConfirm}
                                         onConfirm={this.removeSelected}
                                         count={selectedTask.size}/>}
                {taskForEdit && <EditTask taskForEdit={taskForEdit}
                                          onClose={() => this.editTask(null)}/>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        editTaskSuccess: state.editTaskSuccess,
        deleteTaskSuccess: state.deleteTaskSuccess
    }
}

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)