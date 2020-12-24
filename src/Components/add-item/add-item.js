import React, {Component} from 'react'

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
        this.props.addItem(this.state.inputValue)
        this.setState({
            inputValue: ''
        })
    }

    render() {
        return (
            <>
                <input type="text"
                       placeholder='Add task...'
                       onChange={this.handleChange}
                       value={this.state.inputValue}/>

                <button onClick={this.onClick }>
                    Click to add
                </button>
            </>
        )
    }
}