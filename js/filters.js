import { putToMap, removeFromMap } from './map.js';

const priceRange = {
  any: { min: 0, max: 100000 },
  middle: { min: 10000, max: 50000 },
  low: { min: 0, max: 10000 },
  high: { min: 50000, max: 100000 },
};

const setTypeFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.type = !(
      entry.data.offer.type === filter || filter === 'any'
    );
  });
};

const setPriceFilter = (filter, mapEntries) => {
  const range = priceRange[filter];
  mapEntries.forEach((entry) => {
    entry.filters.price = !(
      entry.data.offer.price >= range.min && entry.data.offer.price < range.max
    );
  });
};

const setRoomsFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.rooms = !(
      entry.data.offer.rooms === Number(filter) || filter === 'any'
    );
  });
};

const setCapacityFilter = (filter, mapEntries) => {
  mapEntries.forEach((entry) => {
    entry.filters.capacity = !(
      entry.data.offer.guests === Number(filter) || filter === 'any'
    );
  });
};

const setfeaturesFilter = (filterElement, mapEntries) => {
  const filter = filterElement.value;
  mapEntries.forEach((entry) => {
    entry.filters[filter] = filterElement.checked
      ? !entry.data.offer.features.includes(filter)
      : false;
  });
};

const runFilter = (map, mapEntries) => {
  mapEntries.forEach((entry) => {
    const filters = Object.values(entry.filters);
    if (filters.includes(true)) {
      removeFromMap(map, entry.marker);
    } else {
      putToMap(entry.data, map, entry.marker);
    }
  });
};

export const setFilters = (filtersFormElements, map, mapEntries) => {
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
