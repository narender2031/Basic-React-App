import notification from './notification';
import {
  addNotification,
  markAllNotificationsRead,
  markNotificationRead
} from '../actions/notification';
import { PLAYER_ADDED, PLAYER_REMOVED } from '../actiontypes/notification';

const makeNotification = index => ({
  type: PLAYER_ADDED,
  message: `Notification ${index}`,
  timestamp: 1000 + index,
  player: { id: index, name: `Player ${index}` }
});

describe('notification reducer', () => {
  it('prepends notification records with stable metadata and unread state', () => {
    const state = notification(undefined, addNotification({
      type: PLAYER_ADDED,
      message: 'Ada joined the scoreboard.',
      timestamp: 12345,
      player: { id: 7, name: 'Ada' }
    }));

    expect(state.items).toEqual([{
      id: 1,
      type: PLAYER_ADDED,
      message: 'Ada joined the scoreboard.',
      timestamp: 12345,
      player: { id: 7, name: 'Ada' },
      read: false
    }]);
    expect(state.nextId).toBe(2);
  });

  it('keeps notifications newest first and caps history at 50 records', () => {
    const state = Array.from({ length: 55 }, (_, index) => index + 1).reduce(
      (nextState, index) => notification(nextState, addNotification(makeNotification(index))),
      undefined
    );

    expect(state.items).toHaveLength(50);
    expect(state.items[0].message).toBe('Notification 55');
    expect(state.items[49].message).toBe('Notification 6');
    expect(state.nextId).toBe(56);
  });

  it('marks one notification read without mutating other records', () => {
    const unreadState = notification(
      notification(undefined, addNotification(makeNotification(1))),
      addNotification({ ...makeNotification(2), type: PLAYER_REMOVED })
    );

    const readState = notification(unreadState, markNotificationRead(1));

    expect(readState).not.toBe(unreadState);
    expect(readState.items.find(item => item.id === 1).read).toBe(true);
    expect(readState.items.find(item => item.id === 2).read).toBe(false);
    expect(unreadState.items.find(item => item.id === 1).read).toBe(false);
  });

  it('returns the same state when marking an already-read or unknown notification', () => {
    const unreadState = notification(undefined, addNotification(makeNotification(1)));
    const readState = notification(unreadState, markNotificationRead(1));

    expect(notification(readState, markNotificationRead(1))).toBe(readState);
    expect(notification(readState, markNotificationRead(999))).toBe(readState);
  });

  it('marks all notifications read idempotently', () => {
    const unreadState = notification(
      notification(undefined, addNotification(makeNotification(1))),
      addNotification(makeNotification(2))
    );

    const readState = notification(unreadState, markAllNotificationsRead());

    expect(readState.items.every(item => item.read)).toBe(true);
    expect(notification(readState, markAllNotificationsRead())).toBe(readState);
  });
});
