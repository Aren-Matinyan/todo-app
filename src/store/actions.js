import request from "../helpers/request"
import requestWithoutToken from "../helpers/auth"
import * as actionTypes from './action-types'
import {history} from "../helpers/history"
import {saveToken} from "../helpers/auth"

const apiHost = process.env.REACT_APP_API_HOST

export function getTasks(params = {}) {

    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                if (!tasks) return
                dispatch({type: actionTypes.GET_TASKS, tasks})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function getTask(taskId) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                if (!task) return
                dispatch({type: actionTypes.GET_TASK, task})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                if (!task) return
                dispatch({type: actionTypes.ADD_TASK, task})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function deleteTask(taskId, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then((res) => {
                if (!res) return
                dispatch({type: actionTypes.DELETE_TASK, taskId, from})
                if (from === 'single') {
                    history.push('/')
                }
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function deleteTasks(taskIds) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task`, 'PATCH', {tasks: [...taskIds]})
            .then((res) => {
                if (!res) return
                dispatch({type: actionTypes.DELETE_TASKS, taskIds})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function editTask(data, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                if (!editedTask) return
                dispatch({type: actionTypes.EDIT_TASK, editedTask, from})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function toggleDone(task, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${task._id}`, "PUT", {status: task.status})
            .then((res) => {
                if (!res) return
                dispatch({type: actionTypes.TOGGLE_DONE, task, from})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function register(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        requestWithoutToken(`${apiHost}/user`, "POST", data)
            .then(() => {
                dispatch({type: actionTypes.REGISTER})
                history.push('/login')
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function login(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        requestWithoutToken(`${apiHost}/user/sign-in`, "POST", data)
            .then((res) => {
                saveToken(res)
                dispatch({type: actionTypes.LOGIN})
                history.push('/')
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function sendContactForm(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        requestWithoutToken(`${apiHost}/form`, "POST", data)
            .then(() => {
                dispatch({type: actionTypes.SEND_CONTACT_FORM})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function getUser() {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/user`)
            .then((user) => {
                dispatch({type: actionTypes.GET_USER, user})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}

export function logout() {
    const token = localStorage.getItem('token')
    const parsed = JSON.parse(token)

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/user/sign-out`, 'POST',{jwt: parsed.jwt})
            .then(() => {
                localStorage.removeItem('token')
                dispatch({type: actionTypes.LOGOUT})
            })
            .catch((error) => {
                dispatch({type: actionTypes.ERROR, error: error.message})
            })
    }
}