import { setAddress } from './forms.js';
import { MAX_MAP_ENTRIES, MAIN_ICON_SIZE, ICON_SIZE } from './init.js';
import { getCardTemplate } from './templates.js';

export const getMarker = (lat, lng) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE/2, ICON_SIZE],
  });

  const marker = L.marker([lat, lng], {
    icon: icon,
  });

  return marker;
};

export const putToMap = (demoObject, map, marker) => {
  marker.addTo(map);
  marker.bindPopup(getCardTemplate(demoObject));
};

export const removeFromMap = (map, marker) => {
  marker.remove(map);
};

export const createMap = (mapSettings, enableForms, adFormElements) => {
  const { lat, lng, scale } = mapSettings;
  const { mapCanvas } = adFormElements;
  const map = L.map(mapCanvas)
    .setView([lat, lng], scale)
    .whenReady(enableForms);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
    iconAnchor: [MAIN_ICON_SIZE/2, MAIN_ICON_SIZE],
  });

  const mainMarker = L.marker([lat, lng], {
    draggable: true,
    icon: mainIcon,
  }).addTo(map);

  setAddress(mapSettings, adFormElements);

  mainMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    mapSettings.lat = latLng.lat;
    mapSettings.lng = latLng.lng;
    setAddress(mapSettings, adFormElements);
  });

  return map;
};

export const getMapEntries = (map, demoObjects, filter) => {
  const mapEntries = [];
  demoObjects.forEach((demoObject, index) => {
    if (index < MAX_MAP_ENTRIES) {
      const lat = demoObject.location.lat;
      const lng = demoObject.location.lng;
      const marker = getMarker(lat, lng);
      putToMap(demoObject, map, marker);
      mapEntries.push({ data: demoObject, marker: marker, filters: Object.assign({}, filter)});
    }
  });

  return mapEntries;
};
