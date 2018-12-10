import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import Counter from './Counter'
import Icon from './Icon'; 

class Player extends PureComponent  {

  static propTypes = {
    updatePlayerScore: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
    name:  PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number,
    index: PropTypes.number,
    isHighScore: PropTypes.bool.isRequired
  }

  render() {
    const {name, removePlayer, score, index, updatePlayerScore, isHighScore, selectedPlayer } = this.props;
    return (
      <div className ="player">
        <span className ="player-name" onClick={() => selectedPlayer(index)}>
            <button className="remove-player" onClick={() => removePlayer(index)}>x</button>
            <Icon isHighScore={isHighScore}/>
            {name}
        </span>
        <Counter 
          score={score}
          index = {index}
          updatePlayerScore={updatePlayerScore} 
        />
      </div>
    );
  }
   
}

export default Player;