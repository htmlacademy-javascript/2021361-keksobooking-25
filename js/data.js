import { getRandomInteger, getRandomFloat } from './util.js';

const OBJECTS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getAuthor(index) {
  const fileName = index < 10 ? `0${index}` : index;
  return { avatar: `img/avatars/user${fileName}.png` };
}

function getLocation() {
  return {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5),
  };
}

function getOffer(location, index) {
  return {
    title: `Предложение № ${index}`,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(10000, 100000),
    type: OBJECTS_TYPES[getRandomInteger(0, 4, true)],
    rooms: getRandomInteger(1, 4, true),
    guests: getRandomInteger(2, 10, true),
    checkin: CHECKIN_HOURS[getRandomInteger(0, 2, true)],
    checkout: CHECKIN_HOURS[getRandomInteger(0, 2, true)],
    features: FEATURES.slice(getRandomInteger(0, 5, true)),
    description: 'описание помещения',
    photos: PHOTOS.slice(getRandomInteger(0, 2, true)),
  };
}

/**
 * Функция-callback, возвращающая демо-объект
 * @param {} value       - элемент массива, не используется
 * @param {number} index - индекс элемента массива, используетмя для получения адреса изображения
 */
export const createDemoObject = (value, index) => {
  const location = getLocation();
  return {
    author: getAuthor(index++),
    location: location,
    offer: getOffer(location, index++),
  };
};
