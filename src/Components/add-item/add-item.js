import React, {Component} from 'react'

import './add-item.css'

export default class AddItem extends Component {

    state = {
        inputValue: ''
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    onClick = () =>{
        this.props.addTask(this.state.inputValue)
        this.setState({
            inputValue: ''
        })
    }

    render() {
        return (
            <div className="add-item d-flex">
                <input type="text"
                       placeholder='Add task...'
                       className='form-control'
                       onChange={this.handleChange}
                       value={this.state.inputValue}/>

                <button onClick={this.onClick}
                        className='btn btn-outline-secondary'>
                    Click to add
                </button>
            </div>
        )
    }
}