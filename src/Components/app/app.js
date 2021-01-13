import React, {Component} from "react";

import AddItem from "../add-item/add-item";
import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";

import {Container, Button} from "react-bootstrap";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './app.module.css';

export default class App extends Component {

    state = {
        tasks: [],
        selectedTask: new Set()
    }

    createTask(text, description) {
        return {
            taskName: text,
            _id: uuidv4(),
            description: description,
            created: moment().format('D MMM, YYYY')
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
            selectedTask: new Set()
        })
    }

    render() {
        return (
            <Container className={styles.todoApp}>
                <AppHeader/>
                <AddItem addTask={this.addTask}
                         selectedTask={this.state.selectedTask}/>
                <TodoList tasks={this.state.tasks}
                          selectedTask={this.state.selectedTask}
                          checkItem={this.checkItem}
                          deleteTask={this.deleteTask}/>
                <Button variant="outline-danger float-right"
                        disabled={!this.state.selectedTask.size}
                        onClick={this.removeSelected}>
                    Remove selected
                </Button>
            </Container>
        )
    }
}