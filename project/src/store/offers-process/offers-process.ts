import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { OffersProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';

import { serverProcess } from '../server-process/server-process';

const initialState: OffersProcess = {
  offers: [],
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<TPlaceCard[]>) => {
      state.offers = action.payload;
    },
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
      .addCase(fetchOffersAction.pending, () => {
        serverProcess.actions.setDataLoadingStatus(true);
      })
      .addCase(fetchOffersAction.fulfilled, (_state, action) => {
        serverProcess.actions.setDataLoadingStatus(false);

        offersProcess.actions.setOffers(action.payload);
      });
  },
});
