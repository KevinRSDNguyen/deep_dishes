import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utility/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// import Aux from "./hoc/Auxx/Auxx";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Store from "./components/Store";
import Tags from "./components/Tags";
import AllStores from "./components/AllStores";
import AddStore from "./containers/AddStore";
import EditStore from "./containers/EditStore";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

//Check for token
if (localStorage.jwtToken) {
  try {
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    //Check for expire token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      // store.dispatch(clearCurrentProfile());
      window.location.href = "/stores";
    }
  } catch (err) {} //Try catch block n case of invalid token
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* <Route exact path="/" component={Stores} /> */}
            <div className="container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/tags" component={Tags} />
                <Route exact path="/tags/:tag" component={Tags} />
                <Route exact path="/store/:slug" component={Store} />
                <Route exact path="/add" component={AddStore} />
                <Route exact path="/stores/:id/edit" component={EditStore} />
                <Route exact path="/stores" component={AllStores} />
                {/* <Route exact path="/not-found" component={NotFound} /> */}
              </Switch>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
