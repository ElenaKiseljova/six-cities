import { TPlaceCard } from '../../types/offers';

import PlaceCard from '../place-card/place-card';

type TPlaceCardListProps = {
  sectionName?: string;
  additionalClasses?: string[] | string;
  offers: TPlaceCard[];
  onPlaceCardHover?: (placeName: string | undefined) => void;
};

function PlaceCardList(props: TPlaceCardListProps): JSX.Element {
  const {sectionName, additionalClasses, offers, onPlaceCardHover} = props;

  let addClasses = '';
  if (additionalClasses) {
    if (typeof additionalClasses === 'string') {
      addClasses = additionalClasses;
    } else {
      addClasses = additionalClasses.join(' ');
    }
  }

  const placeCardHoverHandler = (placeName: string | undefined) => {
    if (typeof onPlaceCardHover === 'function') {
      onPlaceCardHover(placeName);
    }
  };

  return (
    <div
      className={
        `places__list ${sectionName ? `${sectionName}__places-list` : ''} ${addClasses}`
      }
    >
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            sectionName={sectionName}
            data={offer}
            onHover={placeCardHoverHandler}
          />))
      }
    </div>
  );
}

export default PlaceCardList;
