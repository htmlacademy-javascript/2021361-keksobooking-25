import { server } from './server.js';
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
const mapWhenReady = () => enableForm(adForm);
const mapObject = createMap(mapSettings, mapWhenReady, adFormElements);
initAdForm(adFormElements, mapObject);
setValidateAdForm(adFormElements);
createSlider(adFormElements);

const whenGetResponse = server.getSimilarAds();
whenGetResponse
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    setMapEntries(data, mapObject);
    setFilters(mapObject);
    enableForm(filtersForm);
  })
  .catch((error) => {
    showMessage(MessageKey.ALERT, error.message);
  });
