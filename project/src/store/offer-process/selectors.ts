import { NameSpace } from '../../const';

import { TPlaceCard } from '../../types/offers';
import { TReview } from '../../types/reviews';
import { State } from '../../types/state';

export const getOffer = (state: State): TPlaceCard | null =>
  state[NameSpace.Offer].offer;
export const getNearbyOffers = (state: State): TPlaceCard[] =>
  state[NameSpace.Offer].nearbyOffers;
export const getComments = (state: State): TReview[] =>
  state[NameSpace.Offer].comments;
