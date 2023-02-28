import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthorizationStatus } from '../../const';

import { UserProcess } from '../../types/state';

import {
  checkAuthAction,
  fetchFavoritesOffersAction,
  loginAction,
  logoutAction,
  toggleOfferFavoriteStatusAction,
} from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
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
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const { data, status } = action.payload;

        if (status === 1) {
          state.favorites.push(data);
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== data.id
          );
        }
      });
  },
});
