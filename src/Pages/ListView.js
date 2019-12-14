import React, {Component} from 'react';
import {
  Row,
  Col,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {firestore} from '../services';
import {withRouter} from 'react-router-dom';

class ListView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match);
  
    this.state = {
      popoverOpen: false
    };
  }

  addToFavorite = () => {
    const {id} = this.props.track;
    firestore.addTrackIdToUser('favorite', id);
  }

  addToQueue = () => {
    const {id} = this.props.track;
    firestore.addTrackIdToUser('queue', id);
  }
  
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleDelete = () => {
    console.log('delete');
    const {id} = this.props.track;
    const url = this.props.match.path;
    switch (url) {
      case '/favorites':
        firestore.removeTrackIdFromUser('favorite', id);
        break;
      case '/queue':
        firestore.removeTrackIdFromUser('queue', id);
        break;
    }
  }

  render () {
    console.log(this.props.track);
    const {track} = this.props;

    let options = {  
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const url = this.props.match.path;
  
    return (
       <tr>
         <th className="left-col" >
           <h3>
            {track.recorded.toLocaleString('en-us', options)}
           </h3>
           <span>
            {track.duration} minutes 
           </span>
         </th>
         <td >
           <Row>
             <Col xs="9" className="right-col">
             <h3>
              {track.location}
             </h3>
             <span className="place">
              {track.name}
             </span>
             <br />
             <span>
               by {track.authorName}
            </span>
             </Col>
             <Col xs="3" className="end-col">
            {
              url !== '/search' &&
              <Row className="closeButton">
                <Col>
                  <Button close onClick={this.handleDelete}>
                    <span aria-hidden>
                      <FontAwesomeIcon icon="times"/>
                    </span>
                  </Button>
                </Col>
              </Row>
            }
            {
              url === '/search' &&
              <Row className="menuButton">
                <Col>
                  <Button close 
                  className="bottomBtn" 
                  id={'Popover-' + this.props.id} 
                  onClick={this.toggle}>
                    <span aria-hidden><FontAwesomeIcon icon="bars"/></span>
                  </Button>
                  <Popover 
                  placement="left" 
                  isOpen={this.state.popoverOpen} 
                  target={'Popover-' + this.props.id} 
                  toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>
                      <Button color="link" onClick={this.addToFavorite}>Add to Favorites</Button>
                    </PopoverBody>
                    <PopoverBody>
                      <Button color="link" onClick={this.addToQueue}>Add to Queue</Button>
                    </PopoverBody>
                  </Popover>
                </Col>
              </Row>
            }
             </Col>
           </Row>
         </td>
      </tr>
    ); 
  };
}

export default withRouter(ListView);