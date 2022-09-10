import React, { Component  } from 'react'
import './AdComponent.css';

class AdComponent extends Component {

  // componentDidMount() {
  //   (window.adsbygoogle = window.adsbygoogle || []).push({})
  // }

  render () {
  return (
    <div id='ad-component'>
      <amp-ad width="100vw" height="320"
          type="adsense"
          data-ad-client="ca-pub-6794821254855635"
          data-ad-slot="3974911901"
          data-auto-format="rspv"
          data-full-width="">
        <div overflow=""></div>
      </amp-ad>
    </div>
    );
  }
}

export default AdComponent