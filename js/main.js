import { getSimilarAds } from './server.js';
import { createMap, setMapEntries } from './map.js';
import { setValidateAdForm } from './validate.js';
import { createSlider } from './slider.js';
import { disableForm, enableForm, initAdForm } from './forms.js';
import { setFilters } from './filters.js';
import {
  adForm,
  adFormElements,
  filtersForm,
  mapSettings,
  MessageKey,
  showMessage,
} from './util.js';

disableForm(adForm);
disableForm(filtersForm);
initAdForm(adFormElements);
setValidateAdForm(adFormElements);
createSlider(adFormElements);
const mapWhenReady = () => enableForm(adForm);
const map = createMap(mapSettings, mapWhenReady, adFormElements);
const whenGetResponse = getSimilarAds();
whenGetResponse
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    const mapEntries = setMapEntries(data, map);
    setFilters(map, mapEntries);
    enableForm(filtersForm);
  })
  .catch((error) => {
    showMessage(MessageKey.ALERT, error.message);
  });
