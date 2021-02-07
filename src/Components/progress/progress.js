import React from 'react'

import {memo} from "react"
import {ProgressBar} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Progress = ({tasks}) => {

    const doneCount = tasks.filter((el) => el.status === 'done').length
    const percent = doneCount * 100 / tasks.length

    return (
        <>
            <ProgressBar variant="info"
                         now={tasks.length ? percent : 0}
                         label={`Done ${doneCount} 
                                      (${percent.toFixed(1)}%)`}
                         className='m-1'/>
            <ProgressBar variant="warning"
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

export default memo(Progress)