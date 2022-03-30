import { DECIMAL, NOT_FOR_GUESTS, getMinPrice } from './init.js';

/**
 * Функция обновляет (очищает) содержимое сообщений об ошибках
 * @param {Array} elements - элементы input, которые добавляются в pristine
 */
const clearErrorTextTag = (...elements) => {
  const errorTextTags = [];
  elements.forEach((element) =>
    errorTextTags.push(element.parentElement.querySelector('.form__error'))
  );
  errorTextTags
    .filter((errorTextTag) => errorTextTag !== null)
    .forEach((errorTextTag) => (errorTextTag.textContent = ''));
};

const priceOnInput = (adFormElements) => {
  const { price, slider } = adFormElements;
  if (price.value === '0' || isNaN(price.valueAsNumber)) {
    price.value = '';
    slider.noUiSlider.reset();
    clearErrorTextTag(price);
  } else {
    price.value = price.valueAsNumber.toFixed(0);
  }
};

export const priceDispatchEvent = (adFormElements) => {
  const { type, price } = adFormElements;
  price.dispatchEvent(new Event('input'));
  price.placeholder = getMinPrice(type[type.selectedIndex].value).placeholder;
};

export const setValidateAdForm = (adFormElements) => {
  const { form, type, price, rooms, capacity } = adFormElements;

  const pristine = new window.Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  const getPriceValidate = () => {
    const currentType = type[type.selectedIndex].value;
    const minPrice = getMinPrice(currentType).price;
    const currentPrice = parseInt(price.value, DECIMAL);
    return currentPrice >= minPrice;
  };

  const getRoomsOrCapacityValidate = () => {
    clearErrorTextTag(rooms, capacity);

    const roomsCount = parseInt(rooms.value, DECIMAL);
    const capacityCount = parseInt(capacity.value, DECIMAL);

    return roomsCount === NOT_FOR_GUESTS
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  const getPriceErrorMessage = () =>
    `Минимальная цена от ${getMinPrice(type[type.selectedIndex].value).price} `;

  const getRoomsOrCapacityErrorMessage = () => 'Неверное значение';

  pristine.addValidator(price, getPriceValidate, getPriceErrorMessage);

  pristine.addValidator(
    rooms,
    getRoomsOrCapacityValidate,
    getRoomsOrCapacityErrorMessage
  );

  pristine.addValidator(
    capacity,
    getRoomsOrCapacityValidate,
    getRoomsOrCapacityErrorMessage
  );

  type.addEventListener('input', () => priceDispatchEvent(adFormElements));

  price.addEventListener('input', () => priceOnInput(adFormElements));

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      form.submit();
    }
  });
};
