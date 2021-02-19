import React from "react"

import {connect} from "react-redux"

function ChangeCount({onIncrement, onDecrement, onRandom}) {

    return (
        <div>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={onRandom}>Random</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        onIncrement: () => {
            dispatch({type: "INCREMENT"})
        },
        onDecrement: () => {
            dispatch({type: "DECREMENT"})
        },
        onRandom: () => {
            dispatch({
                type: "RANDOM",
                rnd: Math.floor(Math.random() * 10 + 1)
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(ChangeCount)