import React from 'react';
import play from 'play-audio';
import Spinner from 'react-spinkit';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';

const audioSrc = play('http://ledjamradio.ice.infomaniak.ch/ledjamradio.mp3');

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      muted: false,
      buffer: 0
    }
  }

  componentDidMount() {
    this.startPlay()
  }

  render() {
    return (
      <div className="container">
        <div className="bar"></div>
        <div className="header">
          <img src="assets/imgs/logo.svg" /><h2 className="hidden">Ledjam Radio</h2>
        </div>
        {(this.state.loading) ? <div className="spinner"><Spinner spinnerName='three-bounce' /></div> : <div className="spinner"><Spinner spinnerName='wave' /></div>}
        <div className="controls">
          <button onClick={this.onClick}>
            <span className="hidden">Mute</span>
            {(this.state.muted) ? <img src="assets/imgs/play.svg" /> : <img src="assets/imgs/mute.svg" />}
          </button>
        </div>
        <footer>
          <p>app by <a onClick={electronOpenLinkInBrowser.bind(this)} href="http://luandro.com">Luandro</a> and streaming from <a onClick={electronOpenLinkInBrowser.bind(this)} href="http://www.ledjamradio.com">Ledjam Radio</a></p>
          <p>on <a href="https://github.com/luandro/ledjam-radio" onClick={electronOpenLinkInBrowser.bind(this, "https://github.com/luandro/ledjam-radio")}><img src="assets/imgs/github.svg" height="10" /> github</a></p>
        </footer>
      </div>
    );
  }

  restartPlay = () => {
    console.log("restarting:");
    this.setState({
      loading: true
    });
    this.startPlay();
  }
  startPlay = () => {
    console.log("playing:")
    audioSrc
    .autoplay()
    .on('durationchange', (e) => {
      if(this.state.loading === true) {
        this.setState({
          loading: false
        })
      } else {
        return
      }
    })
    .on('pause', (e) => {
      console.log("PAUSED:", e)
    })
    .on('abort', (e) => {
      console.log("ABORT:", e)
    })
    .on('ended', (e) => {
      console.log("ENDED:", e)
      this.restartPlay();
    })
    .on('progress', (e) => {
      console.log("PROGRESS:", e)
      this.setState({
        buffer: this.state.buffer + 1
      })
      console.log("this.state.buffer:", this.state.buffer)
    })
    .on('error', (err) => {
      console.log("err:", err);
      this.restartPlay();
    })
  }

  onClick = () => {
    if(this.state.muted === false) {
      this.setState({
        muted: true
      });
      audioSrc.volume(0)
    }
    else {
      this.setState({
        muted: false
      });
      audioSrc.volume(1)
    }
  }
}

