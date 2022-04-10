import { putToMap, removeFromMap } from './map.js';

const TIMEOUT_DELAY = 500;

const priceRange = {
  any: { min: 0, max: 100000 },
  middle: { min: 10000, max: 50000 },
  low: { min: 0, max: 10000 },
  high: { min: 50000, max: 100000 },
};

const setTypeFilter = (entry, filter) => {
  entry.filters.type = !(entry.ad.offer.type === filter || filter === 'any');
};

const setPriceFilter = (entry, filter) => {
  const range = priceRange[filter];
  entry.filters.price = !(
    entry.ad.offer.price >= range.min && entry.ad.offer.price < range.max
  );
};

const setRoomsFilter = (entry, filter) => {
  entry.filters.rooms = !(
    entry.ad.offer.rooms === Number(filter) || filter === 'any'
  );
};

const setCapacityFilter = (entry, filter) => {
  entry.filters.capacity = !(
    entry.ad.offer.guests === Number(filter) || filter === 'any'
  );
};

const setfeaturesFilter = (entry, ...filters) => {
  filters.forEach((filter) => {
    entry.filters[filter.value] = filter.checked
      ? !entry.ad.offer.features.includes(filter.value)
      : false;
  });
};

const runFilters = (filtersFormElements, mapObject) => {
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
    setTypeFilter(entry, type.value);
    setPriceFilter(entry, price.value);
    setRoomsFilter(entry, rooms.value);
    setCapacityFilter(entry, capacity.value);
    setfeaturesFilter(
      entry,
      wifi,
      dishwasher,
      parking,
      washer,
      elevator,
      conditioner
    );
    removeFromMap(map, entry.marker);
    const filters = Object.values(entry.filters);
    if (!filters.includes(true)) {
      putToMap(entry.ad, map, entry.marker);
    }
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

function debounce(callback, timeoutDelay = 1000) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export const setFilters = (filtersFormElements, mapObject) => {
  const { form } = filtersFormElements;
  form.addEventListener('change', () => {
    debounce(() => runFilters(filtersFormElements, mapObject), TIMEOUT_DELAY).apply();
  });
};

export const resetFilters = (filtersFormElements, mapObject) => {
  mapObject.entries.forEach((entry) => {
    removeFromMap(mapObject.map, entry.marker);
    putToMap(entry.ad, mapObject.map, entry.marker);
  });
  filtersFormElements.form.reset();
};
