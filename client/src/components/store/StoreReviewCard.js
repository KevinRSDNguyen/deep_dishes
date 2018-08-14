import React from "react";
import moment from "moment";

const StoreReviewCard = ({ review }) => {
  return (
    <div key={review._id} className="row my-2 border">
      <div className="col-md-2 col-3">
        <img
          src={review.author.avatar}
          className="img-fluid rounded-circle"
          alt=""
        />
        <p className="text-center">{review.author.name}</p>
      </div>

      <div className="col-md-10 col-9">
        <div className="row justify-content-around">
          <span>
            {`★`.repeat(review.rating)}
            {`☆`.repeat(5 - review.rating)}
          </span>
          <span>{moment(review.created).fromNow()}</span>
        </div>
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default StoreReviewCard;
