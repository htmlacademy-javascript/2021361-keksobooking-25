const forms = [...document.forms];

/**
 * @callback NodeSwitcher
 * @param {HTMLElement} node элемент, который переключить
 * @returns {void}
 */
/**
 *
 * @param { 'setAttribute' | 'removeAttribute' } methodName флаг в какое состояние переключить
 * @returns {NodeSwitcher}
 */
const makeSwitcher = (methodName) => (node) => node[methodName]('disabled', 'disabled');

/**
 *
 * @param {HTMLFormElement} node форма которую переключить
 * @param {NodeSwitcher} switcher флаг в какое состояние переключить
 */
const switchChildren = (node, switcher) => {
  [...node.elements].forEach(switcher);
};

export const disableForms = () => {
  forms.forEach((form) => {//плохой тон использовать глобальные переменные во внутренних модулях
    form.classList.add('ad-form--disabled');
    switchChildren(form, makeSwitcher('setAttribute'));//уже лучше
  });
};

export const enableForms = () => {
  forms.forEach((form) => {
    form.classList.remove('ad-form--disabled');
    switchChildren(form, makeSwitcher('removeAttribute'));
  });
};

export const hideNode = (node) => {
  node.classList.add('visually-hidden');
};
