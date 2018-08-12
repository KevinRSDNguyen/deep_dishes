import React, { Component } from "react";
import { connect } from "react-redux";
import { getStoresByHearts } from "./../../actions/storeActions";
import Stores from "./../Stores";

class HeartedStores extends Component {
  componentDidMount() {
    this.props.getStoresByHearts();
  }
  render() {
    const { stores } = this.props.store;
    return (
      <div>
        <p>Hearted Stores</p>
        <Stores stores={stores} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStoresByHearts }
)(HeartedStores);
