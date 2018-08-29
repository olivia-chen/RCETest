import React, { Component } from 'react';
import PlayItem from './PlayItem';

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistOpen: false,
    }
  }
  handleStartTimeIndex = (index) => {
    const { items } = this.props;
    const startTime = items[index].startTime;
    this.props.seekTime(startTime);
  }

  handleMouseEnter = () => {
    this.setState({
      playlistOpen: true,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      playlistOpen: false,
    })
  }

  render() {
    const {
      items,
      currentPlayingIndex,
      inAd,
    } = this.props;
    const {
      playlistOpen,
    } = this.state;
    return (
      <div 
        className={`${inAd ? 'ad' : ''} hitzone ${playlistOpen ? 'playlist-open' : ''}`}
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
      >
        <div className={'side-progress'} />
        <div className={'sidebar'}>
          <p className={'playlist-title'}>Playlist</p>
            {items && items.map((item, index) => {
              if (item.title && item.type !== "TEASER" && item.type !== "MAINTITLE") {
                return (
                  <PlayItem 
                    key={index}
                    index={index}
                    currentPlaying={currentPlayingIndex === index}
                    item={item}
                    getSeekTimeIndex={this.handleStartTimeIndex}
                  />
                )
              }
              return null;
            })}
        </div>
      </div> 
    )
  }
}

export default Playlist;
