import { TUserData } from './user-data';

export type TReview = {
  id: number;
  rating: number;
  comment: string;
  date: string;
  user: TUserData;
};

export type TReviewPost = Pick<TReview, 'rating' | 'comment'>;
