import React from 'react';
import {firebase} from './services';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import ContentPages from './Pages/Contents';
import {LandingPage} from './Pages/Landing';

export const LANDING = '/';
export const SIGNUP = '/signup';
export const LOGIN = '/login';
export const BECOMECREATOR = '/become-creator';
export const NEWCREATOR = '/new-creator';
export const SEARCH = '/search';
export const FAVORITES = '/favorites';
export const QUEUE = '/queue';
export const CITY = '/city';
export const MOSTPOPULAR = '/most-popular';
export const RECENTLYADDED = '/recently-added';

export const getPathname = location => {
    console.log(location.state);
    if (location.state && location.state.from) {
      return location.state.from;
    } else {
      return RECENTLYADDED;
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

class InnerLandingRoute extends React.Component {
    render() {
        const {...rest} = this.props;
        return (
            <Route {...rest} render={props => {
              console.log(firebase.auth.currentUser);
              return (
                firebase.auth.currentUser ? <ContentPages {...rest} {...props}/>
                : <LandingPage {...props} />
            )}}/>
        );
    }
}

export const LandingRoute = connect(mapStateToProps)(InnerLandingRoute);

class InnerPublicRoute extends React.Component {
    render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route {...rest} render={props => {
              console.log(props);
              return (
                !firebase.auth.currentUser ? <Component {...rest} {...props}/>
                : <Redirect to={getPathname(props.location)}/>
            )}}/>
        );
    }
}

export const PublicRoute = connect(mapStateToProps)(InnerPublicRoute);

class InnerPrivateRoute extends React.Component {
    render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route {...rest} render={props => {
                console.log(firebase.auth.currentUser);
                return (
                    !firebase.auth.currentUser ? (
                        (rest.path === LANDING) ? (<LandingPage {...props} />) : (
                        <Redirect to={{
                            pathname: LOGIN,
                            state: {
                                from: props.location
                            }
                        }}/>
                        )
                    )
                    : <Component {...rest} {...props}/>
            )}}/>
        );
    }
}

export const PrivateRoute = connect(mapStateToProps)(InnerPrivateRoute);
/*
export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        !firebase.auth.currentUser ? (
            <Redirect to={{
                pathname: LOGIN,
                state: {
                    from: props.location
                }
            }}/>
        )
        : <Component {...rest} {...props}/>
    )}/>
);
*/