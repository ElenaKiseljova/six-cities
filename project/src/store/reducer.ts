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
  setError,
} from './action';

interface IState {
  cities: TCity[];
  city: TCity | undefined;
  offers: TPlaceCard[];
  nearbyOffers: TPlaceCard[];
  sorting: SORTING_VALUES;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: IState = {
  cities: [
    { title: 'Amsterdam', lat: 52.321, lng: 4.878, zoom: 10 },
    { title: 'Paris', lat: 48.805, lng: 2.351, zoom: 10 },
    { title: 'Cologne', lat: 50.9341, lng: 6.9605, zoom: 10 },
    { title: 'Brussels', lat: 50.855103, lng: 4.3053775, zoom: 10 },
    {
      title: 'Hamburg',
      lat: 53.58495986131881,
      lng: 9.994421266529852,
      zoom: 10,
    },
    { title: 'Dusseldorf', lat: 51.2383711, lng: 6.6742673, zoom: 10 },
  ],
  city: undefined,
  offers: [],
  nearbyOffers: [],
  sorting: SORTING_VALUES.POPULAR,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
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
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
