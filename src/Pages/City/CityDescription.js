import React, {Component} from 'react';
import './City.css';

class CityDescription extends Component {

  render () {
    const {cityName, cityDescription} = this.props;

    return (
      <div className="CityDescription">
        <span>Welcome to</span><br />
        <h1>{cityName}</h1>
        <p>{cityDescription}</p>
      </div>
    );
  }
}

export default CityDescription;