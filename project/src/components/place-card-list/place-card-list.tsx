import { useState } from 'react';

import { TPlaceCard } from '../../types/offers';

import PlaceCard from '../place-card/place-card';

type TPlaceCardListProps = {
  sectionName?: string;
  additionalClasses?: string[] | string;
  cards: TPlaceCard[];
};

function PlaceCardList(props: TPlaceCardListProps): JSX.Element {
  const {sectionName, additionalClasses, cards} = props;

  const [activeCard, setActiveCard] = useState(cards.length ? cards[0] : null);

  let addClasses = '';
  if (additionalClasses) {
    if (typeof additionalClasses === 'string') {
      addClasses = additionalClasses;
    } else {
      addClasses = additionalClasses.join(' ');
    }
  }

  return (
    <div
      className={
        `places__list ${sectionName ? `${sectionName}__places-list` : ''} ${addClasses}`
      }
    >
      {
        cards.map((offer) => (
          <PlaceCard
            key={offer.id}
            sectionName={sectionName}
            data={offer}
            onHoverIn={(hoveredCard) => {
              setActiveCard(hoveredCard);
            }}
            onHoverOut={() => {
              setActiveCard(null);

              // eslint-disable-next-line no-console
              console.log('activeCard', activeCard);
            }}
          />))
      }
    </div>
  );
}

export default PlaceCardList;
