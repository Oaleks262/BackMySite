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


const wrapper = document.querySelector('.testimonial__wrapper');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const cards = document.querySelectorAll('.testimonial__card');

let currentIndex = 0;
let cardsToShow = 2;
let cardWidth = 0;

function updateCardSettings() {
  const windowWidth = window.innerWidth;

  // Визначаємо скільки карт показувати
  if (windowWidth < 1280) {
    cardsToShow = 1;
  } else {
    cardsToShow = 2;
  }

  // Динамічно визначаємо ширину першої картки (враховуючи margin)
  if (cards.length > 0) {
    const cardStyle = getComputedStyle(cards[0]);
    const width = cards[0].offsetWidth;
    const marginRight = parseInt(cardStyle.marginRight) || 0;
    const marginLeft = parseInt(cardStyle.marginLeft) || 0;
    cardWidth = width + marginRight + marginLeft;
  }
}

function updateSlider() {
  const offset = currentIndex * cardWidth;
  wrapper.scrollTo({
    left: offset,
    behavior: 'smooth'
  });
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - cardsToShow) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener('resize', () => {
  updateCardSettings();
  updateSlider(); // щоб не залипало після зміни ширини
});

// Початкова ініціалізація
updateCardSettings();
updateSlider();



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