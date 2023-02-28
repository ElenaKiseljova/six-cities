import { NameSpace } from '../../const';

import { State } from '../../types/state';

export const getDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isDataLoading;

export const getErrorStatus = (state: State): boolean =>
  state[NameSpace.Data].hasError;
