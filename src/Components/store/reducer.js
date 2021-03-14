import * as actionTypes from './action-types'

const defaultState = {
    tasks: [],
    task: null,
    addTaskSuccess: false,
    editTaskSuccess: false,
    editTasksSuccess: false,
    deleteTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null
}

export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                editTaskSuccess: false,
                editTasksSuccess: false,
                deleteTaskSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
        }
        case actionTypes.GET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            }
        case actionTypes.GET_TASK:
            return {
                ...state,
                task: action.task,
                loading: false
            }
        case actionTypes.ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                loading: false,
                successMessage: "Task created successfully"
            }
        }
        case actionTypes.DELETE_TASK: {
            if (action.from === 'single') {
                return {
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: "Task deleted successfully"
                }
            }
            return {
                ...state,
                tasks: state.tasks.filter(el => el._id !== action.taskId),
                loading: false,
                successMessage: "Task deleted successfully"
            }
        }
        case actionTypes.DELETE_TASKS: {
            const newTask = state.tasks.filter((task) => !action.taskIds.has(task._id))

            return {
                ...state,
                tasks: newTask,
                deleteTaskSuccess: true,
                loading: false,
                successMessage: "Tasks deleted successfully"
            }
        }
        case actionTypes.EDIT_TASK: {
            if (action.from === 'single') {
                return {
                    ...state,
                    task: action.editedTask,
                    editTaskSuccess: true,
                    loading: false,
                    successMessage: "Task edited successfully"
                }
            }

            const tasks = [...state.tasks]
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id)
            tasks[foundIndex] = action.editedTask

            return {
                ...state,
                tasks,
                editTasksSuccess: true,
                loading: false,
                successMessage: "Task edited successfully"
            }
        }
        case actionTypes.TOGGLE_DONE:
            let message = ""
            action.task.status === "done" ? (message = "Task completed") : (message = "Task is active again")

            if (action.from === 'single') {
                return {
                    ...state,
                    task: action.task,
                    loading: false,
                    successMessage: message
                }
            }

            const tasks = [...state.tasks]
            const foundIndex = tasks.findIndex((task) => task._id === action.task._id)
            tasks[foundIndex] = action.task

            return {
                ...state,
                tasks,
                loading: false,
                successMessage: message
            }

        default:
            return state
    }
}