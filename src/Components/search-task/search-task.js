import React, {useState} from "react"

import moment from "moment"
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {getTasks} from "../store/actions"
import {Button, Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Drawer from '@material-ui/core/Drawer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faSearch} from '@fortawesome/free-solid-svg-icons'

const statusOptions = [
    {label: 'All', value: ''},
    {label: 'Active', value: 'active'},
    {label: 'Done', value: 'done'}
]

const sortOptions = [
    {label: 'All', value: ''},
    {label: 'A-Z', value: 'a-z'},
    {label: 'Z-A', value: 'z-a'},
    {label: 'Creation date oldest', value: 'creation-date-oldest'},
    {label: 'Creation date newest', value: 'creation-date-newest'},
    {label: 'Completion date oldest', value: 'completion-date-oldest'},
    {label: 'Completion date newest', value: 'completion-date-newest'}
]

const dateOptions = [
    {label: 'Created before', value: 'create_lte'},
    {label: 'Created after', value: 'create_gte'},
    {label: 'Complete before', value: 'complete_lte'},
    {label: 'Complete after', value: 'complete_gte'},
]

const SearchTask = ({getTasks}) => {

    const [status, setStatus] = useState({value: ''})
    const [sort, setSort] = useState({value: ''})
    const [search, setSearch] = useState('')
    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    })

    const handleChangeDate = (value, name) => {
        setDates({
            ...dates,
            [name]: value
        })
    }

    const handleSubmit = () => {
        const params = {}
        search && (params.search = search)
        sort.value && (params.sort = sort.value)
        status.value && (params.status = status.value)

        for (let key in dates) {
            const value = dates[key]
            if (value) {
                params[key] = moment(value).format("YYYY-MM-DD")
            }
        }

        setDrawer({...drawer, right: false})
        getTasks(params)
    }

    const clearFilters = () => {
        setStatus({value: ''})
        setSort({value: ''})
        setSearch('')
        setDates({
            create_lte: null,
            create_gte: null,
            complete_lte: null,
            complete_gte: null
        })

        setDrawer({...drawer, right: false})
        getTasks()
    }

    const [drawer, setDrawer] = useState({
        right: false,
    })

    const toggleDrawer = (open) => {
        setDrawer({...drawer, right: open})
    }

    return (
        <div className='mb-3 mt-3'>
            <InputGroup>
                <FormControl placeholder="Search..."
                             onChange={(event) => setSearch(event.target.value)}/>

                <InputGroup.Append>
                    <Button variant="outline-secondary"
                            onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                </InputGroup.Append>

                <InputGroup.Append>
                    <Button variant='outline-secondary'
                            onClick={() => toggleDrawer(true)}>
                        <FontAwesomeIcon icon={faFilter}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>

            <Drawer anchor='right'
                    open={drawer.right}
                    onClose={() => toggleDrawer(false)}>
                <DropdownButton as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={status.value ? status.label : "Status"}
                                id="input-group-dropdown-2"
                                className='m-2'>
                    {statusOptions.map((option, index) => (
                        <Dropdown.Item key={index}
                                       active={status.value === option.value}
                                       onClick={() => setStatus(option)}>
                            {option.label}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                <DropdownButton as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={sort.value ? sort.label : "Sort"}
                                id="input-group-dropdown-2"
                                className='m-2'>
                    {sortOptions.map((option, index) => (
                        <Dropdown.Item key={index}
                                       active={sort.value === option.value}
                                       onClick={() => setSort(option)}>
                            {option.label}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                {dateOptions.map((option, index) => (
                    <div key={index} className='m-1'>
                        <div>{option.label}</div>
                        <DatePicker selected={dates[option.value]}
                                    onChange={(value) => handleChangeDate(value, option.value)}/>
                    </div>
                ))}

                <div className='d-flex'>
                    <Button variant="primary"
                            onClick={handleSubmit}
                            className='m-2'>
                        Apply filters
                    </Button>
                    <Button variant="secondary"
                            onClick={clearFilters}
                            className='m-2'>
                        Clear all filters
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}

SearchTask.propTypes = {
    getTasks: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    getTasks
}

export default connect(null, mapDispatchToProps)(SearchTask)