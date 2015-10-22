import React from 'react';
import play from 'play-audio';
import Spinner from 'react-spinkit';

const audioSrc = play('http://ledjamradio.ice.infomaniak.ch/ledjamradio.mp3');

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      muted: false
    }
  }

  componentDidMount() {
    this.startPlay()
  }

  render() {
    return (
      <div className="container">
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
          <p>fork it on <a target="_blank" href="http://github.com/luandro/ledjam-radio"><img src="assets/imgs/github.svg" height="10" /> github</a></p>
          <p>app by <a target="_blank" href="http://luandro.com">Luandro</a> and streaming from <a target="_blank" href="http://www.ledjamradio.com">Ledjam Radio</a></p>
        </footer>
      </div>
    );
  }

  startPlay = () => {
    audioSrc
    .autoplay()
    .on('durationchange', () => {
      this.setState({
        loading: false
      })
    })
    .on('error', (err) => {
      console.log("err:", err);
      this.startPlay();
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

