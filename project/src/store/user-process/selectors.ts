import { AuthorizationStatus, NameSpace } from '../../const';
import { TPlaceCard } from '../../types/offers';

import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getFavorites = (state: State): TPlaceCard[] =>
  state[NameSpace.User].favorites;
