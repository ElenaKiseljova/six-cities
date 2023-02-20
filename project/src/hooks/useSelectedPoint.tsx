import { useState } from 'react';

import { TPoint } from '../types/points';

type TSelectedPointHook = {
  onPlaceCardHoverHandler: (placeName: string | undefined) => void;
  selectedPoint: TPoint | undefined;
};

function useSelectedPoint(points: TPoint[]): TSelectedPointHook {
  const [selectedPoint, setSelectedPoint] = useState<TPoint | undefined>(undefined);

  const onPlaceCardHoverHandler = (placeName: string | undefined) => {
    const curPoint = points.find((point) => placeName ? point.title === placeName : false);

    setSelectedPoint(curPoint);
  };

  return {
    onPlaceCardHoverHandler,
    selectedPoint
  };
}

export default useSelectedPoint;
