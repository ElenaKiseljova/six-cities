import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';

import useMap from '../../hooks/useMap';

import {URL_MARKER} from '../../const';

import { TPoint } from '../../types/points';
import { TCity } from '../../types/city';

import 'leaflet/dist/leaflet.css';

type TMapProps = {
  city: TCity | undefined;
  points: TPoint[];
  selectedPoint: TPoint | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER.default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER.current,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map (props: TMapProps): JSX.Element {
  const {city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city || {
    lat: 52.38249006767424,
    lng: 4.891808097764281,
    zoom: 10,
    title: 'Amsterdam'
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
