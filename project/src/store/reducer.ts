import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, SORTING_VALUES, CITIES } from '../const';

import { TCity } from '../types/city';
import { TPlaceCard } from '../types/offers';

import {
  setCity,
  setOffers,
  setNearbyOffers,
  setSorting,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
} from './action';

interface IState {
  city: TCity | undefined;
  offers: TPlaceCard[];
  nearbyOffers: TPlaceCard[];
  sorting: SORTING_VALUES;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: IState = {
  city: undefined,
  offers: [],
  nearbyOffers: [],
  sorting: SORTING_VALUES.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const cityName = action.payload;

      if (state.city?.name !== cityName) {
        if (typeof cityName === 'string') {
          const city = CITIES.find((c) => c.name === action.payload);

          state.city = city ? { ...city } : undefined;
        } else {
          state.city = cityName;
        }
      }
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
