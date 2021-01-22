import React from 'react'

import {ProgressBar} from 'react-bootstrap'

const Progress = ({tasks}) => {

    const doneCount = tasks.filter((el) => el.done).length
    const percent = doneCount * 100 / tasks.length

    return (
        <>
            <ProgressBar variant="info"
                         now={tasks.length ? percent : 0}
                         label={`Done ${percent.toFixed(1)}%`}
                         className='m-1'/>
            <ProgressBar variant="warning"
                         now={tasks.length ? 100 - percent : 0}
                         label={`Active ${(100 - percent).toFixed(1)}%`}
                         className='m-1'/>
        </>
    )
}

export default Progress