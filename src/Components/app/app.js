import React, {useEffect} from "react"

import Todo from "../pages/todo/todo"
import About from "../pages/about/about"
import Contact from "../pages/contact/contact"
import NotFound from "../pages/not-found/not-found"
import Register from "../pages/register/register"
import Login from "../pages/login/login"
import NavMenu from "../nav-menu/nav-menu"
import SingleTask from "../pages/single-task/single-task"
import Spinner from "../spinner/spinner"
import AuthRoute from '../auth-route'
import {connect} from 'react-redux'
import {history} from "../../helpers/history"
import {Router, Switch, Route, Redirect} from "react-router-dom"
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
                    <AuthRoute path='/'
                               component={Todo}
                               type='private'
                               exact/>
                    <Route path='/about'
                               component={About}
                               exact/>
                    <Route path='/contact'
                               component={Contact}
                               exact/>
                    <AuthRoute path='/task/:taskId'
                               component={SingleTask}
                               type='private'
                               exact/>
                    <AuthRoute path='/register'
                               component={Register}
                               type='public'
                               exact/>
                    <AuthRoute path='/login'
                               component={Login}
                               type='public'
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
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps)(App)