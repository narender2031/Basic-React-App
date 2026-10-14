import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotificationCenter extends Component {
  state = {
    isOpen: false
  };

  togglePanel = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  renderTimestamp = timestamp => {
    if (!timestamp) {
      return '';
    }

    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {
    const {notifications, markNotificationRead, markAllNotificationsRead} = this.props;
    const unreadCount = notifications.filter(notification => !notification.read).length;
    const hasNotifications = notifications.length > 0;

    return (
      <div className="notification-center">
        <button
          type="button"
          className="notification-toggle"
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
          onClick={this.togglePanel}
        >
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="notification-badge" aria-label={`${unreadCount} unread notifications`}>
              {unreadCount}
            </span>
          )}
        </button>

        {this.state.isOpen && (
          <section className="notification-panel" aria-label="Notifications">
            <div className="notification-panel-header">
              <h2>Notifications</h2>
              <button
                type="button"
                className="notification-mark-all"
                onClick={markAllNotificationsRead}
                disabled={unreadCount === 0}
              >
                Mark all read
              </button>
            </div>

            {!hasNotifications ? (
              <p className="notification-empty">No notifications yet.</p>
            ) : (
              <ul className="notification-list">
                {notifications.map(notification => (
                  <li key={notification.id}>
                    <button
                      type="button"
                      className={notification.read ? 'notification-item is-read' : 'notification-item is-unread'}
                      onClick={() => markNotificationRead(notification.id)}
                      disabled={notification.read}
                    >
                      <span className="notification-message">{notification.message}</span>
                      <time className="notification-time" dateTime={new Date(notification.timestamp).toISOString()}>
                        {this.renderTimestamp(notification.timestamp)}
                      </time>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    player: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    read: PropTypes.bool.isRequired
  })),
  markNotificationRead: PropTypes.func.isRequired,
  markAllNotificationsRead: PropTypes.func.isRequired
};

NotificationCenter.defaultProps = {
  notifications: []
};

export default NotificationCenter;
