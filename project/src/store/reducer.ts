import { createReducer } from '@reduxjs/toolkit';

import { offers } from '../mocks/offers';

import { TCity } from '../types/city';
import { TPlaceCard } from '../types/offers';

import { setCity, setOffers } from './action';

interface IState {
  city: TCity | null;
  offers: TPlaceCard[];
}

const initialState: IState = {
  city: null,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = { ...action.payload };
    })
    .addCase(setOffers, (state, action) => {
      state.offers = [...offers];
    });
});

export { reducer };
