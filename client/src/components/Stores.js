import React, { Component } from "react";
import Aux from "./../hoc/Auxx/Auxx";
import { connect } from "react-redux";
import StoreCards from "./StoreCards";
import { getStores } from "./../actions/storeActions";

class Stores extends Component {
  componentDidMount() {
    this.props.getStores();
  }
  render() {
    const { stores, loading } = this.props.store;
    return (
      <Aux>
        <h1>Stores</h1>
        <StoreCards stores={stores} loading={loading} />
      </Aux>
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
