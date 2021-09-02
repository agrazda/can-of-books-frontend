import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import BestBooks from './BestBooks.js';
import Profile from './Profile.js';
import Login from './Login.js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';



class App extends React.Component {
makeRequest = async() =>{
  const {getIdTokenClaims} = this.props.auth0;
  let tokenClaims = await getIdTokenClaims();
  const jwt = tokenClaims.__raw;

  const config = {
    headers: {"Authorization": `Bearer ${jwt}` }
  };
  const serverResponse = await axios.get('http://localhost:3001/test', config);

  console.log(serverResponse);
}
  render() {
    const { user, isAuthenticated, isLoading } = this.props.auth0;
    console.log('app', user, isLoading);
    return(
      <>

        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks /> : <Login />}
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route >
              <Route exact path="/profile">
                <Profile/>
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
