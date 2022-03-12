import { hideNode } from './availability.js';

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

const setTitle = (offer, title) => {
  if (offer.title.length === 0) {
    hideNode(title);
    return;
  }

  title.textContent = offer.title;
};

const setAddress = (offer, address) => {
  if (offer.address.length === 0) {
    hideNode(address);
    return;
  }

  address.textContent = offer.address;
};

const setPrice = (offer, price) => {
  if (offer.price === 0) {
    hideNode(price);
    return;
  }

  price.textContent = `${offer.price} ₽/ночь`;
};

const setType = (offer, type) => {
  if (offer.type.length === 0) {
    hideNode(type);
    return;
  }

  type.textContent = OBJECTS_TYPES[offer.type];
};

const setCapacity = (offer, capacity) => {
  if (offer.rooms.length === 0 || offer.guests.length === 0) {
    hideNode(capacity);
    return;
  }

  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
};

const setTime = (offer, time) => {
  if (offer.checkin.length === 0 || offer.checkout.length === 0) {
    hideNode(time);
    return;
  }

  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
};

const setFeatures = (offer, features) => {
  if (offer.features.length === 0) {
    hideNode(features);
    return;
  }

  const demoFeaturesClasses = offer.features.map(
    (demoFeature) => `popup__feature--${demoFeature}`
  );
  features.forEach((feature) => {
    const featureClass = feature.classList[1];
    if (!demoFeaturesClasses.includes(featureClass)) {
      feature.remove();
    }
  });
};

const setDescription = (offer, description) => {
  if (offer.description.length === 0) {
    hideNode(description);
    return;
  }

  description.textContent = offer.description;
};

const setPhotos = (offer, photos) => {
  if (offer.photos.length === 0) {
    hideNode(photos);
    return;
  }

  const photoTemplate = photos.querySelector('img');
  offer.photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    photos.appendChild(newPhoto);
  });
  photoTemplate.remove();
};

const setAvatar = (author, img) => {
  if (author.avatar.length === 0) {
    hideNode(img);
    return;
  }

  img.src = author.avatar;
};

const fillTemplate = ({ author, offer }) => {
  const newCard = cardTemplate.cloneNode(true);

  setTitle(offer, newCard.querySelector('.popup__title'));

  setAddress(offer, newCard.querySelector('.popup__text--address'));

  setPrice(offer, newCard.querySelector('.popup__text--price'));

  setType(offer, newCard.querySelector('.popup__type'));

  setCapacity(offer, newCard.querySelector('.popup__text--capacity'));

  setTime(offer, newCard.querySelector('.popup__text--time'));

  setFeatures(offer, newCard.querySelectorAll('.popup__feature'));

  setDescription(offer, newCard.querySelector('.popup__description'));

  setPhotos(offer, newCard.querySelector('.popup__photos'));

  setAvatar(author, newCard.querySelector('.popup__avatar'));

  fragment.appendChild(newCard);
};

export const renderDemoObjects = (demoObjects) => {
  demoObjects.forEach((demoObject) => {
    fillTemplate(demoObject);
  });
  mapCanvas.append(fragment);
};
