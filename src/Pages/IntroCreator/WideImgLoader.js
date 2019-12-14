import React from 'react';
import './IntroCreator.css';

const WideImgLoader = () => (
  <div className="wideImgLoader">
    <img 
    src={`${process.env.PUBLIC_URL}/images/Capture.JPG`} alt='introImg'
    />   
  </div>
)

export default WideImgLoader;