import React, {Component} from 'react';
import {Button} from 'reactstrap';
import ListViewContainer from '../ListViewContainer';
import './Queue.css';
import {firestore} from '../../services';

class Queue extends Component {    
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
    console.log(this.unsubscribe);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  triggerChange = async () => {
    let tracks = await firestore.getUserTracks('queue');
    console.log(tracks.length, tracks);
    this.setState({
      tracks: tracks,
    })
  }
    
  render () {
    const {tracks} = this.state;
    return (
      <div className="div_queue">
        <span className="notshake1"></span>
        <ListViewContainer tracks={tracks} />
      </div>
    );
  }
}

export default Queue;