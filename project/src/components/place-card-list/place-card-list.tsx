import { TPlaceCard } from '../../types/offers';

import PlaceCard from '../place-card/place-card';

type TPlaceCardListProps = {
  sectionName?: string;
  additionalClasses?: string[] | string;
  cards: TPlaceCard[];
};

function PlaceCardList(props: TPlaceCardListProps): JSX.Element {
  const {sectionName, additionalClasses, cards} = props;

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
        cards.map((offer) => <PlaceCard key={offer.id} sectionName={sectionName} data={offer} />)
      }
    </div>
  );
}

export default PlaceCardList;
