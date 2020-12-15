import React from "react";

import Header from "../header/header";
import TodoList from "../todo-list/todo-list";
import AddTask from "../add-task/add-task";

function App() {

    return (
        <div>
            <Header />
            <TodoList />
            <AddTask />
        </div>
    )
}

export default App;