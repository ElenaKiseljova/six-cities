import { TPlaceCard } from './offers';

export interface IUser {
  id: string | number;
}

export interface IReviewUser extends IUser {
  name: string;
  img: string;
}

export interface ICurUser extends IUser, IReviewUser {
  email: string;
  favorites?: TPlaceCard[];
}
