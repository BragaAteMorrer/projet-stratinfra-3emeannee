// script.js
(function () {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const html = document.documentElement;

  // 🎨 Thème automatique clair/sombre selon la préférence de l'utilisateur
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('theme-dark');
  } else {
    html.classList.add('theme-light');
  }

  // 📶 Détection de la qualité de la connexion réseau
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
    // 🔄 Fallback par défaut : mode moyen
    html.classList.add('mode-medium');
  }

  // ✅ Validation accessible du formulaire + message de succès + réinitialisation
  document.addEventListener("DOMContentLoaded", function () {
    const formulaire = document.getElementById("form-seance");
    const messageSucces = document.getElementById("form-success");

    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();
      let formulaireValide = true;

      const champs = [
        { id: "client", requis: true, message: "Le nom du client est requis." },
        { id: "objectif", requis: false, message: "Il est conseillé de définir un objectif." },
        { id: "exercice", requis: true, message: "Le nom de l’exercice est requis." }
      ];

      // Réinitialiser les messages de succès et erreurs
      messageSucces.textContent = "";
      messageSucces.style.display = "none";

      champs.forEach((champ) => {
        const input = document.getElementById(champ.id);
        const message = document.getElementById(`error-${champ.id}`);

        input.classList.remove("erreur");
        input.removeAttribute("aria-invalid");
        message.textContent = "";
        message.style.display = "none";
        message.setAttribute("aria-hidden", "true");

        const valeur = input.value.trim();

        if (champ.requis && valeur === "") {
          formulaireValide = false;
          input.classList.add("erreur");
          input.setAttribute("aria-invalid", "true");
          message.textContent = champ.message;
          message.style.display = "block";
          message.removeAttribute("aria-hidden");
        }

        if (!champ.requis && valeur === "") {
          message.textContent = champ.message;
          message.style.display = "block";
          message.removeAttribute("aria-hidden");
        }
      });

      if (formulaireValide) {
        messageSucces.textContent = "✅ Données enregistrées !";
        messageSucces.style.display = "block";

        // Réinitialiser le formulaire
        formulaire.reset();

        // Nettoyer les messages après soumission
        champs.forEach((champ) => {
          const message = document.getElementById(`error-${champ.id}`);
          message.textContent = "";
          message.style.display = "none";
          message.setAttribute("aria-hidden", "true");
        });
      } else {
        // Placer le focus sur le premier champ erroné
        const premierChampEnErreur = document.querySelector("input.erreur");
        if (premierChampEnErreur) {
          premierChampEnErreur.focus();
        }
      }
    });
  });
})();