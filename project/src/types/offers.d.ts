import { TReview } from './reviews';
import { THost } from './host';

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
  bedrooms: number;
  adults: number;
  features: string[];
  host: THost;
  map: [number, number];
};

export type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};
