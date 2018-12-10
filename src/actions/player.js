import * as PlayerActionType from '../actiontypes/player'

export const addPlayer = (name, score) => {
  return {
    type: PlayerActionType.ADD_PLAYER,
    name,
    score
  }
}

export const removePlayer = index => {
  return {
    type: PlayerActionType.REMOVE_PLAYER,
    index
  }
}

export const updatePlayerScore =(index, score )=> {
  return{
    type: PlayerActionType.UPDATE_PLAYER_SCORE,
    index,
    score
  }
}

export const selectPlayer = (index) => {
  return{
    type: PlayerActionType.SELECTED_PLAYER,
    index
  }
}