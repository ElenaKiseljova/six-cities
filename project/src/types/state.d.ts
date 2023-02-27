import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { TPlaceCard } from './offers';
import { TReview } from './reviews';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  favorites: TPlaceCard[];
};

export type OffersProcess = {
  offers: TPlaceCard[];
};

export type OfferProcess = {
  offer: TPlaceCard | null;
  nearbyOffers: TPlaceCard[];
  comments: TReview[];
};

export type ServerProcess = {
  isDataLoading: boolean;
};
