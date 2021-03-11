import React, {useEffect} from "react"

import Todo from "../pages/todo/todo"
import About from "../pages/about/about"
import Contact from "../pages/contact/contact"
import NotFound from "../pages/not-found/not-found"
import NavMenu from "../nav-menu/nav-menu"
import SingleTask from "../pages/single-task/single-task"
import Spinner from "../spinner/spinner"
import {connect} from 'react-redux'
import {history} from "../../helpers/history"
import {Router, Route, Switch, Redirect} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import styles from './app.module.css'

const toastProps = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

function App({loading, successMessage, errorMessage}) {

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, toastProps)
        }
        if (errorMessage) {
            toast.error(errorMessage, toastProps)
        }
    }, [successMessage, errorMessage])

    return (
        <div>
            <Router history={history}>
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
            </Router>
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