import React, { Component } from "react";
import Stores from "./Stores";
import { connect } from "react-redux";
import { getStores } from "./../actions/storeActions";

class AllStores extends Component {
  componentDidMount() {
    this.props.getStores();
  }
  render() {
    const { stores } = this.props.store;
    return (
      <div>
        <p>All Stores</p>
        <Stores stores={stores} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store
  };
};

export default connect(
  mapStateToProps,
  { getStores }
)(AllStores);
