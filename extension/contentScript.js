import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

const root = document.createElement('div');
root.id = 'sgb-root';
document.body.appendChild(root);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('style.css');
document.head.appendChild(link);

ReactDOM.render(React.createElement(App), root);
