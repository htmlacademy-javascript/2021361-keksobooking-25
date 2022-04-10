import { putToMap, removeFromMap } from './map.js';

const priceRange = {
  any: { min: 0, max: 100000 },
  middle: { min: 10000, max: 50000 },
  low: { min: 0, max: 10000 },
  high: { min: 50000, max: 100000 },
};

const setTypeFilter = (filter, entry) => {
  entry.filters.type = !(entry.ad.offer.type === filter || filter === 'any');
};

const setPriceFilter = (filter, entry) => {
  const range = priceRange[filter];
  entry.filters.price = !(
    entry.ad.offer.price >= range.min && entry.ad.offer.price < range.max
  );
};

const setRoomsFilter = (filter, entry) => {
  entry.filters.rooms = !(
    entry.ad.offer.rooms === Number(filter) || filter === 'any'
  );
};

const setCapacityFilter = (filter, entry) => {
  entry.filters.capacity = !(
    entry.ad.offer.guests === Number(filter) || filter === 'any'
  );
};

const setfeaturesFilter = (filterElement, entry) => {
  const filter = filterElement.value;
  entry.filters[filter] = filterElement.checked
    ? !entry.ad.offer.features.includes(filter)
    : false;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const runFilters = (filtersFormElements, mapObject, filter) => {
  const {
    type,
    price,
    rooms,
    capacity,
    wifi,
    dishwasher,
    parking,
    washer,
    elevator,
    conditioner,
  } = filtersFormElements;

  const { map, entries } = mapObject;

  entries.forEach((entry) => {
    switch (filter) {
      case type:
        setTypeFilter(filter.value, entry);
        break;
      case price:
        setPriceFilter(filter.value, entry);
        break;
      case rooms:
        setRoomsFilter(filter.value, entry);
        break;
      case capacity:
        setCapacityFilter(filter.value, entry);
        break;
      case wifi:
      case dishwasher:
      case parking:
      case washer:
      case elevator:
      case conditioner:
        setfeaturesFilter(filter, entry);
        break;
    }
    const renderMarkers =debounce(() => {
      removeFromMap(map, entry.marker);
      const filters = Object.values(entry.filters);
      if (!filters.includes(true)) {
        putToMap(entry.ad, map, entry.marker);
      }
    });
    renderMarkers();
  });
};

export const createFiltration = () => ({
  type: false,
  price: false,
  rooms: false,
  capacity: false,
  wifi: false,
  dishwasher: false,
  parking: false,
  washer: false,
  elevator: false,
  conditioner: false,
});

export const setFilters = (filtersFormElements, mapObject) => {
  const { form } = filtersFormElements;
  form.addEventListener('change', (evt) => {
    runFilters(filtersFormElements, mapObject, evt.target);
  });
};

export const resetFilters = (filtersFormElements, mapObject) => {
  mapObject.entries.forEach((entry) => {
    removeFromMap(mapObject.map, entry.marker);
    putToMap(entry.ad, mapObject.map, entry.marker);
  });
  filtersFormElements.form.reset();
};
