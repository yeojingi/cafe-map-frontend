import React, { Component  } from 'react'
import './Ads.css';

class AdComponent extends Component {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render () {
  return (
      <ins className = "adsbygoogle"
          id='ad-component'
          style = { {display:"inline-block"} }
          data-ad-client = "ca-pub-6794821254855635"
          data-ad-slot = "4625880763"
          data-ad-format="auto"
          data-full-width-responsive="true">
      </ins>
              
    );
  }
}

export default AdComponent