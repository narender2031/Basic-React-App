import * as NotificationActionType from '../actiontypes/notification';

const MAX_NOTIFICATIONS = 50;

const initialState = {
  items: [],
  nextId: 1
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case NotificationActionType.ADD_NOTIFICATION: {
      const record = {
        id: state.nextId,
        type: action.notification.type,
        message: action.notification.message,
        timestamp: action.notification.timestamp,
        player: action.notification.player,
        read: false
      };

      return {
        ...state,
        nextId: state.nextId + 1,
        items: [record, ...state.items].slice(0, MAX_NOTIFICATIONS)
      };
    }

    case NotificationActionType.MARK_NOTIFICATION_READ: {
      const existing = state.items.find(item => item.id === action.id);
      if (!existing || existing.read) {
        return state;
      }

      return {
        ...state,
        items: state.items.map(item => (
          item.id === action.id ? { ...item, read: true } : item
        ))
      };
    }

    case NotificationActionType.MARK_ALL_NOTIFICATIONS_READ: {
      if (state.items.every(item => item.read)) {
        return state;
      }

      return {
        ...state,
        items: state.items.map(item => (
          item.read ? item : { ...item, read: true }
        ))
      };
    }

    default:
      return state;
  }
}
