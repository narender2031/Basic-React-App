import React from 'react'


const Counter  = ({score, index, updatePlayerScore}) => {

  return (
    <div className ="counter">
      <button className ="counter-action decrement" onClick={() => updatePlayerScore(index,-1)}> - </button>
        <span className ="counter-score">{score}</span>
      <button className ="counter-action increment"  onClick={() => updatePlayerScore(index,1)}> + </button>
    </div>
  );
    
}

export default Counter;