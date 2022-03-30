import { DECIMAL } from './init.js';
import { priceDispatchEvent } from './validate.js';

export const createSlider = (adFormElements) => {
  const { slider, price } = adFormElements;

  noUiSlider.create(slider, {
    range: {
      min: parseInt(adFormElements.price.min, DECIMAL),
      max: parseInt(adFormElements.price.max, DECIMAL),
    },
    start: 0,
    step: 1,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseInt(value, DECIMAL);
      },
    },
  });

  slider.noUiSlider.on('slide', () => {
    adFormElements.price.value = slider.noUiSlider.get();
  });

  slider.noUiSlider.on('change', () => {
    priceDispatchEvent(adFormElements);
  });

  price.addEventListener('input', (evt) => {
    slider.noUiSlider.set(evt.target.value);
  });
};
