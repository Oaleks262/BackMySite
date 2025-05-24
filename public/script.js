const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("icon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

const saved = localStorage.getItem("theme") || "light";
setTheme(saved);


const toggleBtnMob = document.getElementById("themeToggleMob");
const iconMob = document.getElementById("icon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

toggleBtnMob.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

const savedMob = localStorage.getItem("theme") || "light";
setTheme(savedMob);



// const langButtons = document.querySelectorAll(".lang-btn");

// function updateActiveLangButton(lang) {
//   langButtons.forEach(btn => {
//     const btnLang = btn.getAttribute("data-lang");
//     if (btnLang === lang) {
//       btn.classList.add("active");
//     } else {
//       btn.classList.remove("active");
//     }
//   });
// }

// langButtons.forEach(btn => {
//   btn.addEventListener("click", () => {
//     const lang = btn.getAttribute("data-lang");
//     translate(lang);                 
//     updateActiveLangButton(lang);        
//     localStorage.setItem("lang", lang);  
//   });
// });

// // Перший запуск
// const savedLang = localStorage.getItem("lang") || "uk";
// translate(savedLang);
// updateActiveLangButton(savedLang);

document.querySelectorAll('.accordion__content__li').forEach((item) => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.accordion-answer');
    const icon = item.querySelector('.accordion-icon');

    item.classList.toggle('active');
    answer.classList.toggle('watch');
    answer.classList.toggle('dontwatch');
  });
});




 const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const menu = document.getElementById('mobileMenu');

    openBtn.addEventListener('click', () => {
      menu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
    });

    // Закриваємо меню при кліку на посилання
    const menuLinks = document.querySelectorAll('.header__mob__menu__list a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });