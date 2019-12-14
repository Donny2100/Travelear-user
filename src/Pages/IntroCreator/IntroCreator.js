import React, {Component} from 'react';
import {
  Row, 
  Col
} from 'reactstrap';
import WideImgLoader from './WideImgLoader';
import IntroPanel from './IntroPanel';
import './IntroCreator.css';

class introcreator extends Component {
  render () {
    return (
      <div className='introCreatorContainer'>
        <WideImgLoader />
        <Row>
          <Col sm={{ size: 10, order: 2, offset: 1 }}>
            <IntroPanel />
          </Col>
        </Row>
      </div>
    );
  };
}
export default introcreator;