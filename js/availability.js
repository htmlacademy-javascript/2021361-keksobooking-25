const forms = [];
forms.push(document.querySelector('.ad-form'));
forms.push(document.querySelector('.map__filters'));

/**
 *
 * @param {boolean} off флаг для выбора метода
 * @returns {
   'setAttribute' | 'removeAttribute'
 }
 */
const setOrRemove = (off)=>off?'setAttribute':'removeAttribute';

/**
 * @callback NodeSwitcher
 * @param {HTMLElement} node элемент, который переключить
 * @returns {void}
 */
/**
 *
 * @param {boolean} off флаг в какое состояние переключить
 * @returns {NodeSwitcher}
 */
const makeSwitcher = (off) => (node) => node[setOrRemove(off)]('disabled', 'disabled');

/**
 *
 * @param {HTMLFormElement} node форма которую переключить
 * @param {NodeSwitcher} switcher флаг в какое состояние переключить
 */
const switchChildren = (node, switcher) => {
  [...node.elements].forEach(switcher);
};

export const disableForms = () => {
  forms.forEach((form) => {
    form.classList.add('ad-form--disabled');
    switchChildren(form, makeSwitcher(true));//все еще анти-паттерн
  });
};

export const enableForms = () => {
  forms.forEach((form) => {
    form.classList.remove('ad-form--disabled');
    switchChildren(form, makeSwitcher(false));
  });
};

export const hideNode = (node) => {
  node.classList.add('visually-hidden');
};
