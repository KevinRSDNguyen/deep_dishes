import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aux from "./hoc/Auxx/Auxx";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import EditStore from "./containers/EditStore";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Aux>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Switch>
                <Route exact path="/add" component={EditStore} />
                {/* <Route exact path="/not-found" component={NotFound} /> */}
              </Switch>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </Aux>
    );
  }
}

export default App;
