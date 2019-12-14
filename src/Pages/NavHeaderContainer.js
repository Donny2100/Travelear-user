import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import './NavHeaderContainer.css';
import {firebase, auth} from '../services'
import { NavLink, withRouter } from 'react-router-dom';
import {LogoutButton} from './Logout';
import { connect } from 'react-redux';
import withAuthentication from '../Session/withAuthentication';
import { compose } from 'recompose';
import { Actions } from '../actions/actionCreators';

class NavHeaderContainer extends Component {
  constructor(props) {
    super (props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    console.log('withauthentication component didmount');
    firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      console.log(this.props.match);
      console.log(this.props.location);
      if (this.props.location.pathname === '/signup') {
        return;
      }
      console.log("no signup");
      authUser ? Actions.authUserSet(authUser) : Actions.authUserSet(null);
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    console.log(firebase.auth.currentUser);

    return (
      <div>
        <Navbar light expand="md">
          <NavLink exact to="/"><span className='title'>TRAVELEAR</span></NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {
              firebase.auth.currentUser && (
              <NavItem className="NavItem" >
                <NavLink className="NavLink" exact to="/become-creator">Become a creator</NavLink>
              </NavItem>)
            }
              <NavItem className="NavItem" >
                <NavLink className="NavLink" exact to="/">Help</NavLink>
              </NavItem>
            {
              !firebase.auth.currentUser && (
              <NavItem className="NavItem" >
                <NavLink className="NavLink" exact to="/signup">Sign up</NavLink>
              </NavItem>)
            }
            {
              !firebase.auth.currentUser ? (
              <NavItem className="NavItem" >
                <NavLink className="NavLink" exact to="/login">Login</NavLink>
              </NavItem>) : (<NavItem><LogoutButton /></NavItem>)

            }
            </Nav>
          </Collapse>
        </Navbar>
        <hr className='hr_margin'/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

//export default connect(mapStateToProps)(NavHeaderContainer);

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
);

export default enhance(NavHeaderContainer);
