import React, { Component } from "react";
import { Link } from "react-router-dom";
import Stores from "./../Stores";
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
    const { stores, page, pages, count } = this.props.store;
    const pagination = (
      <div>
        {page > 1 ? (
          <Link to={`/stores/page/${page - 1}`}>Previous</Link>
        ) : null}
        <p>
          Page {page} of {pages} - {count} total results
        </p>
        {page < pages ? (
          <Link to={`/stores/page/${parseFloat(page) + 1}`}>Next</Link>
        ) : null}
      </div>
    );
    return (
      <div>
        <p>All Stores</p>
        <Stores stores={stores} />
        {pagination}
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
