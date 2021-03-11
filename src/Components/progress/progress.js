import React from 'react'

import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {ProgressBar} from 'react-bootstrap'

const Progress = ({tasks}) => {

    const doneCount = tasks.filter((el) => el.status === 'done').length
    const percent = doneCount * 100 / tasks.length

    return (
        <>
            <ProgressBar variant="warning"
                         now={tasks.length ? percent : 0}
                         label={`Done ${doneCount} 
                                      (${percent.toFixed(1)}%)`}
                         className='m-1'/>
            <ProgressBar variant="secondary"
                         now={tasks.length ? 100 - percent : 0}
                         label={`Active ${tasks.length - doneCount} 
                                        (${(100 - percent).toFixed(1)}%)`}
                         className='m-1'/>
        </>
    )
}

Progress.propTypes = {
    tasks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(Progress)