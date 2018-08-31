import React, { Component } from 'react';
import PlayItem from './PlayItem';

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistOpen: false,
    }
  }

  componentDidMount() {
    if (this.canvas) {
      this.updateCanvas();
    }
  }

  updateCanvas = () => {
    const { canvas } = this;
    const ctx = canvas.getContext('2d');
    const v = document.getElementById('reuters-video');
    const cw = (v && v.clientWidth) || window.innerWidth;
    const ch = (v && v.clientHeight) || window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    canvas.style.left = `-${cw - 412}px`;
    v.addEventListener('play', () => this.draw(v, ctx, cw, ch));
  }

  draw = (v, c, w, h) => {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);
    setTimeout(this.draw, 20, v, c, w, h);
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

  computeHeight = (items) => {
    const len = this.getPlayItemsLen(items);
    return len === 0 ? 0 : this.hitzone && (this.hitzone.clientHeight / len); 
  }

  computeTop = (items, currentIndex) => {
    const index = this.getPlayItemsIndex(items, currentIndex);
    const len = this.getPlayItemsLen(items);
    const top = len !== 0 && this.hitzone && ((this.hitzone.clientHeight / len) * (index));
    return top;
  }

  getPlayItemsLen = (items) => {
    const filteredItems = this.getPlayItems(items);
    const len = filteredItems && filteredItems.length;
    return len || 0;
  }

  getPlayItems = (items) => {
    const filteredItems = items && items.filter((item) => item.title && item.type !== "TEASER" && item.type !== "MAINTITLE");
    return filteredItems;
  }

  getPlayItemsIndex = (items, currentIndex) => {
    let indexMap = [];
    indexMap[0] = 0;
    let count = 0;
    items && items.map((item, index) => {
      if (item.title && item.type !== "TEASER" && item.type !== "MAINTITLE" && index > 0) {
        count = count + 1;
      }
      indexMap[index] = count;
      return indexMap;
    });
    return indexMap[currentIndex];
  }

  render() {
    const {
      items,
      currentPlayingIndex,
      inAd,
      getMinGreaterIndex,
      getMaxLessIndex,
      currentTime,
    } = this.props;
    const {
      playlistOpen,
    } = this.state;
    
    return (
      <div 
        ref={(el) => { this.hitzone = el }}
        className={`${inAd ? 'ad' : ''} hitzone ${playlistOpen ? 'playlist-open' : ''}`}
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
      >
        <div 
          className={'side-progress'} 
          style={{
            height: this.computeHeight(items),
            top: this.computeTop(items, currentPlayingIndex),
          }}
        />
        <div className={'sidebar'}>
          <canvas
            id='mycanvas'
            ref={(el) => {this.canvas = el;}}
          />
          <div
            className={'playlist-wrapper'}
          >
            <p className={'playlist-title'}>PLAYLIST</p>
              {items && items.map((item, index) => {
                if (item.title && item.type !== "TEASER" && item.type !== "MAINTITLE") {
                  return (
                    <PlayItem 
                      ref={(el) => { this.playItem = el }}
                      key={index}
                      index={index}
                      preIndex={getMaxLessIndex(items, currentPlayingIndex)}
                      nextIndex={getMinGreaterIndex(items, currentPlayingIndex)}
                      currentPlaying={currentPlayingIndex === index || getMaxLessIndex(items, currentPlayingIndex) === index}
                      item={item}
                      getSeekTimeIndex={this.handleStartTimeIndex}
                      items={items}
                      currentTime={currentTime}
                    />
                  )
                }
                return null;
              })}
            </div>
        </div>
      </div> 
    )
  }
}

export default Playlist;
