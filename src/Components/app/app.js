import React, {Component} from "react";

import AddItem from "../add-item/add-item";
import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";

import {Container} from "react-bootstrap";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './app.module.css';

export default class App extends Component {

    state = {
        tasks: []
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

    deleteTask = (taskId) => {
        const newArr = this.state.tasks.filter(el => el._id !== taskId)
        this.setState({
            tasks: newArr
        })
    }

    render() {
        return (
            <div className={styles.todoApp}>
                <AppHeader/>
                <Container>
                    <AddItem addTask={this.addTask}/>
                    <TodoList tasks={this.state.tasks}
                              deleteTask={this.deleteTask}/>
                </Container>
            </div>
        )
    }
}