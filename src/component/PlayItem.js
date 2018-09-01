import React, { Component } from 'react';

class PlayItem extends Component {

  getImageUri = () => {
    const { item } = this.props;
    if (item && item.resources) {
      const resource = item.resources.find(el => el.orientation && el.orientation === "LANDSCAPE");
      if (resource) {
        return resource.uri;
      }
    }
    return ""; 
  }

  getTitle = () => {
    const { item } = this.props;
    if (item && item.title) {
      return item.title;
    }
    return "";
  }

  getDuration = () => {
    const { item } = this.props;
    if (item && item.duration) {
      return this.getDisplayTime(item.duration);
    }
    return 0;
  }

  getCategory = () => {
    const { item } = this.props;
    if (item && item.category) {
      return ' ' + item.category;
    }
    return "";
  }

  computeStartItem = (e) => {
    const { index, getSeekTimeIndex } = this.props;
    getSeekTimeIndex(index);
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

  computePosition = (preIndex, nextIndex, items, currentTime) => {
    nextIndex = Math.max(preIndex, nextIndex);
    if (preIndex >= 0 && items && currentTime) {
      const startTime = items && items[preIndex].startTime;
      const endTime = items && items[nextIndex].startTime-0.01;
      let duration = 0;
      if (preIndex === nextIndex) {
        duration = items[preIndex].duration;
      } else {
        duration = endTime - startTime;
      }
      const scrubWidth = this.scrub && this.scrub.clientWidth
      return scrubWidth * ((currentTime-startTime) / (duration));
    }
    return 0;
  }

  render() {
    const {
      currentPlaying,
      items,
      preIndex,
      nextIndex,
      currentTime,
    } = this.props;
    return (
      <div
        className='story-wrapper'
      >
        <div 
          className={`story ${currentPlaying ? 'selected' : ''}`}
          onClick={this.computeStartItem}
        >
          <div className={'overflower'}>
            <div className={'marker'} />
          </div>
          <div className={'v-wrap'}>
            <img src={this.getImageUri()} alt={this.getTitle()}/>
            <div className={`scrubber ${currentPlaying ? '' : 'hide'}`}>
              <div
                ref={(el) => { this.scrub = el }}
                className={'scrub'}
              >
                <div className={'scrub-full'}>
                  <div
                    className={'scrub-complete'}
                    style={{ left: this.computePosition(preIndex, nextIndex, items, currentTime) }}
                  />
                </div>
              </div>
            </div>
            <div className={'txt-center'}>
              <p className={'meta duration'}>
                {this.getCategory()}
              </p>
              <p>
                <a className={'no-pointer'}>{this.getTitle()}</a>
              </p>
              <span className="meta">
                <strong className={'duration'}>
                  {this.getDuration()}
                </strong>
              </span>
            </div>
          </div>
        </div> 
        
      </div>
    )
  }
}

export default PlayItem;
