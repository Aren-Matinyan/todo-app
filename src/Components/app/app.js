import React, {Component} from "react";

import AddItem from "../add-item/add-item";
import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './app.module.css';

export default class App extends Component {

    id = 100

    state = {
        tasks: []
    }

    createTask (text) {
        return {
            taskName: text,
            id: this.id++,
        }
    }

    addTask = (text) => {

        if(!text.trim()){
            return;
        }

        const newTask = this.createTask(text)
        const newArr = [...this.state.tasks, newTask]
        this.setState({
            tasks: newArr,
        })
    }

    deleteTask = (id) => {
        const newArr = this.state.tasks.filter(el => el.id !== id)
        this.setState({
            tasks: newArr
        })
    }

    render() {
        return (
            <div className={styles.todoApp}>
                <AppHeader/>
                <TodoList tasks={this.state.tasks}
                          deleteTask={this.deleteTask}/>
                <AddItem addTask={this.addTask}/>
            </div>
        )
    }
}