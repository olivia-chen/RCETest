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
    console.log(e, index);
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

  render() {
    const {
      currentPlaying,
    } = this.props;
    return (
      <div 
        className={`story ${currentPlaying ? 'selected' : ''}`}
        onClick={this.computeStartItem}
      >
        <div className={'overflower'}>
          <div className={'marker'} />
        </div>
        <div className={'v-wrap'}>
          <img src={this.getImageUri()} alt={this.getTitle()}/>
          <div className={'txt-center'}>
            <p>
              <a className={'no-pointer'}>{this.getTitle()}</a>
            </p>
            <span className="meta">
              <strong className={'duration'}>
                {this.getDuration()}
              </strong>
              {this.getCategory()} 
            </span>
          </div>
        </div>
      </div> 
    )
  }
}

export default PlayItem;
