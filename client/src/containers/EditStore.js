import React, { Component } from "react";
import StoreForm from "./StoreForm";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "./../actions/storeActions";

class EditStore extends Component {
  state = {
    name: "",
    description: "",
    tags: []
  };
  componentDidMount() {
    this.props.getStore(this.props.match.params.id);
  }

  onSubmit = store => {
    axios
      .post(`/api/stores/${this.props.match.params.id}/edit`, store)
      .then(res => {
        console.log(res.data);
        // this.props.getStore(this.props.match.params.id);
      });
  };
  render() {
    return (
      <div>
        <h1>Edit Store</h1>
        {this.props.store.store ? (
          <StoreForm onSubmit={this.onSubmit} store={this.props.store.store} />
        ) : (
          <p>please hold</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStore }
)(EditStore);
