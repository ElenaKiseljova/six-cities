import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';

import useMap from '../../hooks/useMap';

import {URL_MARKER} from '../../const';

import { TCity } from '../../types/city';
import { TPlaceCard } from '../../types/offers';

import 'leaflet/dist/leaflet.css';

type TMapProps = {
  city: TCity | undefined;
  offers: TPlaceCard[];
  selectedPlaceCard: TPlaceCard | undefined;
  classList?: string;
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
  const {city, offers, selectedPlaceCard, classList} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city || {
    location: {
      latitude: 52.38249006767424,
      longitude: 4.891808097764281,
      zoom: 5,
    },
    name: 'all'
  });

  const markers = useRef<{[cityTitle: string]: Marker[]}>({});

  useEffect(() => {
    if (map) {
      // Создание новых маркеров
      offers.forEach((offer) => {
        const {location: point} = offer;

        const marker = new Marker(
          {
            lat: point.latitude,
            lng: point.longitude,
          },
          {
            title: offer.title,
          }
        );

        // Добавление новых маркеров в объект
        markers.current[city?.name || 'all'] ?
          markers.current[city?.name || 'all'].push(marker) :
          markers.current[city?.name || 'all'] = [marker];

        // Шаблон попапа маркера
        const popupTemplate = `
            <img src="${offer.previewImage}" />
            <h4>${offer.title}</h4>
            <a href="/offer/${offer.id}">Go To The Offer</a>
          `;
        marker.bindPopup(popupTemplate);

        // Добавление маркера на карту
        marker
          .setIcon(
            selectedPlaceCard !== undefined &&
            point.latitude === selectedPlaceCard.location.latitude &&
            point.longitude === selectedPlaceCard.location.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, city, selectedPlaceCard]);

  useEffect(() => {
    // Проверка наличия отрисованных маркеров других городов
    if (Object.keys(markers.current).length) {
      for (const [c, m] of Object.entries(markers.current)) {
        if (c !== (city?.name || 'all')) {
          // Удаление слоёв маркеров
          m.forEach((mark) => mark.remove());

          // Удаление ключа с маркерами из объекта
          delete markers.current[c];
        }
      }
    }
  }, [city]);
  return (
    <section
      className={`${classList ? classList : 'cities__map'} map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
