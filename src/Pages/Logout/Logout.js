import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './Logout.css';
import { Actions } from '../../actions/actionCreators';
import {LANDING} from '../../routes';
/*
const LogoutButton = (props) =>
  <span
    onClick={async () => {
      try {
        await Actions.logout();
        this.props.history.push(LANDING);
      } catch (error) {
        console.log(error);
      }
    }}
  >
    Sign Out
  </span>
*/

//export default connect()(LogoutButton);

class LogoutButton extends Component {
  handleLogout = async () => {
    try {
      await Actions.logout();
      console.log('logout');
//      this.props.history.push(LANDING);
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    return (
      <span
        className="logout_span"
        onClick={this.handleLogout}
      >
        Sign Out
      </span>
    );
  }
}

export default withRouter(LogoutButton);
