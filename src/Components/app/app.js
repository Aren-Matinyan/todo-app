import React, {Component} from "react";

// import Product from "../../Homework-Product/product/product";

import AddItem from "../add-item/add-item";
import TodoList from "../todo-list/todo-list";
import AppHeader from "../app-header/app-header";


export default class App extends Component {

    id = 100

    state = {
        tasks: [
            this.createItem('Learn JavaScript'),
            this.createItem('Learn React'),
            this.createItem('Do homework')
        ]
    }

    createItem (text) {
        return {
            taskName: text,
            id: this.id++
        }
    }

    addItem = (text) => {
        const newItem = this.createItem(text)
        const newArr = [...this.state.tasks, newItem]
        this.setState({
            tasks: newArr,
        })
    }

    render() {
        return (
            <>
                <AppHeader/>
                <TodoList tasks={this.state.tasks}/>
                <AddItem addItem={this.addItem}/>
            </>

            // <div>
            //     <Product name="Bananas"
            //              price="3$"
            //              description="Fresh bananas from Ecuador" />
            // </div>
        )
    }
}