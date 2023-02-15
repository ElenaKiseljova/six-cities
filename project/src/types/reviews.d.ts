import { IReviewUser } from './user';

export type TReview = {
  id: string | number;
  user: IReviewUser;
  rating: number;
  text: string;
  date: string;
};

export type TReviews = {
  [offerId: string]: TReview[];
};
