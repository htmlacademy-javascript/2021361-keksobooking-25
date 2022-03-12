const globalForms = [...document.forms];

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

/**
 *
 * @param {HTMLFormElement[]} forms список форм которые заморозить.
 */
export const disableForms = (forms = globalForms) => {
  forms.forEach((form) => {
    form.classList.add('ad-form--disabled');
    switchChildren(form, makeSwitcher('setAttribute'));//уже лучше
  });
};

export const enableForms = () => {
  globalForms.forEach((form) => {
    form.classList.remove('ad-form--disabled');
    switchChildren(form, makeSwitcher('removeAttribute'));
  });
};

export const hideNode = (node) => {
  node.classList.add('visually-hidden');
};
