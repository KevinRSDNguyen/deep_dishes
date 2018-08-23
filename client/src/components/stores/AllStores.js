import React, { Component } from "react";
import Stores from "./../Stores";
import Pagination from "./../common/Pagination";
import { connect } from "react-redux";
import { getStores } from "./../../actions/storeActions";

class AllStores extends Component {
  componentDidMount() {
    const currentPage = this.props.match.params.page;
    this.props.getStores(currentPage);
  }
  componentDidUpdate(prevProps) {
    const currentPage = this.props.match.params.page;
    const newPage = prevProps.match.params.page;
    if (currentPage !== newPage) {
      this.props.getStores(currentPage);
    }
  }
  render() {
    const { stores, loading, page, pages, count } = this.props.store;
    return (
      <div>
        <h1 className="text-center my-3">All Stores</h1>
        <Stores stores={stores} loading={loading} />
        <Pagination page={page} pages={pages} count={count} />
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
