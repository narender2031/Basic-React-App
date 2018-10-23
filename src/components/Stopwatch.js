import React, {Component} from 'react'

class Stopwatch extends Component{

    state = {
        isRunning: false,
        elaspsedTime: 0,
        previousTime: 0
    };

    handleStopwatch = () => {
        this.setState( prevState => ({
            isRunning: !prevState.isRunning
        }));
        if(!this.state.isRunning){
            this.setState({previousTime: Date.now()})
        }
    };

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(),
        100);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick = () => {
        if (this.state.isRunning){
            const now = Date.now();
            this.setState( prevState => ({
                previousTime: now,
                elaspsedTime: prevState.elaspsedTime + (now - this.state.previousTime)
            }));
        }
    }
    handleRest = () => {
        this.setState({
            elaspsedTime: 0
        });
    }
    render() {
        const Secounds = Math.floor(this.state.elaspsedTime /1000)
        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <span className="stopwatch-time">{Secounds}</span>
                <button onClick={this.handleStopwatch}>
                    {this.state.isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={this.handleRest}>Reste</button>
            </div>
        )
    }
}

export default Stopwatch;