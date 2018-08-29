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
    this.handleJsonContent = this.handleJsonContent.bind(this);
    this.handleCurrentIndex = this.handleCurrentIndex.bind(this);
    this.handleSeekTime = this.handleSeekTime.bind(this);
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

  render() {
    const {
      currentIndex,
      seekTime,
      inAd,
      controlOpen,
    } = this.state;
    return (
      <div 
        className={`player-wrapper ${controlOpen ? 'control-open' : ''}`}
        onMouseOver={this.handleGlobalMouseOver}
        onMouseOut={this.handleGlobalMouseOut}
      >
        <RTPlayer 
          getJsonContent={this.handleJsonContent}
          getCurrentIndex={this.handleCurrentIndex}
          seekTime={seekTime}
          inAd={inAd}
        />
        <Playlist
          items={this.state.items}
          seekTime={this.handleSeekTime}
          currentPlayingIndex={currentIndex}
          inAd={inAd}
        />
      </div>
    )
  }
}

export default App; 