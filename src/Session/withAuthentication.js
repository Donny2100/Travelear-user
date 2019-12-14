import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../actions/actionCreators';

import { firebase } from '../services';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      console.log('withauthentication component didmount');
      firebase.auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        authUser
          ? Actions.authUserSet(authUser)
          : Actions.authUserSet(null);
      });
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;