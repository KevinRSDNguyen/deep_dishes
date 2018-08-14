import React from "react";
import { Link } from "react-router-dom";

const TopStoreRow = ({ store, index }) => {
  return (
    <tr key={store.slug}>
      <td>
        <Link to={`/store/${store.slug}`}>
          <img src={store.photo} alt={store.name} style={{ width: "200px" }} />
        </Link>
      </td>
      <td>{index + 1}</td>
      <td>
        <Link to={`/store/${store.slug}`}>{store.name}</Link>
      </td>
      <td>{store.reviews.length}</td>
      <td>{`${store.averageRating && store.averageRating.toFixed(2)} / 5`}</td>
    </tr>
  );
};

export default TopStoreRow;
