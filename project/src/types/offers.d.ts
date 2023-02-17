import { TReview } from './reviews';
import { THost } from './host';
import { TCity } from './city';

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
  city: TCity;
  reviews: TReview[];
  bedrooms: number;
  adults: number;
  features: string[];
  host: THost;
};

export type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};
