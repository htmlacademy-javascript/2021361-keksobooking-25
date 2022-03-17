import { createDemoObject } from './data.js';
import { renderDemoObjects } from './template.js';
import { disableForms, enableForms } from './forms.js';
import { validateAdForm } from './forms.js';

const globalForms = [...document.forms];
const demoObjects = Array.from({ length: 10 }, createDemoObject);
renderDemoObjects(demoObjects);
disableForms(globalForms);
enableForms(globalForms);
validateAdForm();
