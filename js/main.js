import { getSimilarAds } from './server.js';
import { createMap, setMapEntries } from './map.js';
import { setValidateAdForm } from './validate.js';
import { createSlider } from './slider.js';
import { disableForm, enableForm, initAdForm } from './forms.js';
import { setFilters } from './filters.js';
import {
  mapCanvas,
  adFormElements,
  filtersFormElements,
  mapSettings,
  showMessage,
} from './util.js';

disableForm(adFormElements.form);
disableForm(filtersFormElements.form);
const mapWhenReady = () => enableForm(adFormElements.form);
const mapObject = createMap(mapSettings, mapWhenReady, mapCanvas, adFormElements);
initAdForm(adFormElements, filtersFormElements, mapObject);
setValidateAdForm(adFormElements, filtersFormElements, mapObject);
createSlider(adFormElements);

getSimilarAds()
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    setMapEntries(data, mapObject);
    setFilters(filtersFormElements, mapObject);
    enableForm(filtersFormElements.form);
  })
  .catch((error) => {
    showMessage(error.message);
  });
