import React, {Component} from 'react';
import {Button} from 'reactstrap';
import ListViewContainer from '../ListViewContainer';
import './Favorites.css';
import {firestore} from '../../services';

class Favorites extends Component {
  state = {
    tracks: [],
  }

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.triggerChange();
    this.unsubscribe = firestore.usersSubscribe(this.triggerChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  triggerChange = async () => {
    let tracks = await firestore.getUserTracks('favorite');
    console.log(tracks.length, tracks);
    this.setState({
      tracks: tracks,
    })
  }

  addAllFavToQueue = async () => {
    console.log('add to queue');
    await firestore.addAllFavToQueue();
  }

  render () {
    const {tracks} = this.state;
    return (
      <div className="div_fav">
        <div className="div_btn">
          <Button 
            color="link" 
            className="btnAdd"
            onClick={this.addAllFavToQueue}
          >
            Add to Queue
          </Button>
        </div>
        <ListViewContainer tracks={tracks} />
      </div>
    );
  }
}

export default Favorites;