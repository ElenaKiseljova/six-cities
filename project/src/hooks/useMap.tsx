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
    if (mapRef.current === null) {
      return;
    }

    const {location} = city;

    if (!isInitedMap.current && 'latitude' in location) {
      isInitedMap.current = true;

      instanceMap.current = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: location.zoom
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
    } else if (isInitedMap.current && map && 'latitude' in location) {
      const center = new LatLng(location.latitude, location.longitude);

      // instanceMap.current?.setView(center, city.zoom);
      // instanceMap.current?.panTo(center, {animate: true});
      instanceMap.current?.flyTo(center, location.zoom, {animate: true});
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
