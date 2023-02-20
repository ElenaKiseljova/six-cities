import { useState } from 'react';

import { TPoint } from '../types/points';

function useSelectedPoint(points: TPoint[]) {
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
