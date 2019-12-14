import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {LandingPage} from './Pages/Landing';
import {LoginPage} from './Pages/Login';
import {SignupPage} from './Pages/Signup';
import {BecomeCreatorPage} from './Pages/IntroCreator';
import {NewCreatorPage} from './Pages/CreatorSignup';
import ContentPages from './Pages/Contents';

import './App.css';
import './helpers/font-awesome';  
import * as routes from './routes';
import {PrivateRoute, PublicRoute, LandingRoute} from './routes';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import NavHeaderContainer from './Pages/NavHeaderContainer';
import withAuthentication from './Session/withAuthentication';
/*
const store = configureStore ({
  auth: {
    isLogin: false,
    user: {},
    loading: false
  }
});
*/

export const App = props => (
  <Router>
    <div>
      <NavHeaderContainer />
      <Switch>
        <PrivateRoute path={routes.LANDING} exact component={ContentPages} {...props} />
        <PublicRoute path={routes.LOGIN} exact component={LoginPage} />
        <PublicRoute path={routes.SIGNUP} exact component={SignupPage} />
        <PrivateRoute path={routes.NEWCREATOR} exact component={NewCreatorPage} />
        <PrivateRoute path={routes.BECOMECREATOR} exact component={BecomeCreatorPage} />
        <PrivateRoute path={routes.SEARCH} exact component={ContentPages} {...props} />
        <PrivateRoute path={routes.FAVORITES} exact component={ContentPages} {...props} />
        <PrivateRoute path={routes.QUEUE} exact component={ContentPages} {...props} />
        <PrivateRoute path={routes.CITY} component={ContentPages} {...props} />
        <PrivateRoute path={routes.MOSTPOPULAR} exact component={ContentPages} {...props} />
        <PrivateRoute path={routes.RECENTLYADDED} exact component={ContentPages} {...props} />
      </Switch>
    </div>
  </Router>
);

export default App;
