import React, {Component} from 'react';
import {
  Card, 
  CardHeader, 
  CardImg, 
  CardText, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  Row, 
  Col,
  Button, 
  Popover, 
  PopoverBody,
  PopoverHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {firestore} from '../services';

class BigCardView extends Component{

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

  render() {
    const {track} = this.props;
    const strClass = this.props.category === "city" ? "BigCard" : "BigCard_Pop";
    const options = {  
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

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
        <CardImg top 
          width="100%" 
          src={track.image} 
          alt="Card image cap" />
        <Row>
          <Col sm="8">
            <CardBody>               
              <CardTitle tag="h3">
                {track.location}
              </CardTitle>
              <CardSubtitle>
                {track.name}
              </CardSubtitle>
              <CardText>
                <small className="text-muted">
                by {track.authorName}
                </small>
              </CardText>
            </CardBody>
          </Col>
          <Col sm="4" className="align_right">
            <CardBody className="text-right-custom">
              <CardTitle>
                {track.recorded.toLocaleString('en-us', options)}
              </CardTitle>
              <CardSubtitle>
                {track.duration} minutes
              </CardSubtitle>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default BigCardView;