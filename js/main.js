import { createDemoObject } from './data.js';
import { renderDemoObjects } from './template.js';
import {
  disableForms,
  enableForms,
  setSelectedPricePlaceholder,
  validateAdForm,
  setTimeinTimeoutSyncrhro,
} from './forms.js';

const globalForms = [...document.forms];
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
};

renderDemoObjects(demoObjects);

setSelectedPricePlaceholder(adFormElements);

disableForms(globalForms);

enableForms(globalForms);

validateAdForm(adFormElements);

setTimeinTimeoutSyncrhro(adFormElements);
