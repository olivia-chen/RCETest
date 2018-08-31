import React, { Component } from 'react';

class CCButton extends Component {
  constructor() {
    super();
    this.state = {
      isHideCCing: true,
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { isHideCCing } = this.props;
    if(nextProps.isHideCCing !== isHideCCing){
      this.setState({ isHideCCing: nextProps.isHideCCing });
    }
 }

  handleToggleCC = (e) => {
    e.stopPropagation();
    const { getCCStatus } = this.props;
    const curr = !this.state.isHideCCing;
    getCCStatus(curr);
    this.setState({ isHideCCing: curr });
  }

  render() {
    const {
      isHideCCing
    } = this.state;
    return (
      <div className={'btn-wrap'}>
        <div
          className={'clicker'}
          onClick={this.handleToggleCC}
          title={isHideCCing ? 'Closed Caption off' : 'Closed Caption on'}
        />
        <svg
          width={'36px'}
          height={'36px'}
        >
          <use xlinkHref={isHideCCing ? '#icon-closed-caption-off' : '#icon-closed-caption-on'}/>
        </svg>
      </div >
    )
  }
}

export default CCButton;
