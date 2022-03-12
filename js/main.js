import { createDemoObject } from './data.js';
import { renderDemoObjects } from './template.js';
import { disableForms, enableForms } from './availability.js';

const demoObjects = Array.from({ length: 10 }, createDemoObject);
renderDemoObjects(demoObjects);
disableForms();
enableForms();
