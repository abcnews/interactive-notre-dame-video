import React from 'react';
import styles from './styles.scss';

const Scrollyteller = require('@abcnews/scrollyteller');
import Video from '@abcnews/scrollyteller-video';

// Desktop/default
let overlays = {
  overlay6: require('./overlay6.svg'),
  overlay13: require('./overlay13.svg'),
  overlay18: require('./overlay18.svg'),
  overlay25: require('./overlay25.svg'),
  overlay32: require('./overlay32.svg')
};
// TODO: update to actual video URL
let URL = 'http://mpegmedia.abc.net.au/news/video/201904/Notredame1704.mp4';

// Detect mobile url
// TODO: use actual mobile overlays and video URL
if (document.location.href.indexOf('mobile') > -1) {
  overlays = {
    overlay6: require('./overlay6.svg'),
    overlay13: require('./overlay13.svg'),
    overlay18: require('./overlay18.svg'),
    overlay25: require('./overlay25.svg'),
    overlay32: require('./overlay32.svg')
  };
  URL = 'http://mpegmedia.abc.net.au/news/video/201904/Notredame1704.mp4';
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onMarker = this.onMarker.bind(this);
    this.onTargetTimeReached = this.onTargetTimeReached.bind(this);

    this.state = {
      hasOverlay: false,
      time: 0
    };
  }

  onMarker(config, id) {
    this.setState(state => {
      const updates = {};

      if (typeof config.time !== 'undefined' && state.time !== config.time) {
        updates.hasOverlay = false;
        console.log('NEW TIME:', config.time);
      }
      if (config.time) updates.time = config.time;

      return updates;
    });
  }

  onTargetTimeReached() {
    // hide overlays
    this.setState(() => ({ hasOverlay: true }));
  }

  render() {
    const { scrollyteller } = this.props;
    const { time, hasOverlay } = this.state;

    return (
      <div className={styles.base}>
        <Scrollyteller
          panels={scrollyteller.panels}
          className={`Block is-richtext is-piecemeal ${styles.scrollyteller}`}
          panelClassName={`Block-content u-layout u-richtext`}
          onMarker={this.onMarker}>
          <Video src={URL} targetTime={time} onTargetTimeReached={this.onTargetTimeReached}>
            {Object.keys(overlays).map(key => {
              const isOverlayVisible = [`overlay${time}`, `overlay${time - 1}`, `overlay${time + 1}`].indexOf(key) > -1;
              return (
                <img
                  className={`${styles.overlay} ${hasOverlay && isOverlayVisible ? styles.visible : ''}`}
                  key={key}
                  src={overlays[key]}
                />
              );
            })}
          </Video>
        </Scrollyteller>
      </div>
    );
  }
}
