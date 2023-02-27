import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { State } from '../../types/state';

export const getOffers = (state: State): TPlaceCard[] =>
  state[NameSpace.Offers].offers;
