import React, { Component } from "react";
import Aux from "./../hoc/Auxx/Auxx";
import { connect } from "react-redux";

import StoreCard from "./StoreCard";
import { getStores } from "./../actions/storeActions";

class Stores extends Component {
  componentDidMount() {
    this.props.getStores();
  }
  render() {
    const { stores } = this.props.store;
    return (
      <Aux>
        <h1>Stores</h1>
        <div className="row">
          {stores.map(store => <StoreCard key={store._id} {...store} />)}
        </div>
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
