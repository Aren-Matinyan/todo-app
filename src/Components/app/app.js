import React, {Component} from "react";

import AddItem from "../add-item/add-item";
import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";

import './app.css';

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
        const index = this.state.tasks.findIndex((el) => el.id === id)
        const newArr = [
            ...this.state.tasks.slice(0,index),
            ...this.state.tasks.slice(index + 1)
        ]
        this.setState({
            tasks: newArr
        })
    }

    render() {
        return (
            <div className='todo-app'>
                <AppHeader/>
                <TodoList tasks={this.state.tasks}
                          deleteTask={this.deleteTask}/>
                <AddItem addTask={this.addTask}/>
            </div>
        )
    }
}