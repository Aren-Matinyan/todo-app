import React, {Component} from "react";

import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";
import Confirm from "../confirm/confirm";
import AddTaskModalWindow from "../add-task-modal-window/add-task-modal-window";
import SearchTask from "../search-task/search-task";
import EditTask from "../edit-task/edit-task";
import Progress from "../progress/progress";

import {Button, Container, Row, Col} from "react-bootstrap";
import moment from "moment";
import {v4 as uuid4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './app.module.css';

export default class App extends Component {

    state = {
        tasks: [],
        selectedTask: new Set(),
        showConfirm: false,
        searchValue: '',
        taskForEdit: null,
    }

    createTask(text, description) {
        const title = text.trim()
        const desc = description.trim()
        return {
            taskName: title,
            _id: uuid4(),
            description: desc,
            created: moment().format('D MMM, YYYY'),
            done: false
        }
    }

    addTask = (text, description) => {

        if (!text.trim()) {
            return;
        }

        const newTask = this.createTask(text, description)
        const newArr = [...this.state.tasks, newTask]
        this.setState({
            tasks: newArr,
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
        const newArr = this.state.tasks.filter(el => el._id !== taskId)
        this.setState({
            tasks: newArr
        })
    }

    removeSelected = () => {
        const {selectedTask, tasks} = this.state
        const newTask = tasks.filter((task) => !selectedTask.has(task._id))

        this.setState({
            tasks: newTask,
            selectedTask: new Set(),
            showConfirm: false
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
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex((task) => task._id === editedTask._id);
        tasks[idx] = editedTask;

        this.setState({
            tasks,
            taskForEdit: null
        });
    };

    search = (tasks, value) => {
        if (!value.trim) {
            return tasks
        }

        return tasks.filter((task) => task
            .taskName.toLowerCase()
            .includes(value.toLowerCase()))
    }

    onTaskSearch = (searchValue) => {
        this.setState({searchValue})
    }

    toggleDone = (id) => {
        const tasks = [...this.state.tasks]
        const idx = tasks.findIndex((task) => task._id === id)
        tasks[idx] = {...tasks[idx], done: !tasks[idx].done }
        this.setState({tasks})
    }

    render() {

        const {tasks, searchValue, showConfirm, selectedTask, taskForEdit} = this.state

        const visibleTasks = this.search(tasks, searchValue)

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
                    <SearchTask onTaskSearch={this.onTaskSearch}/>
                    <AddTaskModalWindow addTask={this.addTask}
                                        selectedTask={selectedTask}/>

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