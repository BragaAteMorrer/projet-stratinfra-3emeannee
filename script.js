// script.js
(function () {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const html = document.documentElement;
  
    // Thème automatique clair/sombre
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('theme-dark');
    } else {
      html.classList.add('theme-light');
    }
  
    // Qualité de connexion
    if (connection) {
      const type = connection.effectiveType;
      if (['slow-2g', '2g'].includes(type)) {
        html.classList.add('mode-basic');
      } else if (type === '3g') {
        html.classList.add('mode-medium');
      } else {
        html.classList.add('mode-detailed');
      }
  
      if (connection.saveData) {
        html.classList.add('mode-basic');
      }
    } else {
      // Par défaut, mode moyen
      html.classList.add('mode-medium');
    }
  })();
  