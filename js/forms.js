import { MAP_DIGIT, getMinPrice } from './util.js';
import { clearErrorTextTag, priceDispatchEvent } from './validate.js';
import { resetMainMarker } from './map.js';

/**
 * Функция возвращает callback-функцию
 * @param {string} methodName - флаг в какое состояние переключить
 * @returns {switchTo} callback-функция
 */
const switchTo = (methodName) => (child) =>
  child[methodName]('disabled', 'disabled');

/**
 * Функция добавляет или убирает атрибут 'disabled' у дочерних элементов формы
 * @param {HTMLElement} form - форма
 * @param {switchTo} useMethod - callback-функция
 */
const switchChildren = (form, useMethod) => {
  [...form.elements].forEach(useMethod);
};

export const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  switchChildren(form, switchTo('setAttribute'));
};

export const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  switchChildren(form, switchTo('removeAttribute'));
};

export const hideElement = (element) => {
  element.classList.add('visually-hidden');
};

const setSelectedPricePlaceholder = (adFormElements) => {
  const { price, type } = adFormElements;
  price.placeholder = getMinPrice(type[type.selectedIndex].value).placeholder;
};

const setTimeinTimeoutSynchro = (adFormElements) => {
  const { form, timeout, timein } = adFormElements;
  form.addEventListener('change', (evt) => {
    switch (evt.target) {
      case timeout:
        timein.value = timeout.value;
        break;
      case timein:
        timeout.value = timein.value;
        break;
    }
  });
};

export const setAddress = (lat, lng, adFormElements) => {
  const { address } = adFormElements;
  address.value = `${lat.toFixed(MAP_DIGIT)}, ${lng.toFixed(MAP_DIGIT)}`;
};

export const initAdForm = (adFormElements, mapObject) => {
  const { form, type, price, rooms, capacity, resetBtn } = adFormElements;
  setTimeinTimeoutSynchro(adFormElements);
  setSelectedPricePlaceholder(adFormElements);
  resetBtn.addEventListener('click', () => {
    form.reset();
    setAddress(mapObject.settings.lat, mapObject.settings.lng, adFormElements);
    clearErrorTextTag(form, type, price, rooms, capacity);
    resetMainMarker(mapObject);
  });
};
