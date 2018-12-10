import React, {Component } from 'react'
import PropTypes from 'prop-types' //check the prop-type means data type

class AddPlayerForm extends Component{
    constructor(props){
        super(props)

        this.initialState = {
            name: ''
        }

        this.state = this.initialState

    }

    PlayerInput = React.createRef();

    handleChnage = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    addPlayer = (e) => {
        e.preventDefault();
        this.props.addPlayer(this.PlayerInput.current.value);
        e.currentTarget.reset();
    }
    render() {
        return(
            <form onSubmit={this.addPlayer}>
                <input
                type="text"
                ref={this.PlayerInput}
                placeholder="Enter the player's name" 
                onChange={this.handleChnage}
                />
                <input 
                    type="submit"
                    value="Add Player"
                />
            </form>
        )
    }
}
AddPlayerForm.propTypes = {
    addPlayer: PropTypes.func.isRequired
}

export default AddPlayerForm