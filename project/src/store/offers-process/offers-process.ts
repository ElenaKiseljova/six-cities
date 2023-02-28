import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { OffersProcess } from '../../types/state';

import {
  fetchOffersAction,
  logoutAction,
  toggleOfferFavoriteStatusAction,
} from '../api-actions';

const initialState: OffersProcess = {
  offers: [],
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    resetFavoritesOffersFlag: (state) => {
      state.offers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));
    },
    updateOffers: (state, action: PayloadAction<TPlaceCard>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id
          ? { ...offer, isFavorite: action.payload.isFavorite }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        offersProcess.caseReducers.resetFavoritesOffersFlag(state);
      })
      .addCase(toggleOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const { data } = action.payload;

        offersProcess.caseReducers.updateOffers(state, {
          type: action.type,
          payload: data,
        });
      });
  },
});
