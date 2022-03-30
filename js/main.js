import { createDemoObject } from './init.js';

import { createMap, getMapEntries } from './map.js';

import { setValidateAdForm } from './validate.js';

import { createSlider } from './slider.js';

import { setFilters } from './filters.js';

import {
  disableForms,
  enableForms,
  initAdForm,
} from './forms.js';

const forms = [...document.forms];

const demoObjects = Array.from({ length: 10 }, createDemoObject);

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
  mapCanvas: document.querySelector('#map-canvas'),
};

const mapSettings = {
  lat: 35.684835,
  lng: 139.752482,
  scale: 12,
};

const filtersForm = document.querySelector('.map__filters');

const filtersFormElements = {
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

disableForms(forms);

initAdForm(adFormElements);

setValidateAdForm(adFormElements);

createSlider(adFormElements);

const mapWhenReady = () => enableForms(forms);

const map = createMap(mapSettings, mapWhenReady, adFormElements);

const dataFilters = Object.fromEntries(
  Object.entries(filtersFormElements).map(([key]) => [key, false])
);

const mapEntries = getMapEntries(map, demoObjects, dataFilters);

setFilters(filtersFormElements, map, mapEntries);
