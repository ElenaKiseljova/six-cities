import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { ServerProcess } from '../../types/state';

import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  fetchOffersAction,
} from '../api-actions';

const initialState: ServerProcess = {
  isDataLoading: false,
};

export const serverProcess = createSlice({
  name: NameSpace.Server,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  },
});
