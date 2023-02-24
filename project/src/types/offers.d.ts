import { THost } from './host';
import { TCity } from './city';
import { TLocation } from './location';

export type TPlaceCardTypes = 'apartment' | 'room' | 'house' | 'hotel';

export type TPlaceCard = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  images: string[];
  price: number;
  rating: number;
  title: string;
  type: TPlaceCardTypes;
  isFavorite: boolean;
  city: TCity;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: THost;
  description: string[] | string;
  location: TLocation;
};

export type TPlaceCardByCity = {
  [city: string]: TPlaceCard[];
};
