import { useState } from 'react';
import { TPlaceCard } from '../types/offers';

type TSelectedPlaceCardtHook = {
  onPlaceCardHoverHandler: (placeName: string | undefined) => void;
  selectedPlaceCard: TPlaceCard | undefined;
};

function useSelectedPlaceCard(placeCards: TPlaceCard[]): TSelectedPlaceCardtHook {
  const [selectedPlaceCard, setSelectedPlaceCard] = useState<TPlaceCard | undefined>(undefined);

  const onPlaceCardHoverHandler = (placeName: string | undefined) => {
    const curPlaceCard = placeCards.find((pc) => placeName ? pc.title === placeName : false);

    setSelectedPlaceCard(curPlaceCard);
  };

  return {
    onPlaceCardHoverHandler,
    selectedPlaceCard
  };
}

export default useSelectedPlaceCard;
