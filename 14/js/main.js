import { getSimilarAds } from './server.js';
import { createMap, setMapEntries } from './map.js';
import { setValidateAdForm } from './validate.js';
import { createSlider } from './slider.js';
import { disableForm, enableForm, initAdForm } from './forms.js';
import { setFilters } from './filters.js';
import { setPhotosPreview } from './photos.js';
import {
  mapCanvas,
  adFormElements,
  filtersFormElements,
  mapSettings,
  showMessage,
  MAX_MAP_ENTRIES,
} from './util.js';

disableForm(adFormElements.form);
disableForm(filtersFormElements.form);
setPhotosPreview();
createSlider(adFormElements);
const mapWhenReady = (mapObject) => {
  enableForm(adFormElements.form);
  initAdForm(adFormElements, filtersFormElements, mapObject);
  setValidateAdForm(adFormElements, filtersFormElements, mapObject);
  getSimilarAds()
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      setMapEntries(data.slice(0, MAX_MAP_ENTRIES), mapObject);
      setFilters(filtersFormElements, mapObject);
      enableForm(filtersFormElements.form);
    })
    .catch((error) => {
      showMessage(error.message);
    });
};
createMap(mapSettings, mapWhenReady, mapCanvas, adFormElements);
