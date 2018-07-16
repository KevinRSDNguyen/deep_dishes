import React, { Component } from "react";
import { connect } from "react-redux";
import { getStoreBySlug } from "./../actions/storeActions";

class Store extends Component {
  componentDidMount() {
    this.props.getStoreBySlug();
  }
  render() {
    return (
      <div>
        <p>Store component!</p>
      </div>
    );
  }
}

export default connect(
  null,
  { getStoreBySlug }
)(Store);
