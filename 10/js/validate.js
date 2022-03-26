import { DECIMAL_SYS, NOT_FOR_GUESTS } from './util.js';

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

export const validateAdForm = (adFormElements) => {
  const { form, type, price, rooms, capacity, slider } = adFormElements;

  const pristine = new window.Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  const getPriceValidate = () => {
    const minPrice = parseInt(
      type[type.selectedIndex].dataset['minprice'],
      DECIMAL_SYS
    );
    const currentPrice = parseInt(price.value, DECIMAL_SYS);

    return currentPrice >= minPrice;
  };

  const getRoomsOrCapacityValidate = () => {
    clearErrorTextTag(rooms, capacity);

    const roomsCount = parseInt(rooms.value, DECIMAL_SYS);
    const capacityCount = parseInt(capacity.value, DECIMAL_SYS);

    return roomsCount === NOT_FOR_GUESTS
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  const getPriceErrorMessage = () => 'price error';

  const getRoomsErrorMessage = () => 'rooms error';

  const getCapacityErrorMessage = () => 'capacity error';

  pristine.addValidator(price, getPriceValidate, getPriceErrorMessage);

  pristine.addValidator(
    rooms,
    getRoomsOrCapacityValidate,
    getRoomsErrorMessage
  );

  pristine.addValidator(
    capacity,
    getRoomsOrCapacityValidate,
    getCapacityErrorMessage
  );

  type.addEventListener('input', () => {
    price.value = null;
    slider.noUiSlider.reset();

    price.placeholder = type[type.selectedIndex].dataset['minprice'];
    clearErrorTextTag(price);
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      form.submit();
    }
  });
};
