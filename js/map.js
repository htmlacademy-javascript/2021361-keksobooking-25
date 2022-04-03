import { setAddress } from './forms.js';
import { MAIN_ICON_SIZE, ICON_SIZE, MAX_MAP_ENTRIES } from './util.js';
import { getCardTemplate } from './templates.js';
import { addFiltration } from './filters.js';

export const resetMainMarker = (mapObject) => {
  const { map, mainMarker, settings } = mapObject;
  const { lat, lng, scale } = settings;
  map.setView([lat, lng], scale);
  mainMarker.setLatLng([lat, lng]);
};

export const getMarker = (lat, lng) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
  });

  const marker = L.marker([lat, lng], {
    icon: icon,
  });

  return marker;
};

export const putToMap = (ad, map, marker) => {
  marker.addTo(map);
  marker.bindPopup(getCardTemplate(ad));
};

export const removeFromMap = (map, marker) => {
  marker.remove(map);
};

export const createMap = (
  mapSettings,
  enableAdForm,
  mapCanvas,
  adFormElements
) => {
  const { lat, lng, scale } = mapSettings;
  const map = L.map(mapCanvas).setView([lat, lng], scale);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
    iconAnchor: [MAIN_ICON_SIZE / 2, MAIN_ICON_SIZE],
  });

  const mainMarker = L.marker([lat, lng], {
    draggable: true,
    icon: mainIcon,
  }).addTo(map);

  setAddress(lat, lng, adFormElements);

  mainMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    setAddress(latLng.lat, latLng.lng, adFormElements);
  });

  map.whenReady(enableAdForm);

  return { map, mainMarker, settings: mapSettings, canvas: mapCanvas };
};

export const setMapEntries = (data, mapObject) => {
  const map = mapObject.map;
  const entries = [];
  const ads = data.slice(0, MAX_MAP_ENTRIES);
  ads.forEach((ad) => {
    const lat = ad.location.lat;
    const lng = ad.location.lng;
    const marker = getMarker(lat, lng);
    putToMap(ad, map, marker);
    entries.push({
      ad,
      marker,
      filters: addFiltration(),
    });
  });
  mapObject.entries = entries;
};
