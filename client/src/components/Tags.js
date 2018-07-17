import React, { Component } from "react";
import Spinner from "./Spinner/Spinner";
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
      return (
        <button
          key={tag._id}
          className="btn btn-warning mx-2"
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
