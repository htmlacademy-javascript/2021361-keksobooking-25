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
