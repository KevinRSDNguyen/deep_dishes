import React, { Component } from "react";
import { connect } from "react-redux";
import { getTags } from "./../actions/storeActions";

class Tags extends Component {
  componentDidMount() {
    this.props.getTags();
  }
  render() {
    const { tags } = this.props.store;
    return (
      <div>
        <p>Tags</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getTags }
)(Tags);
