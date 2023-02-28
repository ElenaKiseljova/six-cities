import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { OfferProcess } from '../../types/state';

import {
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  sendCommentAction,
  toggleOfferFavoriteStatusAction,
} from '../api-actions';

const initialState: OfferProcess = {
  offer: null,
  nearbyOffers: [],
  comments: [],
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    updateNearbyOffers: (state, action: PayloadAction<TPlaceCard>) => {
      state.nearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === action.payload.id
          ? { ...offer, isFavorite: action.payload.isFavorite }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(toggleOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.offer = data;

        offerProcess.caseReducers.updateNearbyOffers(state, {
          type: action.type,
          payload: data,
        });
      });
  },
});
