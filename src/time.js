import React from 'react'

class Timer extends React.Component {
  state = {
    currentTimeStamp: new Date(),
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTimeStamp: new Date()
    });
  }

  render () {
    return (
      <div>
        {this.state.currentTimeStamp.toLocaleTimeString()}
      </div>
    )
  }
}

export default Timer;
