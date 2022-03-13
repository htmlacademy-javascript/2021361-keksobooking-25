import { createDemoObject } from './data.js';
import { renderDemoObjects } from './template.js';
import { disableForms, enableForms } from './availability.js';

const globalForms = [...document.forms];
const demoObjects = Array.from({ length: 10 }, createDemoObject);
renderDemoObjects(demoObjects);
disableForms(globalForms);
setTimeout(() => enableForms(globalForms), 1500);
