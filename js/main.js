import { createDemoObject } from './data.js';
import { renderDemoObjects } from './template.js';

const demoObjects = Array.from({ length: 10 }, createDemoObject);
renderDemoObjects(demoObjects);
