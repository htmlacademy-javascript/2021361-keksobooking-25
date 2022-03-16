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

export const disableForms = (forms) => {
  forms.forEach((form) => {
    form.classList.add('ad-form--disabled');
    switchChildren(form, switchTo('setAttribute'));
  });
};

export const enableForms = (forms) => {
  forms.forEach((form) => {
    form.classList.remove('ad-form--disabled');
    switchChildren(form, switchTo('removeAttribute'));
  });
};

export const hideNode = (node) => {
  node.classList.add('visually-hidden');
};

export const validateAdForm = () => {
  const form = document.querySelector('.ad-form');
  const rooms = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');

  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  const removeErrorMsg = () => {
    const errorMsg = [];
    errorMsg.push(rooms.parentElement.querySelector('.form__error'));
    errorMsg.push(capacity.parentElement.querySelector('.form__error'));
    errorMsg
      .filter((error) => error !== null)
      .forEach((error) => (error.textContent = ''));
  };

  const getValidateRoomsOrCapacity = () => {
    const roomsCount = parseInt(rooms.value, 10);
    const capacityCount = parseInt(capacity.value, 10);
    removeErrorMsg();
    return roomsCount === 100
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  const getRoomsErrorMessage = () => 'rooms error';

  const getCapacityErrorMessage = () => 'capacity error';

  pristine.addValidator(
    rooms,
    getValidateRoomsOrCapacity,
    getRoomsErrorMessage
  );

  pristine.addValidator(
    capacity,
    getValidateRoomsOrCapacity,
    getCapacityErrorMessage
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      form.submit();
    }
  });
};
