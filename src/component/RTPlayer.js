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
      showTitle: false,
      currentTime: 0,
      duration: 0,
      seekTime: undefined,
      // isPlaying: true,
      muted: true,
      nubGrabbing: false,
    }
    this.handleOnTimeUpdate = this.handleOnTimeUpdate.bind(this);
    this.handleJsonContent = this.handleJsonContent.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleNubMouseUp = this.handleNubMouseUp.bind(this);
    this.handleOnSeeking = this.handleOnSeeking.bind(this);
    // this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleToggleSound = this.handleToggleSound.bind(this);
    this.handleNubMouseDown = this.handleNubMouseDown.bind(this);
    this.getThumbnailOnMouseMove = this.getThumbnailOnMouseMove.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { seekTime } = this.props;
    if(nextProps.seekTime !== seekTime){
      this.handleMouseup(nextProps.seekTime);
      this.props.getPlayStatus(true);
    }
 }

  handleMouseover() {
    this.setState({ showTitle: true });
  }

  handleMouseout() {
    this.setState({ showTitle: false });
  }

  handleOnTimeUpdate(currentTime) {
    this.setState({ currentTime });
    this.getTitle(currentTime);
    if (currentTime > this.state.duration) {
      this.props.getPlayStatus(false);
      // this.setState({ isPlaying: false });
    }
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
    console.log(content);
    this.props.getJsonContent(content);
    this.setState({ duration: content.duration });
    this.setState({ items: content.items });
  }

  handleMouseup(seekTime) {
    this.setState({
      seekTime,
    }, () => {
      this.player.setSeekTime(seekTime); // TODO: other way to set currentTime?
    });
  }

  handleOnSeeking() {
    this.setState({ seekTime: undefined });
  }

  // handleTogglePlay(isPlaying) {
  //   this.setState({ isPlaying }); 
  // }

  handleToggleSound(muted) {
    this.setState({ muted }); 
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
    if (item && item.resources) {
      const resource = item.resources.find(el => el.orientation && el.orientation === "LANDSCAPE");
      if (resource) {
        return resource.uri;
      }
    }
    return ""; 
  }

  render() {
    const {
      seekTime,
      // isPlaying,
      muted,
      currentTime,
      duration,
      nubGrabbing,
      showTitle,
      title,
      items,
    } = this.state;
    const { inAd, isPlaying, getPlayStatus } = this.props;
    return (
      <div>
        <div className={`video-bg ${showTitle ? 'dimmed' : ''}`}>
          <Title showTitle={showTitle} title={title} />
        </div>
        {/* for full screen show */}
        <div className={`player`}> 
          <Player
            ref={(el) => {this.player = el;}}
            // videoProps={{}}
            onTimeUpdate={this.handleOnTimeUpdate}
            seekTime={seekTime}
            onSeeking={this.handleOnSeeking}
            isPlaying={isPlaying}
            getJsonContent={this.handleJsonContent}
            muted={muted}
          />
        </div>
        <Controls
          mouseover={this.handleMouseover}
          mouseout={this.handleMouseout}
          currentTime={currentTime}
          duration={duration}
          onMouseup={this.handleMouseup}
          getPlayStatus={getPlayStatus}
          getMuteStatus={this.handleToggleSound}
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