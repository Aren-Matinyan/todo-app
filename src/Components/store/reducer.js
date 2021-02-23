import * as actionTypes from './action-types'

const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    editTaskSuccess: false,
    deleteTaskSuccess: false,
    loading: false
}

export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                editTaskSuccess: false,
                deleteTaskSuccess: false
            }
        }
        case actionTypes.GET_TASKS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            }
        case actionTypes.ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                loading: false
            }
        }
        case actionTypes.DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(el => el._id !== action.taskId),
                loading: false
            }
        }
        case actionTypes.DELETE_TASKS: {
            const newTask = state.tasks.filter((task) => !action.taskIds.has(task._id))

            return {
                ...state,
                tasks: newTask,
                deleteTaskSuccess: true,
                loading: false
            }
        }
        case actionTypes.EDIT_TASK: {
            const tasks = [...state.tasks]
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id)
            tasks[foundIndex] = action.editedTask

            return {
                ...state,
                tasks,
                editTaskSuccess: true,
                loading: false
            }
        }

        default:
            return state
    }
}