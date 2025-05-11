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