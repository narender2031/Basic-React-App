import * as PlayerActionType from '../actiontypes/player'

const initialState = {
  players : [
    {
    name: "Manu",
    score: 0,
    id: 1,
    created: "10/11/2018",
    updated: "10/11/2018"
    },
    {
    name: "Anku",
    score: 0,
    id: 2,
    created: "10/11/2018",
    updated: "10/11/2018"
    },
    {
    name: "Mishu",
    score: 0,
    id: 3,
    created: "10/11/2018",
    updated: "10/11/2018"
    },
    {
    name: "Druva",
    score: 0,
    id: 4,
    created: "10/11/2018",
    updated: "10/11/2018"
    }
  ],
  selectedPlayerIndex: -1
}

const prevId = 4

export default function player(state = initialState, action) {

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  switch(action.type) {
    case PlayerActionType.ADD_PLAYER: {
      const addPlayerList = [...state.players, {
        name: action.name,
        id: prevId + 1,
        score: 0,
        created: `${day}/${month}${year}`,
        updated: `${day}/${month}${year}`
      }];
      return {
        ...state,
        players: addPlayerList
      }
    }
    

    case PlayerActionType.REMOVE_PLAYER: {
      const removePlayerList = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
      return {
        ...state,
        players: removePlayerList
      }
      
    }
    

    case PlayerActionType.UPDATE_PLAYER_SCORE:{
      const updatePlayrList = state.players.map((player, index) => {
        if(index === action.index){
          return {
            ...player,
            score: player.score + action.score,
            updated: `${day}/${month}${year}`
          }
        }
        return player
      });
      return{
        ...state,
        players: updatePlayrList
      }
    }

    case PlayerActionType.SELECTED_PLAYER:
     return {
       ...state,
       selectedPlayerIndex: action.index
     }
    

    default:
    return state
  }
}