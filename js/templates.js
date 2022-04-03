import { hideElement } from './forms.js';

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

const setTitle = (offer, title) => {
  if (offer.title === undefined || offer.title.length === 0) {
    hideElement(title);
    return;
  }

  title.textContent = offer.title;
};

const setAddress = (offer, address) => {
  if (offer.address === undefined || offer.address.length === 0) {
    hideElement(address);
    return;
  }

  address.textContent = offer.address;
};

const setPrice = (offer, price) => {
  if (offer.price === undefined || offer.price === 0) {
    hideElement(price);
    return;
  }

  price.textContent = `${offer.price} ₽/ночь`;
};

const setType = (offer, type) => {
  if (offer.type === undefined || offer.type.length === 0) {
    hideElement(type);
    return;
  }

  type.textContent = OBJECTS_TYPES[offer.type];
};

const setCapacity = (offer, capacity) => {
  if (
    offer.rooms === undefined ||
    offer.guests === undefined ||
    offer.rooms.length === 0 ||
    offer.guests.length === 0
  ) {
    hideElement(capacity);
    return;
  }

  const guestsString = String(offer.rooms);
  const guestsLastDigit = Number(guestsString.slice(-1));
  let guests = 'гостя';
  if (offer.guests === 11 || (offer.guests > 1 && guestsLastDigit !== 1)) {
    guests = 'гостей';
  }

  const roomsString = String(offer.rooms);
  const roomsLastDigit = Number(roomsString.slice(-1));
  let rooms = 'комната';
  if (offer.rooms > 4 && (roomsLastDigit === 0 || roomsLastDigit > 4)) {
    rooms = 'комнат';
  } else if (roomsLastDigit > 1 && roomsLastDigit <= 4) {
    rooms = 'комнаты';
  }
  capacity.textContent = `${offer.rooms} ${rooms} для ${offer.guests} ${guests}`;
};

const setTime = (offer, time) => {
  if (
    offer.checkin === undefined ||
    offer.checkout === undefined ||
    offer.checkin.length === 0 ||
    offer.checkout.length === 0
  ) {
    hideElement(time);
    return;
  }

  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
};

const setFeatures = (offer, featuresList, features) => {
  if (offer.features === undefined || offer.features.length === 0) {
    offer.features = [];
    hideElement(featuresList);
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
  if (offer.description === undefined || offer.description.length === 0) {
    hideElement(description);
    return;
  }

  description.textContent = offer.description;
};

const setPhotos = (offer, photos) => {
  if (offer.photos === undefined || offer.photos.length === 0) {
    offer.photos = [];
    hideElement(photos);
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
  if (author.avatar === undefined || author.avatar.length === 0) {
    hideElement(img);
    return;
  }

  img.src = author.avatar;
};

const fillTemplate = (obj) => {
  const { author, offer } = obj;

  const newCard = cardTemplate.cloneNode(true);

  setTitle(offer, newCard.querySelector('.popup__title'));

  setAddress(offer, newCard.querySelector('.popup__text--address'));

  setPrice(offer, newCard.querySelector('.popup__text--price'));

  setType(offer, newCard.querySelector('.popup__type'));

  setCapacity(offer, newCard.querySelector('.popup__text--capacity'));

  setTime(offer, newCard.querySelector('.popup__text--time'));

  setFeatures(
    offer,
    newCard.querySelector('.popup__features'),
    newCard.querySelectorAll('.popup__feature')
  );

  setDescription(offer, newCard.querySelector('.popup__description'));

  setPhotos(offer, newCard.querySelector('.popup__photos'));

  setAvatar(author, newCard.querySelector('.popup__avatar'));

  return newCard;
};

export const getCardTemplate = (obj) => fillTemplate(obj);
