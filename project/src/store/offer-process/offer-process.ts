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
      state.nearbyOffers = state.nearbyOffers.map((o) =>
        o.id === action.payload.id
          ? { ...o, isFavorite: action.payload.isFavorite }
          : o
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
        const { data, status } = action.payload;

        state.offer = {
          ...state.offer,
          isFavorite: status === 1,
        } as TPlaceCard;

        offerProcess.caseReducers.updateNearbyOffers(state, {
          type: action.type,
          payload: data,
        });
      });
  },
});
