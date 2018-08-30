import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

const API_URL = 'https://mole.prod.reuters.tv/rest/v2/website/content/reutersnow/region/US/country/USA/duration/10';

class Player extends Component {

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { isPlaying } = this.props;
    if(nextProps.isPlaying !== isPlaying){
      nextProps.isPlaying ? this.play() : this.pause();
    }
 }
 
  componentDidMount() {
    this.request();
  }

  request = async () => {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(json);
    this.getJsonContent(json.entity);
    this.initPlayer(json.entity.stream.uri);
  }

  initPlayer = (url) => {
    if (url) {
      const { autoplay, hlsConfig } = this.props;
      const hls = new Hls(hlsConfig);

      const hlsVideo = this.hlsVideo;

      hls.loadSource(url);
      hls.attachMedia(hlsVideo);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay) {
          hlsVideo.play();
        }
      });
    }
  }

  getJsonContent = (content) => {
    this.props.getJsonContent(content);
  }

  handleOnTimeUpdate = () => {
    if (this.props.onTimeUpdate) {
      const hlsVideo = this.hlsVideo;
      const time = hlsVideo.currentTime;
      this.props.onTimeUpdate(time);
    }
  };

  play = () => {
      this.hlsVideo.play();
      // const playPromise = this.hlsVideo.play();
      // if (playPromise !== undefined) {
      //   playPromise.then( () => {
      //     // Automatic playback started!
      //     // Show playing UI.
      //     // We can now safely pause video...
      //     this.hlsVideo.pause();
      //   })
      //   .catch( (error) => {
      //     // Auto-play was prevented
      //     // Show paused UI.
      //   });
      // }
  }

  pause = () => {
    this.hlsVideo.pause();
  }

  setSeekTime(time) {
    this.hlsVideo.currentTime=time;
  }


  render() {
    const { poster, videoProps, muted, onSeeking } = this.props;
    return (
      <div className={'video-fitter'}>
        <video 
          className={'video'}
          ref={(el) => { this.hlsVideo = el }}
          poster={poster}
          muted={muted}
          onTimeUpdate={this.handleOnTimeUpdate}
          onSeeking={onSeeking}
          {...videoProps} 
        />
      </div>
    )
  }
}

Player.propTypes = {
  url: PropTypes.string,
  autoplay: PropTypes.bool,
  hlsConfig: PropTypes.object,
  poster: PropTypes.string,
  videoProps: PropTypes.object,
}

Player.defaultProps = {
  url: null,
  autoplay: true,
  hlsConfig: {},
}

export default Player;
