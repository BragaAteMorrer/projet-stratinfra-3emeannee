document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const title = document.getElementById("month-title");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");
  
    let currentDate = new Date();
  
    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
    function renderCalendar(date) {
      calendar.innerHTML = "";
  
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const offset = firstDay === 0 ? 6 : firstDay - 1;
  
      const raw = localStorage.getItem("events");
      const events = raw ? JSON.parse(raw) : [];
  
      title.textContent = `${monthNames[month]} ${year}`;
  
      // Cases vides avant le premier jour du mois
      for (let i = 0; i < offset; i++) {
        calendar.appendChild(document.createElement("div"));
      }
  
      // Remplir les jours
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement("div");
        cell.innerHTML = `<strong>${day}</strong>`;
  
        const dayEvents = events.filter(e => e.date === dateStr);
        dayEvents.forEach((e) => {
          const evt = document.createElement("div");
          evt.className = "event";
  
          const text = document.createElement("span");
          text.textContent = `${e.time} - ${e.title}`;
  
          const del = document.createElement("button");
          del.textContent = "❌";
          del.className = "delete-btn";
          del.setAttribute("aria-label", `Supprimer l'événement ${e.title}`);
  
          del.addEventListener("click", () => {
            const allEvents = JSON.parse(localStorage.getItem("events")) || [];
            const updated = allEvents.filter(ev =>
              !(ev.title === e.title && ev.date === e.date && ev.time === e.time)
            );
            localStorage.setItem("events", JSON.stringify(updated));
            renderCalendar(currentDate);
          });
  
          evt.appendChild(text);
          evt.appendChild(del);
          cell.appendChild(evt);
        });
  
        calendar.appendChild(cell);
      }
    }
  
    prevBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
  
    nextBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  
    renderCalendar(currentDate);
  });
  