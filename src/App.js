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
    }
    this.showCursorTimeOut = null;
    this.handleJsonContent = this.handleJsonContent.bind(this);
    this.handleCurrentIndex = this.handleCurrentIndex.bind(this);
    this.handleSeekTime = this.handleSeekTime.bind(this);
    this.handleGlobalMouseMove = this.handleGlobalMouseMove.bind(this);
    this.hideCursor = this.hideCursor.bind(this);
    this.handleGlobalMouseOver = this.handleGlobalMouseOver.bind(this);
    this.handleGlobalMouseOut = this.handleGlobalMouseOut.bind(this);
  }


  handleJsonContent(content) {
    this.setState({ 
      items: content.items,
      duration: content.duration,
    });
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

  // find the max index number less than current index
  getMaxLessIndex = (items, curr) => {
    const filteredIndex = [];
    items.forEach((item, index) => {
      if (item.title && item.type !== "TEASER" && item.type !== "MAINTITLE") {
        filteredIndex.push(index);
      }
    });
    let res = -1;
    filteredIndex.forEach((item, index) => {
      if (item <= curr) {
        res = item;
      }
    });
    return res;
  }

  render() {
    const {
      currentIndex,
      seekTime,
      inAd,
      controlOpen,
      duration,
      items,
    } = this.state;
    return (
      <div 
        className={`player-wrapper ${controlOpen ? 'control-open' : ''}`}
        onMouseOver={this.handleGlobalMouseOver}
        onMouseOut={this.handleGlobalMouseOut}
        onMouseMove={this.handleGlobalMouseMove}
      >
        <RTPlayer 
          getJsonContent={this.handleJsonContent}
          getCurrentIndex={this.handleCurrentIndex}
          seekTime={seekTime}
          inAd={inAd}
          getMaxLessIndex={this.getMaxLessIndex}
        />
        <Playlist
          items={items}
          seekTime={this.handleSeekTime}
          currentPlayingIndex={currentIndex}
          duration={duration}
          inAd={inAd}
          getMaxLessIndex={this.getMaxLessIndex}
        />
      </div>
    )
  }
}

export default App; 