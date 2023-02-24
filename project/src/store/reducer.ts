import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, SORTING_VALUES } from '../const';

import { TPlaceCard } from '../types/offers';
import { TReview } from '../types/reviews';

import {
  setOffers,
  setSorting,
  requireAuthorization,
  setFavorites,
  setError,
  setDataLoadingStatus,
  setOffer,
  setNearbyOffers,
  setComments,
} from './action';

interface IState {
  offers: TPlaceCard[];
  offer: TPlaceCard | null;
  nearbyOffers: TPlaceCard[];
  comments: TReview[];
  sorting: SORTING_VALUES;
  authorizationStatus: AuthorizationStatus;
  favorites: TPlaceCard[];
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: IState = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  comments: [],
  sorting: SORTING_VALUES.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
