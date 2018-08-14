import React, { Component } from "react";
import classNames from "classnames";
import Stores from "./../Stores";
import { connect } from "react-redux";
import {
  getTags,
  getStores,
  getStoresByTag
} from "./../../actions/storeActions";

class Tags extends Component {
  componentDidMount() {
    this.props.getTags();
    const { tag } = this.props.match.params;
    if (tag) {
      this.props.getStoresByTag(tag);
    } else {
      this.props.getStores();
    }
  }
  componentDidUpdate(prevProps) {
    const tag = this.props.match.params.tag;
    const prevTag = prevProps.match.params.tag;
    if (tag !== prevTag && tag) {
      this.props.getStoresByTag(tag);
    } else if (tag !== prevTag && !tag) {
      this.props.getStores();
    }
  }
  onTagClick = _id => {
    this.props.history.push(`/tags/${_id}`);
  };
  render() {
    const { tags, stores } = this.props.store;
    const tagParam = this.props.match.params.tag;
    const tagButtons = tags.map(tag => {
      const tagButtonClasses = classNames(
        "btn mx-2",
        { "btn-success": tagParam === tag._id },
        { "btn-warning": tagParam !== tag._id }
      );
      return (
        <button
          key={tag._id}
          className={tagButtonClasses}
          onClick={() => this.onTagClick(tag._id)}
        >
          {tag._id} {tag.count}
        </button>
      );
    });

    return (
      <div>
        <h2>{tagParam}</h2>
        {tagButtons}
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
  { getTags, getStores, getStoresByTag }
)(Tags);
