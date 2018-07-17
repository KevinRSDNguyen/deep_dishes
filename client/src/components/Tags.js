import React, { Component } from "react";
import classNames from "classnames";
import StoreCards from "./StoreCards";
import { connect } from "react-redux";
import { getTags, getStores, getStoresByTag } from "./../actions/storeActions";

class Tags extends Component {
  state = {
    selectedTag: "Tags"
  };
  componentDidMount() {
    this.props.getTags();
    this.props.getStores();
  }
  onTagClick = _id => {
    this.props.getStoresByTag(_id);
    this.setState({ selectedTag: _id });
  };
  render() {
    const { tags, stores, loading } = this.props.store;
    const tagButtons = tags.map(tag => {
      const tagButtonClasses = classNames(
        "btn mx-2",
        { "btn-success": this.state.selectedTag === tag._id },
        { "btn-warning": this.state.selectedTag !== tag._id }
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
        <h2>{this.state.selectedTag}</h2>
        {tagButtons}
        <StoreCards loading={loading} stores={stores} />
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
