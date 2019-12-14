import React from 'react';
import BigCardView from '../BigCardView';
import SmallCardView from '../SmallCardView';
import './City.css';

const CityCardContainer = ({cityList}) => (
  <div>
  {
    cityList.map((item, index) => (
    index === 0 ? (
      <BigCardView
      key={index}
      city={item}
      id={index}
      />
    )
    : (
      <SmallCardView 
        key={index}
        city={item} 
        id={index} 
      />)
    )
    )
  }
  </div>
)

export default CityCardContainer;