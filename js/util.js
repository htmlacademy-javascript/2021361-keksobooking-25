export const DECIMAL = 10;

export const MAX_MAP_ENTRIES = 10;

export const NOT_FOR_GUESTS = 100;

export const MAP_DIGIT = 5;

export const MAIN_ICON_SIZE = 52;

export const ICON_SIZE = 40;

export const mapSettings = {
  lat: 35.684835,
  lng: 139.752482,
  scale: 12,
};

export const getMinPrice = (type) => {
  const settings = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  const price = settings[type];
  const placeholder = price === 0 ? 'вход свободный' : `от ${price}`;
  return { price, placeholder };
};

export const adForm = document.querySelector('.ad-form');

export const adFormElements = {
  form: adForm,
  rooms: adForm.querySelector('#room_number'),
  capacity: adForm.querySelector('#capacity'),
  type: adForm.querySelector('#type'),
  price: adForm.querySelector('#price'),
  timein: adForm.querySelector('#timein'),
  timeout: adForm.querySelector('#timeout'),
  address: adForm.querySelector('#address'),
  slider: adForm.querySelector('#slider'),
  mapCanvas: document.querySelector('#map-canvas'),
  resetBtn: document.querySelector('.ad-form__reset'),
  title: adForm.querySelector('#title'),
};

export const filtersForm = document.querySelector('.map__filters');

export const filtersFormElements = {
  form: filtersForm,
  type: filtersForm.querySelector('#housing-type'),
  price: filtersForm.querySelector('#housing-price'),
  rooms: filtersForm.querySelector('#housing-rooms'),
  capacity: filtersForm.querySelector('#housing-guests'),
  wifi: filtersForm.querySelector('#filter-wifi'),
  dishwasher: filtersForm.querySelector('#filter-dishwasher'),
  parking: filtersForm.querySelector('#filter-parking'),
  washer: filtersForm.querySelector('#filter-washer'),
  elevator: filtersForm.querySelector('#filter-elevator'),
  conditioner: filtersForm.querySelector('#filter-conditioner'),
};

export const MessageKey = {
  ALERT: 'FireBrick',
  SUCCESS: 'SpringGreen',
};

export const MESSAGE_SHOW_TIME = 5000;

export const showMessage = (msgKey, msgText) => {
  const message = document.createElement('div');
  message.textContent = msgText;
  message.style.backgroundColor = msgKey;
  message.style.zIndex = 100;
  message.style.position = 'absolute';
  message.style.left = 0;
  message.style.top = 0;
  message.style.right = 0;
  message.style.padding = '10px 3px';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  document.body.append(message);
  setTimeout(() => message.remove(), MESSAGE_SHOW_TIME);
};
