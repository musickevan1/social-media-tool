(function(){
  const container = document.createElement('div');
  container.id = 'sgb-root';
  document.body.appendChild(container);

  function loadScript(src) {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      document.body.appendChild(s);
    });
  }

  async function init(){
    await loadScript(chrome.runtime.getURL('libs/react.min.js'));
    await loadScript(chrome.runtime.getURL('libs/react-dom.min.js'));
    await loadScript(chrome.runtime.getURL('app.js'));

    // Mount the React application using the new root API
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(window.SGBApp));
  }

  init();
})();
