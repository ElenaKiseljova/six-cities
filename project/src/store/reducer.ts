import { createReducer } from '@reduxjs/toolkit';

import { cities } from '../mocks/cities';

import { AuthorizationStatus, SORTING_VALUES } from '../const';

import { TCity } from '../types/city';
import { TPlaceCard } from '../types/offers';

import {
  setCity,
  setOffers,
  setNearbyOffers,
  setSorting,
  requireAuthorization,
} from './action';

interface IState {
  city: TCity | undefined;
  offers: TPlaceCard[];
  nearbyOffers: TPlaceCard[];
  sorting: SORTING_VALUES;
  authorizationStatus: AuthorizationStatus;
}

const initialState: IState = {
  city: undefined,
  offers: [],
  nearbyOffers: [],
  sorting: SORTING_VALUES.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const cityName = action.payload;

      if (state.city?.title !== cityName) {
        if (typeof cityName === 'string') {
          const city = cities.find((c) => c.title === action.payload);

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
    });
});

export { reducer };
