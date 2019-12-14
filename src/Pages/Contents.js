import React, {Component} from 'react';
import { Route } from "react-router-dom";
import NavSubHeaderContainer from './NavSubHeaderContainer';
import {SearchPage} from './Search';
import {CityPage} from './City';
import {QueuePage} from './Queue';
import {FavoritesPage} from './Favorites';
import {MostPopularPage} from './MostPopular';
import {RecentlyAddedPage} from './RecentlyAdded';
import * as routes from '../routes';
import AudioPlayer from './AudioPlayer';
import {firestore} from '../services';
import './general.css';
import { LandingPage } from './Landing';

class ContentPages extends Component {
  state = {
    tracks: [],
    value: '',
  }

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  async componentDidMount() {
    this.unsubscribe = firestore.usersSubscribe(this.triggerChange);

    const tracks = await firestore.getUserTracks('queue');

    this.setState({
      tracks: tracks,
    })
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

  render() {
    console.log(this.state.tracks);
    return (
      <div>
        <NavSubHeaderContainer />
        <Route path={routes.LANDING} exact component={LandingPage} />
        <Route path={routes.SEARCH} exact component={SearchPage} />
        <Route path={routes.FAVORITES} exact component={FavoritesPage} />
        <Route path={routes.QUEUE} exact component={QueuePage} />
        <Route path={`${routes.CITY}/:city`} component={CityPage} />
        <Route path={routes.MOSTPOPULAR} exact component={MostPopularPage} />
        <Route path={routes.RECENTLYADDED} exact component={RecentlyAddedPage} />
        <div className="content_margin">
        </div>
        <AudioPlayer 
          tracks={this.state.tracks}
        />
      </div>
    );
  }
}

export default ContentPages;
