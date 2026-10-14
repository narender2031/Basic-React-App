import * as NotificationActionType from '../actiontypes/notification';

export const addNotification = notification => ({
  type: NotificationActionType.ADD_NOTIFICATION,
  notification
});

export const markNotificationRead = id => ({
  type: NotificationActionType.MARK_NOTIFICATION_READ,
  id
});

export const markAllNotificationsRead = () => ({
  type: NotificationActionType.MARK_ALL_NOTIFICATIONS_READ
});
