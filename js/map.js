import { setAddress } from './forms.js';
import { getTemplate } from './template.js';

export const createMap = (mapSettings, enableForms, adFormElements) => {
  const { element, lat, lng, scale } = mapSettings;
  const map = L.map(element).setView([lat, lng], scale).whenReady(enableForms);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker([lat, lng], {
    draggable: true,
    icon: mainIcon,
  }).addTo(map);

  mainMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    mapSettings.lat = latLng.lat;
    mapSettings.lng = latLng.lng;
    setAddress(mapSettings, adFormElements);
  });

  return map;
};

export const putToMap = (obj, map) => {
  const { location } = obj;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  L.marker([location.lat, location.lng], {
    icon: icon,
  })
    .addTo(map)
    .bindPopup(getTemplate(obj));
};
