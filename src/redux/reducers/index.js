import { combineReducers } from 'redux';
import player from './player';
import notification from './notification';

export default combineReducers({
  player,
  notification
});
