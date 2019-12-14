import React, {Component} from 'react';
import {Input} from 'reactstrap';
import ListViewContainer from '../ListViewContainer';
import './Search.css';
import {firestore} from '../../services';

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class Search extends Component {
  state = {
    tracks: [],
    value: '',
  }

  timer = null

  handleChange = e => {
    clearTimeout(this.timer)
    this.setState({ value: e.target.value })
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL)
  }

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.triggerChange()
    }
  }

  triggerChange = async () => {
    const { value } = this.state;
    console.log(value);
    let tracks = await firestore.getTracks(value);
    console.log(tracks.length, tracks);
    this.setState({
      tracks: tracks,
    })
  }
    
  componentDidMount() {
    this.triggerChange();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.tracks !== this.state.tracks;
  }

  render () {
    return (
      <div className="div_search">
        <Input 
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Where would you like to go?" 
          size="lg" 
          className="inpt_search"/>
        <ListViewContainer
          tracks={this.state.tracks}
        />
      </div>
    );
  }
}

export default Search;