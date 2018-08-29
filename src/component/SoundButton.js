import React, { Component } from 'react';

class SoundButton extends Component {
  constructor() {
    super();
    this.state = {
      muted: true,
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { muted } = this.props;
    if(nextProps.muted !== muted){
      this.setState({ muted: nextProps.muted });
    }
 }

  handleTogglePLay = () => {
    const { getMuteStatus } = this.props;
    const curr = !this.state.muted;
    getMuteStatus(curr);
    this.setState({ muted: curr });
  }

  render() {
    const {
      muted
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
          <use xlinkHref={muted ? '#icon-volume-off' : '#icon-volume-up'}/>
        </svg>
      </div >
    )
  }
}

export default SoundButton;
