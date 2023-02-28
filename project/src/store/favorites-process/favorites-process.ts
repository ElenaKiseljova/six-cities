import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { FavoritesProcess } from '../../types/state';

import {
  fetchFavoritesOffersAction,
  logoutAction,
  toggleOfferFavoriteStatusAction,
} from '../api-actions';

const initialState: FavoritesProcess = {
  favorites: [],
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
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
