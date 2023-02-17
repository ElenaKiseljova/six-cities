import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer, LatLng} from 'leaflet';

import { TCity } from '../types/city';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TCity
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const isInitedMap = useRef(false);
  const instanceMap = useRef<Map | null>(null);

  useEffect(() => {
    if (!isInitedMap.current && mapRef.current !== null) {
      isInitedMap.current = true;

      instanceMap.current = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
        },
        zoom: city.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instanceMap.current.addLayer(layer);

      setMap(instanceMap.current);
    }

    if (isInitedMap.current && map) {
      const center = new LatLng(city.lat, city.lng);

      instanceMap.current?.setView(center, city.zoom);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
