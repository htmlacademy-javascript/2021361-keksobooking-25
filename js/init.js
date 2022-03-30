import { getRandomInteger, getRandomFloat } from './util.js';

export const DECIMAL = 10;

export const MAX_MAP_ENTRIES = 10;

export const NOT_FOR_GUESTS = 100;

export const MAP_DIGIT = 5;

export const MAIN_ICON_SIZE = 52;

export const ICON_SIZE = 40;

export const getMinPrice = (type) => {
  const settings = {
    bungalow:0,
    flat:1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  const price = settings[type];
  const placeholder = price === 0 ? 'вход свободный' : `от ${price}`;
  return ({price, placeholder});
};

const DEMO_DESCRIPTIONS = [
  'замечательное место',
  'хороший вид из окна',
  'удобная парковка',
  'дорогой ремонт',
  'авторский дизайн интерьера',
  'удобная мебель',
  'рядом есть прачечная',
  'рядом есть кинотеатры',
  'можно с домашними питомцами',
  'есть видеодомофон на входе',
];

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
    guests: getRandomInteger(0, 3, true),
    checkin: CHECKIN_HOURS[getRandomInteger(0, 2, true)],
    checkout: CHECKIN_HOURS[getRandomInteger(0, 2, true)],
    features: FEATURES.slice(getRandomInteger(0, 5, true)),
    description: DEMO_DESCRIPTIONS[index - 1],
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
    author: getAuthor(index + 1),
    location: location,
    offer: getOffer(location, index + 1),
  };
};
