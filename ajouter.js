document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const message = document.getElementById("message");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
  
      if (!title || !date || !time) {
        message.textContent = "Tous les champs sont obligatoires.";
        return;
      }
  
      const newEvent = { title, date, time };
  
      // Récupération des événements actuels
      const existing = JSON.parse(localStorage.getItem("events")) || [];
  
      // Ajout du nouveau
      existing.push(newEvent);
  
      // Sauvegarde dans le localStorage
      localStorage.setItem("events", JSON.stringify(existing));
  
      // Confirmation visuelle
      message.textContent = "Événement ajouté avec succès !";
  
      // Réinitialiser le formulaire
      form.reset();
    });
  });
  