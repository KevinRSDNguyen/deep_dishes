import React from "react";
import moment from "moment";

const StoreReviewCard = ({ review }) => {
  return (
    <div key={review._id}>
      <img src={review.author.avatar} alt="" />
      <p>{review.text}</p>
      <p>{review.author.name}</p>
      <p>
        {`★`.repeat(review.rating)}
        {`☆`.repeat(5 - review.rating)}
      </p>
      <p>{moment(review.created).fromNow()}</p>
    </div>
  );
};

export default StoreReviewCard;
