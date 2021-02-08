import React, {Component} from "react"

import Todo from "../pages/todo/todo"
import About from "../pages/about/about"
import Contact from "../pages/contact/contact"
import NotFound from "../pages/not-found/not-found"
import NavMenu from "../nav-menu/nav-menu"
import SingleTask from "../pages/single-task/single-task"

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
// import styles from './app.module.css'

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <NavMenu />
                <Switch>
                    <Route path='/'
                           component={Todo}
                           exact/>
                    <Route path='/about'
                           component={About}
                           exact/>
                    <Route path='/contact'
                           component={Contact}
                           exact/>
                    <Route path='/task/:taskId'
                           component={SingleTask}
                           exact/>

                    <Route path='/not-found'
                           component={NotFound}
                           exact/>
                    <Redirect to='not-found'/>
                </Switch>
            </BrowserRouter>
        )
    }
}