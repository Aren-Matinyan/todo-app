import React, {useEffect} from "react"

import Todo from "../pages/todo/todo"
import About from "../pages/about/about"
import Contact from "../pages/contact/contact"
import NotFound from "../pages/not-found/not-found"
import NavMenu from "../nav-menu/nav-menu"
import SingleTask from "../pages/single-task/single-task"
import Spinner from "../spinner/spinner"
import {connect} from 'react-redux'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import styles from './app.module.css'

function App({loading, successMessage, errorMessage}) {

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            })
        }
        if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            })
        }
    }, [successMessage, errorMessage])

    return (
        <div>
            <BrowserRouter>
                <NavMenu/>
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
            {loading && <Spinner/>}
            <ToastContainer/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        successMessage: state.successMessage,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(App)