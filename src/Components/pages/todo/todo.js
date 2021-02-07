import React, {Component} from "react"

import TodoList from "../../todo-list/todo-list"
import AppHeader from "../../app-header/app-header"
import Confirm from "../../confirm/confirm"
import AddItem from "../../add-item/add-item"
import SearchTask from "../../search-task/search-task"
import EditTask from "../../edit-task/edit-task"
import Progress from "../../progress/progress"
import StatusFilter from "../../status-filter/status-filter"

import {Button, Container, Row, Col} from "react-bootstrap"

import styles from './todo.module.css'

export default class Todo extends Component {

    state = {
        tasks: [],
        selectedTask: new Set(),
        showConfirm: false,
        searchValue: '',
        openNewTaskModal: false,
        taskForEdit: null,
        statusFilter: 'All'
    }

    componentDidMount() {

        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                this.setState({
                    tasks: res
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addTask = (newTask) => {

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                const tasks = [...this.state.tasks, res]

                this.setState({
                    tasks,
                    openNewTaskModal: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
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

    deleteTask = (taskId) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                const newArr = this.state.tasks.filter(el => el._id !== taskId)
                this.setState({
                    tasks: newArr
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    removeSelected = () => {
        const {selectedTask, tasks} = this.state

        const body = {tasks:[...selectedTask]}

        fetch(`http://localhost:3001/task`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                const newTask = tasks.filter((task) => !selectedTask.has(task._id))

                this.setState({
                    tasks: newTask,
                    selectedTask: new Set(),
                    showConfirm: false
                })


            })
            .catch((error) => {
                console.log(error)
            })

    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    selectAll = () => {
        const selectAll = this.state.tasks.map((task) => task._id)
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

    saveEditedTask = (editedTask) => {
        const tasks = [...this.state.tasks]

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const res = await response.json()
                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Something went wrong!!!')
                    }
                }

                const idx = tasks.findIndex((task) => task._id === editedTask._id)
                tasks[idx] = editedTask

                this.setState({
                    tasks,
                    taskForEdit: null
                })
            })
            .catch((error) => {
                console.log(error)
            })
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

        const {tasks, searchValue, showConfirm, selectedTask, taskForEdit, statusFilter, openNewTaskModal} = this.state

        const visibleTasks = this.statusFilter(
            this.search(tasks, searchValue),
            statusFilter)

        return (
            <>
                <Container className={styles.todoApp}>
                    <Row>
                        <Col>
                            <AppHeader/>
                        </Col>
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
                              deleteTask={this.deleteTask}
                              editTask={this.editTask}
                              toggleDone={this.toggleDone}/>
                    <Button variant="outline-danger float-right"
                            disabled={!selectedTask.size}
                            onClick={this.toggleConfirm}>
                        Remove selected
                    </Button>
                </Container>
                {openNewTaskModal && <AddItem className='modal'
                                              onClose={this.toggleNewTaskModal}
                                              onAdd={this.addTask}/>}
                {showConfirm && <Confirm onClose={this.toggleConfirm}
                                         onConfirm={this.removeSelected}
                                         count={selectedTask.size}/>}
                {taskForEdit && <EditTask taskForEdit={taskForEdit}
                                          onSave={this.saveEditedTask}
                                          onClose={() => this.editTask(null)}/>}
            </>
        )
    }
}