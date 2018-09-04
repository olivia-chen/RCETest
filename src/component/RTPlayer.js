import React, { Component } from 'react';
import Player from './Player';
import Title from './Title';
import Controls from './Controls';

class RTPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      items: [],
      duration: 0,
      seekTime: undefined,
      muted: true,
      nubGrabbing: false,
      isHideCCing: true,
    }
    this.handleOnTimeUpdate = this.handleOnTimeUpdate.bind(this);
    this.handleJsonContent = this.handleJsonContent.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleToggleCC = this.handleToggleCC.bind(this);
    this.handleNubMouseUp = this.handleNubMouseUp.bind(this);
    this.handleOnSeeking = this.handleOnSeeking.bind(this);
    this.handleToggleSound = this.handleToggleSound.bind(this);
    this.handleNubMouseDown = this.handleNubMouseDown.bind(this);
    this.getThumbnailOnMouseMove = this.getThumbnailOnMouseMove.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    
    const { seekTime } = this.props;
    if (nextProps.seekTime !== undefined && (nextProps.seekTime !== seekTime)){
      this.handleMouseup(nextProps.seekTime);
      this.props.getPlayStatus(true);
    }
 }

  handleOnTimeUpdate(currentTime) {
    this.props.getCurrentTime(currentTime);
    this.getTitle(currentTime);
  }

  handleEnded() {
    this.props.getPlayStatus(false);
  }

  getTitle(currentTime) {
    // here assume the items has been sorted by startTime
    const { items } = this.state;
    const currentIndex = items && items.findIndex(item => (item.startTime + item.duration) > (currentTime+0.001));
    if (currentIndex >= 0) {
      const currentSegment = items[currentIndex];
      this.setState({ title: currentSegment.title });
      this.props.getCurrentIndex(currentIndex);
    }
  }

  handleJsonContent(content) {
    this.props.getJsonContent(content);
    this.setState({ duration: content.duration });
    this.setState({ items: content.items });
  }

  handleMouseup(seekTime) {
    this.setState({
      seekTime,
    }, () => {
      this.player.setSeekTime(seekTime);
    });
  }

  handleOnSeeking() {
    const { onSeek } = this.props;
    this.setState({ seekTime: undefined }, () => { onSeek() });
  }

  handleToggleSound(muted) {
    this.setState({ muted }); 
    this.props.getMuteStatus(muted);
  }
  
  handleToggleCC(isHideCCing) {
    this.setState({ isHideCCing }); 
  }

  handleNubMouseDown() {
    this.setState({ nubGrabbing: true });
  }

  handleNubMouseUp() {
    this.setState({ nubGrabbing: false });
  }

  getThumbnailOnMouseMove(currentPosition, width) {
    const { 
      items,
      duration,
    } = this.state
    let seekTime = duration * (currentPosition / width);
    seekTime = Math.min(duration, seekTime);
    seekTime = Math.max(0, seekTime);
    const currentIndex = items && items.findIndex(item => (item.startTime + item.duration) > seekTime);
    const preIndex = this.props.getMaxLessIndex(items, currentIndex);
    const item = items[preIndex];
    let url = '';
    if (item && item.resources) {
      const resource = item.resources.find(el => el.orientation && el.orientation === "LANDSCAPE");
      if (resource) {
        url = `${resource.uri}&width=200`;
      }
    }
    return url; 
  }

  render() {
    const {
      seekTime,
      muted,
      duration,
      nubGrabbing,
      title,
      items,
      isHideCCing,
    } = this.state;
    const { inAd, isPlaying, getPlayStatus, currentTime, showTitle, mouseout, mouseenter } = this.props;
    return (
      <div>
        <div className={`video-bg ${showTitle ? 'dimmed' : ''}`}>
          <Title showTitle={showTitle} title={title} />
        </div>
        {/* for full screen show */}
        <div className={`player${isHideCCing ? ' cc-off' : ' cc-on'}`}> 
          <Player
            ref={(el) => {this.player = el;}}
            // videoProps={{}}
            onTimeUpdate={this.handleOnTimeUpdate}
            seekTime={seekTime}
            onSeeking={this.handleOnSeeking}
            isPlaying={isPlaying}
            getJsonContent={this.handleJsonContent}
            muted={muted}
            onEnded={this.handleEnded}
          />
        </div>
        <Controls
          mouseenter={mouseenter}
          mouseout={mouseout}
          currentTime={currentTime}
          duration={duration}
          onMouseup={this.handleMouseup}
          getPlayStatus={getPlayStatus}
          getMuteStatus={this.handleToggleSound}
          getCCStatus={this.handleToggleCC}
          isPlaying={isPlaying}
          inAd={inAd}
          onNubMouseDown={this.handleNubMouseDown}
          onNubMouseUp={this.handleNubMouseUp}
          nubGrabbing={nubGrabbing}
          items={items}
          getMaxLessIndex={this.getMaxLessIndex}
          getThumbnailOnMouseMove={this.getThumbnailOnMouseMove}
        />
      </div>
    )
  }
}

export default RTPlayer; 