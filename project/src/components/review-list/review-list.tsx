import { TReview } from '../../types/reviews';

import Review from '../review/review';

type TReviewListProps = {
  reviews: TReview[];
};

function ReviewList(props: TReviewListProps): JSX.Element {
  const {reviews} = props;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.map((propertyReview) => (
          <Review key={propertyReview.id} review={propertyReview} />
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
