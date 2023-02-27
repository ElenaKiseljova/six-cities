import { useState } from 'react';
import { TPlaceCard } from '../types/offers';

type TSelectedPlaceCardtHook = {
  onPlaceCardHoverHandler: (place: TPlaceCard | undefined) => void;
  selectedPlaceCard: TPlaceCard | undefined;
};

function useSelectedPlaceCard(placeCards: TPlaceCard[]): TSelectedPlaceCardtHook {
  const [selectedPlaceCard, setSelectedPlaceCard] = useState<TPlaceCard | undefined>(undefined);

  const onPlaceCardHoverHandler = (place: TPlaceCard | undefined) => {
    const curPlaceCard = placeCards.find((pc) => {
      if (place) {
        const {latitude, longitude} = place.location;
        if (latitude === pc.location.latitude && longitude === pc.location.longitude) {
          return true;
        }
      }

      return false;
    });

    setSelectedPlaceCard(curPlaceCard);
  };

  return {
    onPlaceCardHoverHandler,
    selectedPlaceCard
  };
}

export default useSelectedPlaceCard;
