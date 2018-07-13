import React, { Component } from "react";
import { connect } from "react-redux";
import { getStores } from "./../actions/storeActions";
import axios from "axios";

class Stores extends Component {
  componentDidMount() {
    this.props.getStores();
  }
  render() {
    return (
      <div>
        <h1>Stores</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStores }
)(Stores);
