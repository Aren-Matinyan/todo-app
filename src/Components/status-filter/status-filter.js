import React from "react"

import {memo} from "react";
import {DropdownButton, Dropdown} from 'react-bootstrap'
import PropTypes from "prop-types";

const StatusFilter = ({statusFilter, changeFilter}) => {

    const buttons = [{label: "All"}, {label: "Active"}, {label: "Done"}]

    const filter = buttons.map((el) => {
        return <Dropdown.Item key={el.label}
                              onClick={() => changeFilter(el.label)}>
            {el.label}
        </Dropdown.Item>
    })

    return (
        <DropdownButton id="dropdown-basic-button"
                        title={statusFilter}
                        variant='secondary'>
            {filter}
        </DropdownButton>
    )
}

StatusFilter.propTypes = {
    statusFilter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
}

export default memo(StatusFilter)