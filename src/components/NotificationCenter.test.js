import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import NotificationCenter from './NotificationCenter';
import { PLAYER_ADDED, PLAYER_SCORE_UPDATED } from '../redux/actiontypes/notification';

const notifications = [
  {
    id: 2,
    type: PLAYER_SCORE_UPDATED,
    message: "Ada's score increased to 1.",
    timestamp: 2000,
    player: { id: 5, name: 'Ada' },
    read: false
  },
  {
    id: 1,
    type: PLAYER_ADDED,
    message: 'Ada joined the scoreboard.',
    timestamp: 1000,
    player: { id: 5, name: 'Ada' },
    read: true
  }
];

const render = props => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NotificationCenter
      notifications={props.notifications || []}
      markNotificationRead={props.markNotificationRead || jest.fn()}
      markAllNotificationsRead={props.markAllNotificationsRead || jest.fn()}
    />,
    div
  );
  return div;
};

describe('NotificationCenter', () => {
  it('shows the unread count and toggles the notification panel', () => {
    const div = render({ notifications });

    expect(div.querySelector('.notification-badge').textContent).toBe('1');
    expect(div.querySelector('.notification-panel')).toBeNull();

    TestUtils.Simulate.click(div.querySelector('.notification-toggle'));

    expect(div.querySelector('.notification-panel')).not.toBeNull();
    expect(div.textContent).toContain("Ada's score increased to 1.");
    expect(div.textContent).toContain('Ada joined the scoreboard.');
  });

  it('renders an empty state when no notifications exist', () => {
    const div = render({ notifications: [] });

    TestUtils.Simulate.click(div.querySelector('.notification-toggle'));

    expect(div.textContent).toContain('No notifications yet.');
    expect(div.querySelector('.notification-mark-all').disabled).toBe(true);
  });

  it('calls back when an unread notification is selected', () => {
    const markNotificationRead = jest.fn();
    const div = render({ notifications, markNotificationRead });

    TestUtils.Simulate.click(div.querySelector('.notification-toggle'));
    TestUtils.Simulate.click(div.querySelector('.notification-item.is-unread'));

    expect(markNotificationRead).toHaveBeenCalledWith(2);
  });

  it('calls back when marking all notifications read', () => {
    const markAllNotificationsRead = jest.fn();
    const div = render({ notifications, markAllNotificationsRead });

    TestUtils.Simulate.click(div.querySelector('.notification-toggle'));
    TestUtils.Simulate.click(div.querySelector('.notification-mark-all'));

    expect(markAllNotificationsRead).toHaveBeenCalled();
  });
});
