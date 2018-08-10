import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Store from "./components/store/Store";
import Tags from "./components/Tags";
import AllStores from "./components/AllStores";
import AddStore from "./containers/AddStore";
import EditStore from "./containers/EditStore";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.auth();
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Route exact path="/" component={Stores} /> */}
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/tags" component={Tags} />
            <Route exact path="/tags/:tag" component={Tags} />
            <Route exact path="/store/:slug" component={Store} />
            <PrivateRoute exact path="/add" component={AddStore} />
            <Route exact path="/stores/:id/edit" component={EditStore} />
            <Route exact path="/stores" component={AllStores} />
            {/* <Route exact path="/not-found" component={NotFound} /> */}
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { auth }
  )(App)
);
