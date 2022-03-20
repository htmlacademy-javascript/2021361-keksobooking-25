const NOT_FOR_GUESTS = 100;
const DECIMAL_SYS = 10;

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

export const validateAdForm = (elms) => {
  const pristine = new window.Pristine(elms.form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  /**
   * Функция обновляет (очищает) содержимое сообщений об ошибках
   * @param {Array} errorTextTags - массив тегов с классом '.form__error'
   */
  const clearErrorTextTag = (errorTextTags) => {
    errorTextTags
      .filter((errorTextTag) => errorTextTag !== null)
      .forEach((errorTextTag) => (errorTextTag.textContent = ''));
  };

  const getPriceValidate = () => {
    const minPrice = parseInt(
      elms.type[elms.type.selectedIndex].dataset['minprice'],
      DECIMAL_SYS
    );
    const currentPrice = parseInt(elms.price.value, DECIMAL_SYS);

    return currentPrice >= minPrice;
  };

  const getRoomsOrCapacityValidate = () => {
    const errorTextTags = [];
    errorTextTags.push(elms.rooms.parentElement.querySelector('.form__error'));
    errorTextTags.push(
      elms.capacity.parentElement.querySelector('.form__error')
    );
    clearErrorTextTag(errorTextTags);

    const roomsCount = parseInt(elms.rooms.value, DECIMAL_SYS);
    const capacityCount = parseInt(elms.capacity.value, DECIMAL_SYS);

    return roomsCount === NOT_FOR_GUESTS
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  const getPriceErrorMessage = () => 'price error';

  const getRoomsErrorMessage = () => 'rooms error';

  const getCapacityErrorMessage = () => 'capacity error';

  pristine.addValidator(elms.price, getPriceValidate, getPriceErrorMessage);

  pristine.addValidator(
    elms.rooms,
    getRoomsOrCapacityValidate,
    getRoomsErrorMessage
  );

  pristine.addValidator(
    elms.capacity,
    getRoomsOrCapacityValidate,
    getCapacityErrorMessage
  );

  elms.type.addEventListener('change', () => {
    elms.price.value = null;
    elms.price.placeholder =
      elms.type[elms.type.selectedIndex].dataset['minprice'];
    const errorTextTags = [];
    errorTextTags.push(elms.price.parentElement.querySelector('.form__error'));
    clearErrorTextTag(errorTextTags);
  });

  elms.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      elms.form.submit();
    }
  });
};

export const setSelectedPricePlaceholder = (elms) => {
  elms.price.placeholder =
    elms.type[elms.type.selectedIndex].dataset['minprice'];
};

export const setTimeinTimeoutSyncrhro = (elms) => {

  elms.timein.addEventListener('change', () => {
    elms.timeout.value = elms.timein.value;
  });

  elms.timeout.addEventListener('change', () => {
    elms.timein.value = elms.timeout.value;
  });
};
