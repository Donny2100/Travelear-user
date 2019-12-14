import React, {Component} from 'react';
import {
  Jumbotron, 
  Button, 
  Container, 
  Row, 
  Col
} from 'reactstrap';
import {LandingCardView} from './LandingCardView';
import AudioPlayer from '../AudioPlayer';
import './Landing.css';
import {firestore, firebase} from '../../services';

class LandingContainer extends Component {
  state = {
    tracks: [],
  }

  handleSubmit = () => {
    this.props.history.push('./login');
  }

  async getTracks() {
    let tracks = await firestore.getTracksByOrder('timestamp', 1);
    console.log(tracks.length, tracks);
    this.setState({
      tracks: tracks,
    })
  }
  
  componentDidMount() {
    this.getTracks();
  }

  render() {
    const {tracks} = this.state;

    return (
      <div className='topdiv'>
        <Row className="Landing__container">
          <Col className="Landing__column">
            <Jumbotron fluid className="CustomJumbotron">
              <Container fluid>
                <h1 className="display-3">
                  LISTEN TO THE WORLD
                </h1>
                <hr className="my-2" />
                <p className="lead BoldFont">
                  What is Travelear?
                </p>
                <p>
                  It uses Utility class for typography and spaceing
                   to space containt out within the enlarger content.
                </p>
                {!firebase.auth.currentUser &&
                  <p className="lead">
                    <Button
                      color="danger" 
                      onClick={this.handleSubmit}
                    > 
                      GET STARTED
                    </Button>
                  </p>
                }
              </Container>
            </Jumbotron>
          </Col>
          <Col className="Landing__column">
            <LandingCardView />
          </Col>
        </Row>
        {
          !firebase.auth.currentUser &&
          <AudioPlayer tracks={tracks} />
        }
      </div>
    )
  }
}

export default LandingContainer;