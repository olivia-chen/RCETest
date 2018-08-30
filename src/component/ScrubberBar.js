import React, { Component } from 'react';

class ScrubberBar extends Component {
  computePosition = (duration, currentTime) => {
    if (duration && currentTime) {
      const scrubWidth = this.scrub && this.scrub.clientWidth;
      const currentPosition = scrubWidth * (currentTime / duration);
      return currentPosition;
    }
    return undefined;
  }

  render() {
    const { duration, currentTime, onMouseDown, onScrubberBarClick, mousePosition, currentThumbnailUrl, nubGrabbing } = this.props;
    return (
      <div className={'scrubber'}>
        <div 
          ref={(el) => {this.scrub = el}}
          className={'scrub'}
          onClick={onScrubberBarClick}
        >
          <div className={'scrub-full'}>
            <div
              className={'scrub-complete'}
              style={{left: this.computePosition(duration, currentTime)}}
            />
          </div> 
            {
              !nubGrabbing && 
              <div
                className={'thumbnail'}
                style={{
                  left: mousePosition,
                }}
              >
                <img
                  src={currentThumbnailUrl}
                  alt={'thumbnail'}
                />
              </div>
            }
        </div>
        <div
          className={`nub ${nubGrabbing?'grabbing':''}`}
          onMouseDown={onMouseDown}
          style={{left: this.computePosition(duration, currentTime)}}
        />
      </div>
    )
  }
}

export default ScrubberBar;
