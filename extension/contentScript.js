(function(){
  const root = document.createElement('div');
  root.id = 'sgb-root';
  document.body.appendChild(root);

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
  }

  init();
})();
