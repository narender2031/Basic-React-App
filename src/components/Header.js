import React from 'react';
import PropTypes from 'prop-types'
import Stats from './Stats';
import Stopwatch from './Stopwatch'
import NotificationCenter from './NotificationCenter';

const Header = ({ players, title, notifications, markNotificationRead, markAllNotificationsRead }) => {
    return (
        <header>
            <Stats players={players}/>
            <h1>{title}</h1>
            <div className="header-actions">
                <NotificationCenter
                    notifications={notifications}
                    markNotificationRead={markNotificationRead}
                    markAllNotificationsRead={markAllNotificationsRead}
                />
                <Stopwatch />
            </div>
        </header> 
    );
}
Header.propTypes = {
    title: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object),
    notifications: PropTypes.arrayOf(PropTypes.object),
    markNotificationRead: PropTypes.func.isRequired,
    markAllNotificationsRead: PropTypes.func.isRequired
}

Header.defaultProps = {
    notifications: []
}

export default Header;
