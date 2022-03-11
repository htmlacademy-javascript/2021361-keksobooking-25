const OBJECTS_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const fragment = document.createDocumentFragment();

const fillTemplate = function ({ author, offer }) {
  const newCard = cardTemplate.cloneNode(true);

  const avatar = newCard.querySelector('.popup__avatar');
  avatar.src = author.avatar;

  const title = newCard.querySelector('.popup__title');
  title.textContent = offer.title;

  const address = newCard.querySelector('.popup__text--address');
  address.textContent = offer.address;

  const price = newCard.querySelector('.popup__text--price');
  price.textContent = offer.price;

  const type = newCard.querySelector('.popup__type');
  type.textContent = OBJECTS_TYPES[offer.type];

  const capacity = newCard.querySelector('.popup__text--capacity');
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  const features = newCard.querySelectorAll('.popup__feature');
  const demoFeaturesClasses = offer.features.map(
    (demoFeature) => `popup__feature--${demoFeature}`
  );
  features.forEach((feature) => {
    const featureClass = feature.classList[1];
    if (!demoFeaturesClasses.includes(featureClass)) {
      feature.remove();
    }
  });

  const description = newCard.querySelector('.popup__description');
  description.textContent = offer.description;

  const photos = newCard.querySelector('.popup__photos');
  const photoTemplate = photos.querySelector('img');
  offer.photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    photos.appendChild(newPhoto);
  });

  fragment.appendChild(newCard);
};

export const renderDemoObjects = (demoObjects) => {
  demoObjects.forEach((demoObject) => {
    fillTemplate(demoObject);
  });
  mapCanvas.append(fragment);
};
