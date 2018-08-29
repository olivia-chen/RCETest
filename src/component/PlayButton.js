import React, { Component } from 'react';

class PlayButton extends Component {
  constructor() {
    super();
    this.state = {
      isPlaying: true,
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { isPlaying } = this.props;
    if(nextProps.isPlaying !== isPlaying){
      this.setState({ isPlaying: nextProps.isPlaying });
    }
 }

  handleTogglePLay = () => {
    const { getPlayStatus } = this.props;
    const curr = !this.state.isPlaying;
    getPlayStatus(curr);
    this.setState({ isPlaying: curr });
  }

  render() {
    const {
      isPlaying
    } = this.state;
    return (
      <div className={'btn-wrap'}>
        <div
          className={'clicker'}
          onClick={this.handleTogglePLay}
        />
        <svg
          width={'36px'}
          height={'36px'}
          fill={'white'}
        >
          <use xlinkHref={isPlaying ? '#icon-pause' : '#icon-play'}/>
        </svg>
      </div >
    )
  }
}

export default PlayButton;
