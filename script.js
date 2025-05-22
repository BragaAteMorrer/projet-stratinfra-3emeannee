// script.js
(function () {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const html       = document.documentElement;
  
    // 🎨 Thème auto clair/sombre
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('theme-dark');
    } else {
      html.classList.add('theme-light');
    }
  
    // 📶 Qualité de la connexion → modes visuels
    if (connection) {
      html.classList.remove('mode-basic','mode-medium','mode-intermediate','mode-detailed');
      const type = connection.effectiveType; // 'slow-2g'|'2g'|'3g'|'4g'
      const dl   = connection.downlink;      // Mbps (ex: 1.25)
  
      if (['slow-2g','2g'].includes(type)) {
        html.classList.add('mode-basic');
      }
      else if (type === '3g' && dl < 1.25) {
        html.classList.add('mode-medium');
      }
      else if (type === '3g' && dl >= 1.25) {
        html.classList.add('mode-intermediate');
      }
      else if (type === '4g') {
        html.classList.add('mode-detailed');
      }
      else {
        html.classList.add('mode-medium');
      }
    } else {
      html.classList.add('mode-medium');
    }
  
    // ✨ Formulaire de séance
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('form-seance');
      const successMsg = document.getElementById('form-success');
      if (!form) return;
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
  
        // Réinitialisation des messages
        successMsg.textContent = '';
        successMsg.style.display = 'none';
  
        form.querySelectorAll('input').forEach(input => {
          const err = document.getElementById(`error-${input.id}`);
          input.classList.remove('erreur');
          input.removeAttribute('aria-invalid');
          err.textContent = '';
          err.style.display = 'none';
          err.setAttribute('aria-hidden','true');
        });
  
        // Validation
        ['client','exercice'].forEach(id => {
          const input = document.getElementById(id);
          if (!input.value.trim()) {
            valid = false;
            const err = document.getElementById(`error-${id}`);
            input.classList.add('erreur');
            input.setAttribute('aria-invalid','true');
            err.textContent = 'Ce champ est obligatoire';
            err.style.display = 'block';
            err.removeAttribute('aria-hidden');
          }
        });
  
        if (!valid) {
          document.querySelector('input.erreur').focus();
          return;
        }
  
        // Simulé
        console.log('Envoi séance:', {
          client: form.client.value.trim(),
          exercice: form.exercice.value.trim(),
          date: form.date.value,
          duree: form.duree.value.trim()
        });
        form.reset();
        successMsg.textContent = '✅ Séance enregistrée !';
        successMsg.style.display = 'block';
      });
    });
  
    // ─── Synthèse vocale / Navigation clavier ───
    document.addEventListener('DOMContentLoaded', () => {
      const synth = window.speechSynthesis;
      if (!synth) return;
  
      let lastText = '', utter = null;
      function speak(txt) {
        if (utter) synth.cancel();
        utter = new SpeechSynthesisUtterance(txt);
        utter.lang = 'fr-FR';
        synth.speak(utter);
      }
  
      // Lire au survol ou au focus
      ['mouseover','focusin'].forEach(evt =>
        document.body.addEventListener(evt, e => {
          const txt = e.target.innerText?.trim();
          if (txt && txt !== lastText && txt.length<200) {
            speak(txt);
            lastText = txt;
          }
        })
      );
      ['mouseout','focusout'].forEach(evt =>
        document.body.addEventListener(evt, () => {
          if (utter) synth.cancel();
          lastText = '';
        })
      );
  
      // Flèches ←/→ dans le menu
      const navLinks = Array.from(document.querySelectorAll('nav ul li a'));
      navLinks.forEach((a,i) => {
        a.addEventListener('keydown', e => {
          if (e.key==='ArrowRight' || e.key==='ArrowLeft') {
            e.preventDefault();
            const dir = e.key==='ArrowRight'?1:-1;
            const nxt = (i+dir+navLinks.length) % navLinks.length;
            navLinks[nxt].focus();
          }
        });
      });
  
      // Flèches ↑/↓ entre sections
      const secs = Array.from(document.querySelectorAll('main section'));
      secs.forEach((sec,i) => {
        sec.addEventListener('keydown', e => {
          if (e.key==='ArrowDown' || e.key==='ArrowUp') {
            e.preventDefault();
            const dir = e.key==='ArrowDown'?1:-1;
            const tgt = secs[i+dir];
            if (tgt) {
              const h2 = tgt.querySelector('h2');
              h2.focus();
              h2.scrollIntoView({behavior:'smooth'});
            }
          }
        });
      });
    });
  
  })();
  