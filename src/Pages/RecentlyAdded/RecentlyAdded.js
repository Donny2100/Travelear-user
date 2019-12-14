import  React, {Component} from 'react';
import {
  Row, 
  Col
} from 'reactstrap';
import BigCardView from '../BigCardView';
import SmallCardView from '../SmallCardView';
import './RecentlyAdded.css';

//mockup data, need to be removed in the future
import {
  trackList
} from '../../helpers/mock';
import {firestore} from '../../services';

class recentlyadded extends Component {
  state = {
    tracks: [],
  }

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.triggerChange();
    this.unsubscribe = firestore.tracksSubscribe(this.triggerChange);
    console.log(this.unsubscribe);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  triggerChange = async () => {
    let tracks = await firestore.getTracksByOrder('plays', 10);
    console.log(tracks.length, tracks);
    this.setState({
      tracks: tracks,
    })
  }

  render () {
    const {tracks} = this.state;
    console.log(tracks);
    return (
      <div>
        <div className="card_container">
          <Row>
          <Col className="cardList">
            {tracks.map((item, index) => (
            index === 0 ? (
              <BigCardView 
              track={item} 
              id={index} 
              key={index} 
              category="other" />
            ) :
            (
              <SmallCardView 
              pos={index % 3}
              track={item} 
              id={index} 
              key={index} 
              category="other" 
              />) 
            ))}
          </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default recentlyadded;
