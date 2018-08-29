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
      isPlaying: true,
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
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleToggleSound = this.handleToggleSound.bind(this);
    this.handleNubMouseDown = this.handleNubMouseDown.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { seekTime } = this.props;
    if(nextProps.seekTime !== seekTime){
      this.handleMouseup(nextProps.seekTime);
      this.setState({ isPlaying: true});
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
      this.setState({ isPlaying: false });
    }
  }

  getTitle(currentTime) {
    // here assume the items has been sorted by startTime
    const items = this.state.items;
    const currentIndex = items.findIndex(item => (item.startTime + item.duration) > currentTime);
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

  handleTogglePlay(isPlaying) {
    this.setState({ isPlaying }); 
  }

  handleToggleSound(muted) {
    this.setState({ muted }); 
  }

  handleNubMouseDown() {
    this.setState({ nubGrabbing: true });
  }

  handleNubMouseUp() {
    this.setState({ nubGrabbing: false });
  }

  render() {
    const {
      seekTime,
      isPlaying,
      muted,
      currentTime,
      duration,
      nubGrabbing,
      showTitle,
      title,
    } = this.state;
    const { inAd } = this.props;
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
          getPlayStatus={this.handleTogglePlay}
          getMuteStatus={this.handleToggleSound}
          isPlaying={isPlaying}
          inAd={inAd}
          onNubMouseDown={this.handleNubMouseDown}
          onNubMouseUp={this.handleNubMouseUp}
          nubGrabbing={nubGrabbing}
        />
      </div>
    )
  }
}

export default RTPlayer; 