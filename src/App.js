import React, { Component } from 'react';
import Playlist from './component/Playlist';
import RTPlayer from './component/RTPlayer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      duration: 0,
      currentIndex: 0,
      seekTime: undefined,
      inAd: false,
      isPlaying: true,
      currentTime: 0,
      controlOpen: false,
      showTitle: false,
      manualUnmuted: false, 
    }
    this.showCursorTimeOut = null;
    this.hideCursor = this.hideCursor.bind(this);
    this.handleOnSeek = this.handleOnSeek.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleManualUnmute = this.handleManualUnmute.bind(this);
    this.handleSeekTime = this.handleSeekTime.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
    this.handleMouseEnterPlayer = this.handleMouseEnterPlayer.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleJsonContent = this.handleJsonContent.bind(this);
    this.handleCurrentIndex = this.handleCurrentIndex.bind(this);
    this.handleGlobalMouseMove = this.handleGlobalMouseMove.bind(this);
    this.handleGlobalMouseOver = this.handleGlobalMouseOver.bind(this);
    this.handleGlobalMouseOut = this.handleGlobalMouseOut.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleJsonContent(content) {
    this.setState({ 
      items: content.items,
      duration: content.duration,
    });
  }

  getCurrentTime(currentTime) {
    this.setState({currentTime});
  }

  handleCurrentIndex(currentIndex) {
    this.setState({ 
      currentIndex
    }); 
    const items = this.state.items;
    if (items[currentIndex].type === "AD") {
      this.setState({ inAd: true });
    } else {
      this.setState({ inAd: false });
    }
  }

  handleSeekTime(seekTime) {
    this.setState({seekTime});
  }

  handleTogglePlay(isPlaying) {
    this.setState({ isPlaying }); 
  }

  handleGlobalMouseOver() {
    this.setState({
      controlOpen: true,
    })
  }

  handleGlobalMouseOut() {
    this.setState({
      controlOpen: false,
    })
  }

  handleMouseEnterPlayer() {
    this.setState({ showTitle: true });
  }

  handleMouseout() {
    if(this.state.isPlaying === true) {
      this.setState({ showTitle: false });
    }
  }

  togglePlay() {
    const curr = this.state.isPlaying;
    this.handleTogglePlay(!curr);
  }

  handleMouseClick() {
    this.setState({ showTitle: this.state.isPlaying });
    this.togglePlay();
  }

  handleKeyUp(e) {
    if (e.keyCode === 32 || e.which === 32) {
      this.togglePlay();
    }
  }

  hideCursor() {
    document.body.style.cursor = 'none';
    this.setState({ controlOpen: false });
  }

  handleGlobalMouseMove() {
    document.body.style.cursor = 'default';
    this.setState({ controlOpen: true });
    if (this.showCursorTimeOut) {
      clearTimeout(this.showCursorTimeOut);
    }
    this.showCursorTimeOut = setTimeout(this.hideCursor, 3000);
  }

  handleManualUnmute(muted) {
    if(!muted) {
      this.setState({ manualUnmuted: true });
    }
  }

  // find the max index number less than current index
  getMaxLessIndex = (items, curr) => {
    const filteredIndex = this.getFilteredIndex(items);
    let res = -1;
    filteredIndex.forEach((item, index) => {
      if (item <= curr) {
        res = item;
      }
    });
    return res;
  }

  handleOnSeek() {
    this.setState({ seekTime: undefined });
  }

  // find the min index number greater than current index
  getMinGreaterIndex = (items, curr) => {
    const filteredIndex = this.getFilteredIndex(items);
    const res = filteredIndex.find((element) => {
      return element > curr;
    });
    return res ? res : -1;
  }

  getFilteredIndex = (items) => {
    const filteredIndex = [];
    items.forEach((item, index) => {
      if (item.title && item.type !== "TEASER" && item.type !== "MAINTITLE") {
        filteredIndex.push(index);
      }
    });
    return filteredIndex;
  }

  render() {
    const {
      currentIndex,
      seekTime,
      inAd,
      controlOpen,
      duration,
      items,
      isPlaying,
      currentTime,
      showTitle,
      manualUnmuted,
      playlistOpen,
    } = this.state;
    return (
      <div 
        className={`player-wrapper ${controlOpen ? 'control-open' : ''}`}
        onMouseOver={this.handleGlobalMouseOver}
        onMouseOut={this.handleGlobalMouseOut}
        onMouseMove={this.handleGlobalMouseMove}
        onClick={this.handleMouseClick}
      >
        <div 
          className={`pause-sign ${isPlaying ? '' : 'show'}`}
          title={isPlaying ? '' : 'play'}
        >
          <svg>
            <use xlinkHref={'#icon-play'}/>
          </svg>
        </div>
        <div 
          className={`unmute-sign ${manualUnmuted ? '' : 'show'}`}
        >
          <svg>
            <use xlinkHref={'#icon-volume-up'}/>
          </svg>
          <p>
            {'Click mute button to unmute'}
          </p>       
        </div>
        <RTPlayer 
          getJsonContent={this.handleJsonContent}
          getCurrentIndex={this.handleCurrentIndex}
          seekTime={seekTime}
          onSeek={this.handleOnSeek}
          inAd={inAd}
          getMaxLessIndex={this.getMaxLessIndex}
          isPlaying={isPlaying}
          getPlayStatus={this.handleTogglePlay}
          getCurrentTime={this.getCurrentTime}
          currentTime={currentTime}
          showTitle={showTitle}
          mouseenter={this.handleMouseEnterPlayer}
          mouseout={this.handleMouseout}
          getMuteStatus={this.handleManualUnmute}
        />
        <Playlist
          items={items}
          seekTime={this.handleSeekTime}
          currentPlayingIndex={currentIndex}
          duration={duration}
          inAd={inAd}
          getMaxLessIndex={this.getMaxLessIndex}
          getMinGreaterIndex={this.getMinGreaterIndex}
          currentTime={currentTime}
          mouseLeave={this.handleMouseLeavePlaylist}
          mouseEnter={this.handleMouseEnterPlaylist}
        />
      </div>
    )
  }
}

export default App; 