import React, {Component} from 'react';
import {
  Card, 
  CardHeader, 
  CardImg, 
  CardText, 
  CardBody, 
  CardTitle,
  Button, 
  Popover, 
  PopoverBody,
  PopoverHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './general.css';
import {firestore} from '../services';

class SmallCardView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }
  
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  addToFavorite = () => {
    const {id} = this.props.track;
    firestore.addTrackIdToUser('favorite', id);
  }

  addToQueue = () => {
    const {id} = this.props.track;
    firestore.addTrackIdToUser('queue', id);
  }

  render () {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const {index} = this.props;
    const strClass = this.props.category === "city" ? "SmallCard" : "SmallCard_Pop";
    return (
      <Card className={strClass}>
        <CardHeader tag="small">
          By {this.props.track.authorName}
          <Button close className="bottomBtn" id={'Popover-' + this.props.id} onClick={this.toggle}>
            <span aria-hidden><FontAwesomeIcon icon="bars"/></span>
          </Button>
          <Popover placement="left" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
          <PopoverHeader>{this.props.track.location}</PopoverHeader>
          <PopoverBody><Button color="link" onClick={this.addToFavorite}>Add to Favorites</Button></PopoverBody>
          <PopoverBody><Button color="link" onClick={this.addToQueue}>Add to Queue</Button></PopoverBody>
          </Popover>
        </CardHeader>
        <div className='smallcardview_img'>
          <CardImg top src={this.props.track.image} alt="Card image cap" />
        </div>
        <CardBody>
        <CardTitle tag="h5">{this.props.track.location}</CardTitle>
        <CardText className="smallcardview_cardtext">{this.props.track.name}</CardText>
        <CardText className="smallcardview_cardtext_label">Recorded on {this.props.track.recorded.toLocaleString('en-us', options)}</CardText>
        <CardText>
          <small className="text-muted">{this.props.track.duration} minutes</small>
        </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default SmallCardView;