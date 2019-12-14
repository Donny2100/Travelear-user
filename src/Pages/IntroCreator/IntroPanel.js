import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'reactstrap';
import './IntroCreator.css';

class IntroPanel extends Component {
  handleSubmit = () => {
    this.props.history.push('/new-creator');
  }
  render () {
    return (
      <div className='introPanel'>
        <div className='internal'>
          <h3> WHY BECOME A CREATOR?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor inididunt ut lavore et dolre magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamoco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
             in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className='requireList'>
            <h3>
              REQUIREMENTS
            </h3>
            <ol>
              <li>Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              <li>Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              <li>Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              <li>Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              <li>Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            </ol> 
          </div>
          <h3>READY?</h3>
          <p>
            <Button 
              color="danger" 
              onClick={this.handleSubmit}
            > 
              APPLY NOW
            </Button>
          </p>
        </div>
      </div>
    );
  };
}
export default withRouter(IntroPanel);
