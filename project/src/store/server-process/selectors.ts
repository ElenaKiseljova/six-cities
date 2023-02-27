import { NameSpace } from '../../const';

import { State } from '../../types/state';

export const getDataLoadingState = (state: State): boolean =>
  state[NameSpace.Server].isDataLoading;
