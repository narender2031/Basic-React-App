import * as PlayerActionType from '../actiontypes/player';
import * as NotificationActionType from '../actiontypes/notification';
import { addNotification } from '../actions/notification';

const getPlayerState = state => state.player || state;

const getPlayerIdentity = player => {
  if (!player) {
    return undefined;
  }

  return {
    id: player.id,
    name: player.name
  };
};

const buildNotification = (action, previousPlayerState, nextPlayerState, timestamp) => {
  switch (action.type) {
    case PlayerActionType.ADD_PLAYER: {
      if (nextPlayerState.players.length <= previousPlayerState.players.length) {
        return null;
      }

      const player = nextPlayerState.players[nextPlayerState.players.length - 1];
      return {
        type: NotificationActionType.PLAYER_ADDED,
        message: `${player.name} joined the scoreboard.`,
        timestamp,
        player: getPlayerIdentity(player)
      };
    }

    case PlayerActionType.REMOVE_PLAYER: {
      const removedPlayer = previousPlayerState.players[action.index];
      if (!removedPlayer || nextPlayerState.players.length >= previousPlayerState.players.length) {
        return null;
      }

      return {
        type: NotificationActionType.PLAYER_REMOVED,
        message: `${removedPlayer.name} was removed from the scoreboard.`,
        timestamp,
        player: getPlayerIdentity(removedPlayer)
      };
    }

    case PlayerActionType.UPDATE_PLAYER_SCORE: {
      const previousPlayer = previousPlayerState.players[action.index];
      const nextPlayer = nextPlayerState.players[action.index];
      if (!previousPlayer || !nextPlayer || previousPlayer.score === nextPlayer.score) {
        return null;
      }

      const direction = nextPlayer.score > previousPlayer.score ? 'increased' : 'decreased';
      return {
        type: NotificationActionType.PLAYER_SCORE_UPDATED,
        message: `${nextPlayer.name}'s score ${direction} to ${nextPlayer.score}.`,
        timestamp,
        player: getPlayerIdentity(nextPlayer)
      };
    }

    default:
      return null;
  }
};

const notificationMiddleware = (clock = Date.now) => store => next => action => {
  const previousPlayerState = getPlayerState(store.getState());
  const result = next(action);

  if (
    action.type !== PlayerActionType.ADD_PLAYER &&
    action.type !== PlayerActionType.REMOVE_PLAYER &&
    action.type !== PlayerActionType.UPDATE_PLAYER_SCORE
  ) {
    return result;
  }

  const nextPlayerState = getPlayerState(store.getState());
  const notification = buildNotification(action, previousPlayerState, nextPlayerState, clock());
  if (notification) {
    store.dispatch(addNotification(notification));
  }

  return result;
};

export default notificationMiddleware;
