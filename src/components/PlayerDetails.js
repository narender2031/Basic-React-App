import React from 'react';

const PlayerDetails = ({ player }) => {
  if( player ){
    return(
      <footer>
        <div>
          <h3>{player.name}</h3>
          <ul>
            <li>
              <span>score: </span> {player.score}
            </li>
            <li>
              <span>created: </span> {player.created}
            </li>
            <li>
              <span>updated: </span> {player.updated}
            </li>
          </ul>
        </div>
      </footer>
    )
  }else{
    return(
      <footer>
        <h6 className='text-center'>Click on the player for details</h6>
      </footer>
    )
      
  }
}

export default PlayerDetails