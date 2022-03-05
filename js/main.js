import { createDemoObject } from './data.js';

const demoObjects = Array.from({ length: 10 }, createDemoObject);
// eslint-disable-next-line no-console
console.log(demoObjects);
