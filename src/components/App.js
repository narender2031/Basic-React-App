import React, {Component} from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players : [
      {
        name: "Manu",
        score: 0,
        id: 1
      },
      {
        name: "Anku",
        score: 0,
        id: 2
      },
      {
        name: "Mishu",
        score: 0,
        id: 3
      },
      {
        name: "Druva",
        score: 0,
        id: 4
      }
    ]
  }

  prevPlayerId= 4;

  handleRemovePlayer = (id) => {
    this.setState(prevState => ({
      players: prevState.players.filter( p => p.id !== id)
    }));
  }
  
  handleScoreChange = (index,delta) => { //arofunction
    this.setState(prevState => ({
      score: prevState.players[index].score += delta       
    }));
  }

  getHigthScore = () => {
    const scores = this.state.players.map(p => p.score)
    const highScore = Math.max(...scores)
    if(highScore){
      return highScore
    }else{
      return null;
    }
  }

  handleAddPlayer = (name) => {
    if (name) {
      this.setState(prevState => {
        return{
          players:[
            ...prevState.players,
            {
              name,
              score:0,
              id: this.prevPlayerId += 1

            }
          ]
        }; 
      })
    }else{
      return false;
    }
  }
  render() {
    const highScore = this.getHigthScore();
    return(
      <div className="scoreboard">
        <Header  title ="My scoreboard" 
          players={this.state.players}
          isHighScore={highScore}
        />
        {this.state.players.map( (player, index) => 
          <Player 
          name = {player.name} 
          score = {player.score}
          id = {player.id}
          key = {player.id.toString()}  
          index = {index}
          isHighScore = {highScore == player.score}
          removePlayer={this.handleRemovePlayer}
          changeScore={this.handleScoreChange}
          />
        )} 

         <AddPlayerForm addPlayer={this.handleAddPlayer}/>
      </div>
    );
  }
}

export default App;
// State is store the data in react. it map the how data change
