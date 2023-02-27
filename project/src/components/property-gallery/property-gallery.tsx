import { Fragment } from 'react';

import { TPlaceCard } from '../../types/offers';

type TPropertyGalleryProps = {
  offer: TPlaceCard;
};

function PropertyGallery({offer}: TPropertyGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          offer.images.map((img, i) => (
            <Fragment key={`${img}-${i + 1}`} >
              {i < 6 &&
                <div className="property__image-wrapper">
                  <img className="property__image" src={img} alt={offer.title} />
                </div>}
              {i >= 6 &&
                ''}
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}

export default PropertyGallery;
