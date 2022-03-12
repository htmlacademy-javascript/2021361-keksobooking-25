const forms = [];
forms.push(document.querySelector('.ad-form'));
forms.push(document.querySelector('.map__filters'));

/**
 * 
 * @param {HTMLFormElement} node форма которую переключить
 * @param {boolean} off флаг в какое состояние переключить
 */
const switchChildren = (node, off) => {
  for (const child of node.children) {
    if (off) {
      child.setAttribute('disabled', 'disabled');
    } else {
      child.removeAttribute('disabled', 'disabled');
    }
  }
};

export const disableForms = () => {
  forms.forEach((form) => {
    form.classList.add('ad-form--disabled');
    switchChildren(form, true);
  });
};

export const enableForms = () => {
  forms.forEach((form) => {
    form.classList.remove('ad-form--disabled');
    switchChildren(form, false);
  });
};

export const hideNode = (node) => {
  node.classList.add('visually-hidden');
};
