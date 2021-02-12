const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const modernPath = path.resolve('dist-modern', 'index.html');
const modernDOM = new JSDOM(fs.readFileSync(modernPath, { encoding: 'utf8' }));

const indexPath = path.resolve('dist-modern', 'index.html');
const indexDOM = new JSDOM(fs.readFileSync(indexPath, { encoding: 'utf8' }));

let modernScript = modernDOM.window.document.querySelector('script[src*="ember-lower-js"]');

function copyToDist(scriptSrc) {
  let currentPath = path.resolve('dist-modern', scriptSrc.substring(1));
  let newPath = path.resolve('dist', `${scriptSrc.slice(1,-3)}.modern.js`);
  fs.renameSync(currentPath, newPath);
}

function writeModernScriptToFile(dom, modernScript) {
  const script = dom.window.document.querySelector('script[data-modern-script]');
  script.setAttribute('src', `${modernScript.getAttribute('src').slice(0,-3)}.modern.js`);
  script.setAttribute('integrity', modernScript.getAttribute('integrity'));
}

copyToDist(modernScript.getAttribute('src'));
writeModernScriptToFile(indexDOM, modernScript);

const newHTML = indexDOM.serialize();

fs.writeFileSync(path.resolve('dist', 'index.html'), newHTML);
rimraf.sync('dist-modern');
