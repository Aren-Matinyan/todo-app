export default function reducer(state = {count: 0}, action) {

    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1
            }
        case "DECREMENT":
            return {
                ...state,
                count: state.count - 1
            }
        case "RANDOM":
            return {
                ...state,
                count: state.count + action.rnd
            }
        default:
            return state
    }
}