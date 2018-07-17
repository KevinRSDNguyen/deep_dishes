import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTags } from "./../actions/storeActions";

class Tags extends Component {
  componentDidMount() {
    this.props.getTags();
  }
  render() {
    const { tags } = this.props.store;
    const tag = this.props.match.params.tag;
    const tagButtons = tags.map(tag => {
      return (
        <span key={tag._id}>
          <Link to={`/tags/${tag._id}`} className="btn btn-warning mx-2">
            {tag._id} {tag.count}
          </Link>
        </span>
      );
    });
    return (
      <div>
        <h2>{tag || "Tags"}</h2>
        {tagButtons}
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
