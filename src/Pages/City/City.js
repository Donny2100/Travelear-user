import  React,{Component} from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import CityDescription from './CityDescription';
import BigCardView from '../BigCardView';
import SmallCardView from '../SmallCardView';
import { listSubMenu } from '../../helpers/mock';
import {firestore} from '../../services';

import './City.css';

// Mock data. should be removed later
import {
  cityInfo,
  trackList
} from '../../helpers/mock';

class City extends Component {
  state = {
    tracks: [],
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let tracks = await firestore.getTracks();
    this.setState({
      tracks: tracks,
    })
  }

  render () {
    const urlCity = this.props.match.params.city;
    this.cityName = listSubMenu.find((item) => {return item.name.replace(' ', '') === urlCity}).name;
    const tracks = this.state.tracks.filter(track => {
      return track.location === this.cityName;
    })

    return (
      <div>
        <div className="card_container">
          <Row>
            <Col sm={8} className="cardList">
              {tracks.map((item, index) => (
              index === 0 ? (
                <BigCardView
                key={index}
                className="BigCard"
                track={item}
                id={index}
                category="city"
                />
              ) : (
                <SmallCardView
                key={index}
                className="SmallCard"
                track={item}
                id={index}
                category="city"
                />
              )
              ))}
            </Col>
            <Col sm={4}>
              <CityDescription 
                cityName={this.cityName}
                cityDescription={cityInfo.description}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default City;
