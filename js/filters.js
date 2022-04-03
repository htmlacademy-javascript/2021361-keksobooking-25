import { putToMap, removeFromMap } from './map.js';
import { filtersFormElements } from './util.js';

const priceRange = {
  any: { min: 0, max: 100000 },
  middle: { min: 10000, max: 50000 },
  low: { min: 0, max: 10000 },
  high: { min: 50000, max: 100000 },
};

const setTypeFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.type = !(
      entry.ad.offer.type === filter || filter === 'any'
    );
  });
};

const setPriceFilter = (filter, mapEntries) => {
  const range = priceRange[filter];
  mapEntries.forEach((entry) => {
    entry.filters.price = !(
      entry.ad.offer.price >= range.min && entry.ad.offer.price < range.max
    );
  });
};

const setRoomsFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.rooms = !(
      entry.ad.offer.rooms === Number(filter) || filter === 'any'
    );
  });
};

const setCapacityFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.capacity = !(
      entry.ad.offer.guests === Number(filter) || filter === 'any'
    );
  });
};

const setfeaturesFilter = (filterElement, mapEntries) => {
  const filter = filterElement.value;
  mapEntries.forEach((entry) => {
    entry.filters[filter] = filterElement.checked
      ? !entry.ad.offer.features.includes(filter)
      : false;
  });
};

const runFilter = (map, mapEntries) => {
  mapEntries.forEach((entry) => {
    const filters = Object.values(entry.filters);
    if (filters.includes(true)) {
      removeFromMap(map, entry.marker);
    } else {
      putToMap(entry.ad, map, entry.marker);
    }
  });
};

export const addFiltration = () => ({
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

export const setFilters = (map, mapEntries) => {
  const {
    form,
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

  form.addEventListener('change', (evt) => {
    switch (evt.target) {
      case type:
        setTypeFilter(evt.target.value, mapEntries);
        break;
      case price:
        setPriceFilter(evt.target.value, mapEntries);
        break;
      case rooms:
        setRoomsFilter(evt.target.value, mapEntries);
        break;
      case capacity:
        setCapacityFilter(evt.target.value, mapEntries);
        break;
      case wifi:
      case dishwasher:
      case parking:
      case washer:
      case elevator:
      case conditioner:
        setfeaturesFilter(evt.target, mapEntries);
        break;
    }
    runFilter(map, mapEntries);
  });
};
