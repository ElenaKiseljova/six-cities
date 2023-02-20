import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';

import useMap from '../../hooks/useMap';

import {URL_MARKER} from '../../const';

import { TPoint } from '../../types/points';
import { TCity } from '../../types/city';
import { TPlaceCard } from '../../types/offers';

import 'leaflet/dist/leaflet.css';

type TMapProps = {
  city: TCity | undefined;
  points: TPoint[];
  offers: TPlaceCard[];
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
  const {city, points, offers, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city || {
    lat: 52.38249006767424,
    lng: 4.891808097764281,
    zoom: 5,
    title: 'Amsterdam'
  });

  const markers = useRef<{[cityTitle: string]: Marker[]}>({});

  useEffect(() => {
    if (map) {
      // Создание новых маркеров
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        },
        {
          title: point.title,
        });

        // Добавление новых маркеров в объект
        markers.current[city?.title || 'all'] ?
          markers.current[city?.title || 'all'].push(marker) :
          markers.current[city?.title || 'all'] = [];

        // Шаблон попапа маркера
        const pointOffer = offers.find((o) => o.title === point.title);
        if (pointOffer) {
          const popupTemplate = `
            <img src="${pointOffer.cardImg}" />
            <h4>${pointOffer.title}</h4>
            <a href="/offer/${pointOffer.id}">Go To The Offer</a>
          `;
          marker.bindPopup(popupTemplate);
        }

        // Добавление маркера на карту
        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, offers, city, selectedPoint]);

  useEffect(() => {
    // Проверка наличия отрисованных маркеров других городов
    if (Object.keys(markers.current).length) {
      for (const [c, m] of Object.entries(markers.current)) {
        if (c !== (city?.title || 'all')) {
          m.forEach((mark) => mark.remove());

          // Удаление ключа с маркерами из объекта
          delete markers.current[c];
        }
      }
    }
  }, [city]);
  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
