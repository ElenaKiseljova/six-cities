import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, AuthorizationStatus } from '../../const';
import { TPlaceCard } from '../../types/offers';

import { UserProcess } from '../../types/state';

import {
  checkAuthAction,
  fetchFavoritesOffersAction,
  loginAction,
  logoutAction,
} from '../api-actions';

import { offersProcess } from '../offers-process/offers-process';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<TPlaceCard[]>) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<TPlaceCard>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<TPlaceCard>) => {
      state.favorites = state.favorites.filter(
        (offer) => offer.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.favorites = [];

        offersProcess.actions.resetFavoritesOffersFlag();
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (_state, action) => {
        userProcess.actions.setFavorites(action.payload);
      });
  },
});
