
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
// import PropTypes from 'prop-types'
import * as PlayerActionCreators from '../redux/actions/player'
import * as NotificationActionCreators from '../redux/actions/notification'
import { connect } from 'react-redux';
import Header from '../components/Header';
import Player from '../components/Player';
import AddPlayerForm from '../components/AddPlayerForm';
import PlayerDetails from '../components/PlayerDetails'

class App extends Component {

  getHigthScore = players => {
    const scores = players.map(p => p.score)
    const highScore = Math.max(...scores)
    if(highScore){
      return highScore
    }else{
      return null;
    }
  }

  render() {
    const {dispatch, players, selectedPlayerIndex, notifications} = this.props;
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch);
    const selectPlayer = bindActionCreators(PlayerActionCreators.selectPlayer, dispatch);
    const markNotificationRead = bindActionCreators(NotificationActionCreators.markNotificationRead, dispatch);
    const markAllNotificationsRead = bindActionCreators(NotificationActionCreators.markAllNotificationsRead, dispatch);
    const highScore = this.getHigthScore(players);

    let selectedPlayer;
    if(selectedPlayerIndex !== -1){
      selectedPlayer = players[selectedPlayerIndex]
    }

    const playerComponents = players.map((player, index) => ( 
      <Player 
        name = {player.name} 
        score = {player.score}
        key = {index.toString()}
        index = {index}
        updatePlayerScore = {updatePlayerScore}
        removePlayer = {removePlayer}
        isHighScore = {highScore === player.score}
        selectedPlayer = {selectPlayer}
      />)
    )
    return(
      <div className="scoreboard">
        <Header  title ="My scoreboard" 
          players={players}
          isHighScore={highScore}
          notifications={notifications}
          markNotificationRead={markNotificationRead}
          markAllNotificationsRead={markAllNotificationsRead}
        />
          { playerComponents }
         <AddPlayerForm addPlayer={addPlayer}/>
         <PlayerDetails player = {selectedPlayer}/>
      </div>
    );
  }
}


const MapStateToProp = state => (
  {
    players: state.player.players,
    selectedPlayerIndex: state.player.selectedPlayerIndex,
    notifications: state.notification.items
  }
)
export default connect(MapStateToProp)(App)
// State is store the data in react. it map the how data change
