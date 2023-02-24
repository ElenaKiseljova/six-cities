import { TPlaceCardTypes } from '../types/offers';

export const adapterOfferType = (type: TPlaceCardTypes): string => {
  switch (type) {
    case 'apartment':
      return 'Apartment';

    case 'hotel':
      return 'Hotel';

    case 'house':
      return 'Guest house';

    case 'room':
      return 'Private room';

    default:
      return 'Unknown offer type';
  }
};
