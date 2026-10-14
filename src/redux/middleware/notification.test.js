import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import notificationMiddleware from './notification';
import { addPlayer, removePlayer, selectPlayer, updatePlayerScore } from '../actions/player';
import { addNotification, markAllNotificationsRead } from '../actions/notification';
import {
  PLAYER_ADDED,
  PLAYER_REMOVED,
  PLAYER_SCORE_UPDATED
} from '../actiontypes/notification';

const createNotificationStore = () => {
  const timestamps = [1000, 2000, 3000, 4000];
  const clock = jest.fn(() => timestamps.shift());
  return {
    store: createStore(rootReducer, applyMiddleware(notificationMiddleware(clock))),
    clock
  };
};

describe('notification middleware', () => {
  it('emits a notification after a player is added successfully', () => {
    const { store } = createNotificationStore();

    store.dispatch(addPlayer('Ada'));

    expect(store.getState().notification.items[0]).toMatchObject({
      type: PLAYER_ADDED,
      message: 'Ada joined the scoreboard.',
      timestamp: 1000,
      player: { name: 'Ada' },
      read: false
    });
  });

  it('uses pre-removal player data for remove notifications', () => {
    const { store } = createNotificationStore();

    store.dispatch(removePlayer(0));

    expect(store.getState().notification.items[0]).toMatchObject({
      type: PLAYER_REMOVED,
      message: 'Manu was removed from the scoreboard.',
      timestamp: 1000,
      player: { id: 1, name: 'Manu' }
    });
  });

  it('uses post-update score data for score notifications', () => {
    const { store } = createNotificationStore();

    store.dispatch(updatePlayerScore(1, 1));
    store.dispatch(updatePlayerScore(1, -1));

    expect(store.getState().notification.items[1]).toMatchObject({
      type: PLAYER_SCORE_UPDATED,
      message: "Anku's score increased to 1.",
      timestamp: 1000,
      player: { id: 2, name: 'Anku' }
    });
    expect(store.getState().notification.items[0]).toMatchObject({
      type: PLAYER_SCORE_UPDATED,
      message: "Anku's score decreased to 0.",
      timestamp: 2000,
      player: { id: 2, name: 'Anku' }
    });
  });

  it('ignores selected-player and notification actions', () => {
    const { store, clock } = createNotificationStore();

    store.dispatch(selectPlayer(0));
    store.dispatch(addNotification({
      type: PLAYER_ADDED,
      message: 'Manual notification.',
      timestamp: 55,
      player: { id: 99, name: 'Manual' }
    }));
    store.dispatch(markAllNotificationsRead());

    expect(clock).not.toHaveBeenCalled();
    expect(store.getState().notification.items).toHaveLength(1);
    expect(store.getState().notification.items[0].message).toBe('Manual notification.');
  });

  it('does not recurse when dispatching the derived notification action', () => {
    const { store } = createNotificationStore();

    store.dispatch(addPlayer('Grace'));

    expect(store.getState().notification.items).toHaveLength(1);
  });
});
