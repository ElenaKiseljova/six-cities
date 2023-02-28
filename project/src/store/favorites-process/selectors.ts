import { NameSpace } from '../../const';
import { TPlaceCard } from '../../types/offers';

import { State } from '../../types/state';

export const getFavorites = (state: State): TPlaceCard[] =>
  state[NameSpace.Favorites].favorites;
