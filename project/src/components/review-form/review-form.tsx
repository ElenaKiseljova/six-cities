import { FormEvent, ChangeEvent, useState, Fragment } from 'react';

import { TReview } from '../../types/reviews';
import { ICurUser } from '../../types/user';

type TReviewFormProps = {
  user: ICurUser;
  onSendReview: (review: TReview) => void;
}

function ReviewForm(props: TReviewFormProps): JSX.Element {
  const {user, onSendReview} = props;

  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  const stars = {
    'perfect': 5,
    'good': 4,
    'not bad': 3,
    'badly': 2,
    'terribly': 1,
  };

  const isFormReady = (): boolean => reviewText !== '' && reviewRating !== 0;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        onSendReview({
          id: new Date().toUTCString(),
          rating: reviewRating,
          text: reviewText,
          user,
          date: new Date().toISOString().split('T')[0],
        });

        setReviewRating(0);
        setReviewText('');
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(stars).map(([title, key]) => (
            <Fragment key={`star-${key}`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={key}
                id={`${key}-star`}
                type="radio"
                checked={reviewRating === key}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                  const value = Number(target.value);

                  setReviewRating(value);
                }}
              />
              <label htmlFor={`${key}-star`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          const value = target.value;

          setReviewText(value);
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormReady()}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
