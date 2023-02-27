import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';

import { ServerProcess } from '../../types/state';

const initialState: ServerProcess = {
  isDataLoading: false,
};

export const serverProcess = createSlice({
  name: NameSpace.Server,
  initialState,
  reducers: {
    setDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
  },
});
