import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { TReview } from '../../types/reviews';
import { OfferProcess } from '../../types/state';

import {
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  sendCommentAction,
  toggleOfferFavoriteStatusAction,
} from '../api-actions';

import { offersProcess } from '../offers-process/offers-process';
import { serverProcess } from '../server-process/server-process';
import { userProcess } from '../user-process/user-process';

const initialState: OfferProcess = {
  offer: null,
  nearbyOffers: [],
  comments: [],
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<TPlaceCard | null>) => {
      state.offer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<TPlaceCard[]>) => {
      state.nearbyOffers = action.payload;
    },
    updateNearbyOffers: (state, action: PayloadAction<TPlaceCard>) => {
      state.nearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === action.payload.id
          ? { ...offer, isFavorite: action.payload.isFavorite }
          : offer
      );
    },
    setComments: (state, action: PayloadAction<TReview[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, () => {
        serverProcess.actions.setDataLoadingStatus(true);
      })
      .addCase(fetchOfferAction.fulfilled, (_state, action) => {
        serverProcess.actions.setDataLoadingStatus(false);

        offerProcess.actions.setOffer(action.payload);
      })
      .addCase(fetchNearbyOffersAction.pending, () => {
        serverProcess.actions.setDataLoadingStatus(true);
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (_state, action) => {
        serverProcess.actions.setDataLoadingStatus(false);

        offerProcess.actions.setNearbyOffers(action.payload);
      })
      .addCase(fetchCommentsAction.pending, () => {
        serverProcess.actions.setDataLoadingStatus(true);
      })
      .addCase(fetchCommentsAction.fulfilled, (_state, action) => {
        serverProcess.actions.setDataLoadingStatus(false);

        offerProcess.actions.setComments(action.payload);
      })
      .addCase(sendCommentAction.fulfilled, (_state, action) => {
        offerProcess.actions.setComments(action.payload);
      })
      .addCase(toggleOfferFavoriteStatusAction.fulfilled, (_state, action) => {
        const { data, status } = action.payload;

        offerProcess.actions.setOffer(data);
        offerProcess.actions.updateNearbyOffers(data);

        offersProcess.actions.updateOffers(data);

        if (status === 1) {
          userProcess.actions.addToFavorites(data);
        } else {
          userProcess.actions.removeFromFavorites(data);
        }
      });
  },
});
