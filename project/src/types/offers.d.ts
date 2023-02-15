import { TReview } from './reviews';

export type TPlaceCard = {
  id: string;
  isPremium: boolean;
  cardImg: string;
  imgs: string[];
  price: number;
  rating: number;
  title: string;
  type: 'Private room' | 'Apartment';
  inFavorites: boolean;
  city: string;
  reviews: TReview[];
};

export type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};
