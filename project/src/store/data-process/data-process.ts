import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { DataProcess } from '../../types/state';

import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  fetchOffersAction,
} from '../api-actions';

const initialState: DataProcess = {
  isDataLoading: false,
  hasError: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      });
  },
});
