import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Aux from "./hoc/Auxx/Auxx";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Store from "./components/Store";
import Tags from "./components/Tags";
import Stores from "./components/Stores";
import AddStore from "./containers/AddStore";
import EditStore from "./containers/EditStore";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

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
                <Route exact path="/tags" component={Tags} />
                <Route exact path="/tags/:tag" component={Tags} />
                <Route exact path="/store/:slug" component={Store} />
                <Route exact path="/add" component={AddStore} />
                <Route exact path="/stores/:id/edit" component={EditStore} />
                <Route exact path="/stores" component={Stores} />
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
