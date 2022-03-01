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

/**
 * Функция возвращает случайное целого число в заданном интервале, включительно
 * @param {number} min - первое положительное число, включая "0"
 * @param {number} max - второе положительное число, больше первого
 * @param {boolean} includesMax - если true, результат может включать значение 'max'
 */
function getRandomInteger(min, max, includesMax = false) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('один из параметров не является целым числом');
  }
  if (min < 0 || max <= min) {
    throw new Error(
      'параметры не удовлетворяют условиям: min, max > 0, max > min'
    );
  }
  let result;
  if (includesMax) {
    result = min + Math.floor(Math.random() * (max - min + 1));
  } else {
    result = min + Math.floor(Math.random() * (max - min));
  }
  return result;
}

getRandomInteger(1, 3, true);

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {number} min        - первое положительное число, включая 0
 * @param {number} max        - второе положительное число, больше первого
 * @param {number} precision  - количество знаков после запятой, целое число >= 1
 */
function getRandomFloat(min, max, precision) {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    typeof precision !== 'number' ||
    isNaN(min) ||
    isNaN(max) ||
    isNaN(precision)
  ) {
    throw new Error('один или несколько паоаметров не являются числами');
  }
  if (min < 0 || max <= min || precision < 1 || !Number.isInteger(precision)) {
    throw new Error(
      'нарушены условия: min, precision > 0, max > min, precision - целое число'
    );
  }
  let result = min + Math.random() * (max - min);
  const scalar = 10 ** precision;
  result = Math.round(result * scalar) / scalar;
  return result > max ? max : result;
}

getRandomFloat(0.15, 0.19, 2);

function getAuthor(index) {
  index++;
  const fileName = index < 10 ? `0${index}` : index;
  return { avatar: `img/avatars/user${fileName}.png` };
}

function getLocation() {
  return {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5),
  };
}

function getOffer(location) {
  return {
    title: 'заголовок предложения',
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
const createDemoObject = (value, index) => {
  const location = getLocation();
  return {
    author: getAuthor(index),
    location: location,
    offer: getOffer(location),
  };
};

const demoObjects = Array.from({ length: 10 }, createDemoObject);
// eslint-disable-next-line no-console
console.log(demoObjects);
