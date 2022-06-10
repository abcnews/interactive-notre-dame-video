import Scrollyteller from '@abcnews/scrollyteller';
import Video from '@abcnews/scrollyteller-video';
import React from 'react';
import styles from './styles.scss';

// Desktop/default
let overlays = {
  overlay6: `${__webpack_public_path__}overlay6.svg`,
  overlay13: `${__webpack_public_path__}overlay13.svg`,
  overlay18: `${__webpack_public_path__}overlay18.svg`,
  overlay25: `${__webpack_public_path__}overlay25.svg`,
  overlay32: `${__webpack_public_path__}overlay32.svg`
};
let URL = 'http://mpegmedia.abc.net.au/news/video/201904/hdchurchopt.mp4';

const fallbackImages = [
  {
    time: 6,
    src: `${__webpack_public_path__}fallback6.jpg`
  },
  {
    time: 13,
    src: `${__webpack_public_path__}fallback13.jpg`
  },
  {
    time: 18,
    src: `${__webpack_public_path__}fallback18.jpg`
  },
  {
    time: 25,
    src: `${__webpack_public_path__}fallback25.jpg`
  },
  {
    time: 32,
    src: `${__webpack_public_path__}fallback32.jpg`
  },
  {
    time: 38,
    src: `${__webpack_public_path__}fallback38.jpg`
  }
].reverse();

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

      if (typeof config.time !== 'undefined' && state.time !== config.time) updates.hasOverlay = false;
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
      <Scrollyteller
        panels={scrollyteller.panels}
        className={`Block is-richtext is-piecemeal ${styles.scrollyteller}`}
        panelClassName={`Block-content u-layout u-richtext ${styles.panel}`}
        onMarker={this.onMarker}
      >
        <Video src={URL} targetTime={time * 1000} onTargetTimeReached={this.onTargetTimeReached}>
          {fallbackImages.map((img, index) => {
            return (
              <img
                className={`${styles.fallbackImage} ${time <= img.time ? styles.visible : ''}`}
                key={index}
                src={img.src}
              />
            );
          })}

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
        <div className={styles.attribution}>Google Earth: Digital Globe</div>
      </Scrollyteller>
    );
  }
}
