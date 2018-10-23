import React, {Component } from 'react'
import PropTypes from 'prop-types' //check the prop-type means data type

class AddPlayerForm extends Component{
   

    PlayerInput = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPlayer(this.PlayerInput.current.value);
        e.currentTarget.reset();
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                type="text"
                ref={this.PlayerInput}
                placeholder="Enter the player's name" 
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
    index: PropTypes.number,
    score: PropTypes.number,
    changeScore: PropTypes.func

}

export default AddPlayerForm