import React from "react"

import {connect} from "react-redux"

function ShowCount({value}) {
    return (
        <h2>
            Count: {value}
        </h2>
    )
}

const mapStateToProps = (state) => {
    return {
        value: state.count,
    }
}

export default connect(mapStateToProps)(ShowCount)