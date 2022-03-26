import { createDemoObject } from './data.js';

import { createMap, putToMap } from './map.js';

import { validateAdForm } from './validate.js';

import { createSlider } from './slider.js';

import {
  disableForms,
  enableForms,
  setSelectedPricePlaceholder,
  setTimeinTimeoutSynchro,
  setAddress,
} from './forms.js';

const demoObjects = Array.from({ length: 10 }, createDemoObject);

const forms = [...document.forms];

const adForm = document.querySelector('.ad-form');

const adFormElements = {
  form: adForm,
  rooms: adForm.querySelector('#room_number'),
  capacity: adForm.querySelector('#capacity'),
  type: adForm.querySelector('#type'),
  price: adForm.querySelector('#price'),
  timein: adForm.querySelector('#timein'),
  timeout: adForm.querySelector('#timeout'),
  address: adForm.querySelector('#address'),
  slider: adForm.querySelector('#slider'),
};

const mapSettings = {
  element: document.querySelector('#map-canvas'),
  lat: 35.684835,
  lng: 139.752482,
  scale: 12,
};

disableForms(forms);

setSelectedPricePlaceholder(adFormElements);

validateAdForm(adFormElements);

setTimeinTimeoutSynchro(adFormElements);

const map = createMap(mapSettings, () => enableForms(forms), adFormElements);

setAddress(mapSettings, adFormElements);

demoObjects.forEach((obj) => {
  putToMap(obj, map);
});

createSlider(adFormElements);
