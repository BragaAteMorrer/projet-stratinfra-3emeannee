document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("event-list");
    if (!list) return;
  
    list.innerHTML = "";
  
    const events = [
      "09:00 - Réunion d’équipe",
      "11:30 - Appel client",
      "14:00 - Pause café",
      "16:00 - Point hebdomadaire"
    ];
  
    events.forEach(event => {
      const li = document.createElement("li");
      li.textContent = event;
      list.appendChild(li);
    });
  });
  