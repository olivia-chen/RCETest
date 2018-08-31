import React, { Component } from 'react';
import ScrubberBar from './ScrubberBar';
import PlayButton from './PlayButton';
import SoundButton from './SoundButton';
import CCButton from './CCButton';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.currentTime,
      mousePosition: 0,
      currentThumbnailUrl: "",
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { currentTime } = this.props;
    if(currentTime !== nextProps.currentTime){
      this.setState({ currentTime: nextProps.currentTime });
    }
 }

  getDisplayTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    let ret = "";
    if (hours > 0) {
        ret += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }
    ret += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    ret += "" + seconds;
    
    return ret;
  }

  computeSeekTime = (e, inAd) => {
    e.stopPropagation();
    if (!inAd) {
      const { duration, onMouseup } = this.props;
      let seekTime = duration * ((e.clientX - 198) / this.scrubberBar.scrub.clientWidth);
      seekTime = Math.min(duration, seekTime);
      seekTime = Math.max(0, seekTime);
      this.setState({ currentTime: seekTime });
      onMouseup(seekTime);
    }
  }

  handleMouseMove = (e) => {
    const { nubGrabbing } = this.props;
    if (nubGrabbing === true) {
      this.computeSeekTime(e)
    } 
    const url = this.props.getThumbnailOnMouseMove(e.clientX - 198, this.scrubberBar.scrub.clientWidth);
    this.setState({
      mousePosition: e.clientX - 198,
      currentThumbnailUrl: url,
    });
  }

  handleControlClick = (e) => {
    e.stopPropagation();
  }

  render() {
    const { 
      duration, 
      onMouseup, 
      getPlayStatus, 
      mouseenter, 
      mouseout, 
      getMuteStatus,
      getCCStatus,
      isPlaying, 
      inAd, 
      onNubMouseDown, 
      onNubMouseUp,
      nubGrabbing,
    } = this.props;

    const { 
      currentTime,
      mousePosition,
      currentThumbnailUrl,
    } = this.state;
    return (
      <div
        ref={(el) => { this.hitbox = el }}
        className={'control-hitbox'} // for ad playing, forbid displaying control bar
        onMouseEnter={mouseenter}
        onMouseOut={mouseout}
        onMouseMove={this.handleMouseMove}
        onMouseUp={onNubMouseUp}
        onMouseLeave={onNubMouseUp}
      >
        <div 
          className={'control-wrapper'}
          onClick={this.handleControlClick}
        >
          <PlayButton 
            getPlayStatus={getPlayStatus}
            isPlaying={isPlaying}
          />
          <SoundButton 
            getMuteStatus={getMuteStatus}
          />
          <div className={'timer'}>
            <span>{this.getDisplayTime(currentTime)}</span>
          </div>
          <ScrubberBar
            ref={(el) => {this.scrubberBar = el}}
            currentTime={currentTime}
            duration={duration}
            onMouseup={onMouseup}
            onMouseDown={onNubMouseDown}
            onScrubberBarClick={e => this.computeSeekTime(e, inAd)}
            mousePosition={mousePosition}
            currentThumbnailUrl={currentThumbnailUrl}
            nubGrabbing={nubGrabbing}
            inAd={inAd}
          />
          <div className={'runtime'}>
            <span>{this.getDisplayTime(duration)}</span>
          </div>
          <CCButton 
            getCCStatus={getCCStatus}
          />
        </div>
      </div>
    )
  }
}

export default Controls;
