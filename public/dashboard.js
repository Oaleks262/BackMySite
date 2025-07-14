// Dashboard functionality with new template specifications
let selectedTemplate = null;
let currentOrder = null;

// API Configuration
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:4444' 
    : 'https://growth-tech.com.ua',
  
  endpoints: {
    auth: '/api/auth',
    orders: '/api/orders',
    contact: '/api/contact',
    payment: '/api/payment',
    upload: '/api/upload',
    templates: '/api/templates',
    profile: '/api/profile',
    website: '/api/website',
    admin: '/api/admin'
  }
};

// Helper function to get full API URL
function getAPIUrl(endpoint) {
  const fullUrl = `${API_CONFIG.baseURL}${endpoint}`;
  console.log('API Request URL:', fullUrl);
  return fullUrl;
}

// Template configurations based on new specifications
const templateConfigs = {
  single: {
    name: 'Односторінковий сайт',
    price: 350,
    description: 'Підходить для презентації однієї послуги або продукту',
    sections: ['hero', 'about', 'benefits', 'services', 'testimonials', 'portfolio', 'faq', 'contact']
  },
  landing: {
    name: 'Лендінг (2-4 сторінки)',
    price: 450,
    description: 'Для складнішої структури та сегментації контенту',
    pages: ['home', 'services', 'about', 'contacts', 'reviews']
  },
  blog: {
    name: 'Блог / Статейний сайт',
    price: 950,
    description: 'Головна з публікаціями, сторінки статей, пошук, коментарі',
    features: ['home', 'articles', 'author', 'contacts', 'search', 'comments']
  }
};

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    alert('Будь ласка, увійдіть в систему');
    window.location.href = '/';
    return;
  }
  
  // Update user display
  document.getElementById('userNameDisplay').textContent = `${user.firstName} ${user.lastName}`;
  
  // Update mobile user display
  const mobileUserDisplay = document.getElementById('userNameDisplayMob');
  if (mobileUserDisplay) {
    mobileUserDisplay.textContent = `${user.firstName} ${user.lastName}`;
  }
  
  // Initialize theme
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
  
  // Load existing order if any
  loadUserOrder();
  
  // Set up password change button listeners
  const passwordBtn = document.getElementById('passwordChangeBtn');
  if (passwordBtn) {
    console.log('Password button found, adding event listener');
    passwordBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Password button clicked');
      openPasswordModal();
    });
  } else {
    console.error('Password button not found');
  }
  
  const passwordBtnMob = document.getElementById('passwordChangeBtnMob');
  if (passwordBtnMob) {
    console.log('Mobile password button found, adding event listener');
    passwordBtnMob.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Mobile password button clicked');
      openPasswordModal();
    });
  } else {
    console.error('Mobile password button not found');
  }
  
  // Set up logout button listeners
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  const logoutBtnMob = document.getElementById('logoutBtnMob');
  if (logoutBtnMob) {
    logoutBtnMob.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  // Set up template selection will be called after loading order
  
  // Set up password form
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const currentPassword = formData.get('currentPassword');
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmPassword');
      
      // Validate passwords match
      if (newPassword !== confirmPassword) {
        showAlert('Нові паролі не співпадають', 'error');
        return;
      }
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(getAPIUrl('/api/auth/change-password'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          showAlert('Пароль успішно змінено!', 'success');
          closePasswordModal();
        } else {
          showAlert(result.error || 'Помилка при зміні пароля', 'error');
        }
      } catch (error) {
        console.error('Password change error:', error);
        showAlert('Помилка при зміні пароля. Спробуйте пізніше.', 'error');
      }
    });
  }
});

// Filter templates based on user's tariff type
function filterTemplatesByTariff(tariffType) {
  const templateCards = document.querySelectorAll('.template-card');
  
  templateCards.forEach(card => {
    const templateType = card.dataset.template;
    
    if (tariffType && templateType !== tariffType) {
      // Hide templates that don't match user's tariff
      card.style.display = 'none';
    } else {
      // Show only the user's tariff template
      card.style.display = 'block';
      
      // If this is the user's tariff, auto-select it
      if (templateType === tariffType) {
        card.classList.add('selected');
        selectedTemplate = templateType;
        
        // Generate configuration form
        generateConfigForm(selectedTemplate);
        
        // Update order summary
        updateOrderSummary();
        
        // Show sections config
        document.getElementById('sectionsConfig').style.display = 'block';
      }
    }
  });
  
  // Update header text to indicate single tariff
  if (tariffType) {
    const templateSection = document.querySelector('.template-selection h2');
    if (templateSection) {
      const config = templateConfigs[tariffType];
      if (config) {
        templateSection.textContent = `Ваш тариф: ${config.name}`;
      }
    }
  }
}

// Setup template selection
function setupTemplateSelection() {
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', function() {
      // Remove previous selection
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
      
      // Select current template
      this.classList.add('selected');
      selectedTemplate = this.dataset.template;
      
      // Generate configuration form
      generateConfigForm(selectedTemplate);
      
      // Update order summary
      updateOrderSummary();
      
      // Show sections config
      document.getElementById('sectionsConfig').style.display = 'block';
      
      // Scroll to sections
      document.getElementById('sectionsConfig').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Generate configuration form based on template
function generateConfigForm(template) {
  const config = templateConfigs[template];
  const container = document.getElementById('dynamicSections');
  const title = document.getElementById('configTitle');
  
  title.textContent = `Налаштування: ${config.name}`;
  
  let html = '';
  
  switch (template) {
    case 'single':
      html = generateOnePageForm();
      break;
    case 'landing':
      html = generateLandingForm();
      break;
    case 'blog':
      html = generateBlogForm();
      break;
  }
  
  container.innerHTML = html;
  
  // Add event listeners after HTML is inserted
  setupFormListeners(template);
}

// Generate one-page site form
function generateOnePageForm() {
  return `
    <div class="section-block">
      <h3>🎯 Hero секція</h3>
      <p class="section-description">Привабливий заголовок, підзаголовок, CTA кнопка</p>
      
      <div class="form-group">
        <label for="heroTitle">Заголовок *</label>
        <input type="text" id="heroTitle" placeholder="Назва вашої послуги або продукту">
      </div>
      
      <div class="form-group">
        <label for="heroSubtitle">Підзаголовок *</label>
        <input type="text" id="heroSubtitle" placeholder="Короткий опис того, що ви пропонуєте">
      </div>
      
      <div class="form-group">
        <label for="heroButton">Текст CTA кнопки *</label>
        <input type="text" id="heroButton" placeholder="Замовити, Зв'язатися, Дізнатися більше">
      </div>
    </div>

    <div class="section-block">
      <h3>📝 Про нас / Про продукт</h3>
      <p class="section-description">Короткий опис того, що ви пропонуєте</p>
      
      <div class="form-group">
        <label for="aboutTitle">Заголовок секції *</label>
        <input type="text" id="aboutTitle" placeholder="Про нас, Про продукт, Хто ми">
      </div>
      
      <div class="form-group">
        <label for="aboutText">Опис *</label>
        <textarea id="aboutText" rows="4" placeholder="Розкажіть детальніше про вашу діяльність, продукт або послугу"></textarea>
      </div>
    </div>

    <div class="section-block">
      <h3>⭐ Переваги / Чому ми</h3>
      <p class="section-description">3-6 блоків з іконками або цифрами</p>
      
      <div class="form-group">
        <label for="benefitsTitle">Заголовок секції *</label>
        <input type="text" id="benefitsTitle" placeholder="Наші переваги, Чому обирають нас">
      </div>
      
      <div class="benefits-list" id="benefitsList">
        <div class="benefit-item">
          <input type="text" placeholder="Перевага 1" class="benefit-title">
          <textarea placeholder="Опис переваги 1" rows="2" class="benefit-desc"></textarea>
        </div>
        <div class="benefit-item">
          <input type="text" placeholder="Перевага 2" class="benefit-title">
          <textarea placeholder="Опис переваги 2" rows="2" class="benefit-desc"></textarea>
        </div>
        <div class="benefit-item">
          <input type="text" placeholder="Перевага 3" class="benefit-title">
          <textarea placeholder="Опис переваги 3" rows="2" class="benefit-desc"></textarea>
        </div>
      </div>
      <button type="button" class="add-benefit-btn" onclick="addBenefit()">+ Додати перевагу</button>
    </div>

    <div class="section-block">
      <h3>🛍️ Послуги / Продукти</h3>
      <p class="section-description">Список з цінами або коротким описом</p>
      
      <div class="form-group">
        <label for="servicesTitle">Заголовок секції *</label>
        <input type="text" id="servicesTitle" placeholder="Наші послуги, Що ми пропонуємо">
      </div>
      
      <div class="services-list" id="servicesList">
        <div class="service-item">
          <input type="text" placeholder="Назва послуги 1" class="service-name">
          <textarea placeholder="Опис та ціна" rows="2" class="service-desc"></textarea>
        </div>
        <div class="service-item">
          <input type="text" placeholder="Назва послуги 2" class="service-name">
          <textarea placeholder="Опис та ціна" rows="2" class="service-desc"></textarea>
        </div>
      </div>
      <button type="button" class="add-service-btn" onclick="addService()">+ Додати послугу</button>
    </div>

    <div class="section-block">
      <h3>💬 Відгуки</h3>
      <p class="section-description">1-3 коментарі клієнтів</p>
      
      <div class="form-group">
        <label for="testimonialsTitle">Заголовок секції</label>
        <input type="text" id="testimonialsTitle" placeholder="Відгуки клієнтів, Що кажуть про нас">
      </div>
      
      <div class="testimonials-list" id="testimonialsList">
        <div class="testimonial-item">
          <input type="text" placeholder="Ім'я клієнта" class="testimonial-name">
          <input type="text" placeholder="Компанія / Посада" class="testimonial-company">
          <textarea placeholder="Текст відгуку" rows="3" class="testimonial-text"></textarea>
        </div>
      </div>
      <button type="button" class="add-testimonial-btn" onclick="addTestimonial()">+ Додати відгук</button>
    </div>

    <div class="section-block">
      <h3>🎨 Портфоліо / Приклади (опціонально)</h3>
      <p class="section-description">2-4 кейси ваших робіт</p>
      
      <div class="form-group">
        <label for="includePortfolio">Включити секцію портфоліо?</label>
        <input type="checkbox" id="includePortfolio" onchange="togglePortfolioSection()">
      </div>
      
      <div id="portfolioSection" style="display: none;">
        <div class="form-group">
          <label for="portfolioTitle">Заголовок секції</label>
          <input type="text" id="portfolioTitle" placeholder="Наші роботи, Портфоліо, Приклади">
        </div>
        
        <div class="portfolio-list" id="portfolioList">
          <div class="portfolio-item">
            <input type="text" placeholder="Назва проєкту" class="portfolio-name">
            <textarea placeholder="Опис проєкту" rows="2" class="portfolio-desc"></textarea>
          </div>
        </div>
        <button type="button" class="add-portfolio-btn" onclick="addPortfolioItem()">+ Додати проєкт</button>
      </div>
    </div>

    <div class="section-block">
      <h3>❓ FAQ (опціонально)</h3>
      <p class="section-description">Часті запитання</p>
      
      <div class="form-group">
        <label for="includeFAQ">Включити секцію FAQ?</label>
        <input type="checkbox" id="includeFAQ" onchange="toggleFAQSection()">
      </div>
      
      <div id="faqSection" style="display: none;">
        <div class="form-group">
          <label for="faqTitle">Заголовок секції</label>
          <input type="text" id="faqTitle" placeholder="Часті запитання, FAQ">
        </div>
        
        <div class="faq-list" id="faqList">
          <div class="faq-item">
            <input type="text" placeholder="Запитання" class="faq-question">
            <textarea placeholder="Відповідь" rows="2" class="faq-answer"></textarea>
          </div>
        </div>
        <button type="button" class="add-faq-btn" onclick="addFAQItem()">+ Додати запитання</button>
      </div>
    </div>

    <div class="section-block">
      <h3>📞 Контактна форма / CTA</h3>
      <p class="section-description">Ім'я, email, кнопка</p>
      
      <div class="form-group">
        <label for="contactTitle">Заголовок секції *</label>
        <input type="text" id="contactTitle" placeholder="Зв'яжіться з нами, Замовити консультацію">
      </div>
      
      <div class="form-group">
        <label for="contactText">Текст над формою</label>
        <textarea id="contactText" rows="2" placeholder="Залиште заявку і ми зв'яжемося з вами"></textarea>
      </div>
      
      <div class="form-group">
        <label for="contactButton">Текст кнопки форми *</label>
        <input type="text" id="contactButton" placeholder="Відправити, Замовити, Зв'язатися">
      </div>
    </div>

    <div class="section-block">
      <h3>🔗 Футер</h3>
      <p class="section-description">Соціальні мережі, контактні дані, копірайт</p>
      
      <div class="form-group">
        <label for="footerPhone">Телефон *</label>
        <input type="tel" id="footerPhone" placeholder="+380 XX XXX XX XX">
      </div>
      
      <div class="form-group">
        <label for="footerEmail">Email *</label>
        <input type="email" id="footerEmail" placeholder="info@company.com">
      </div>
      
      <div class="form-group">
        <label for="footerAddress">Адреса</label>
        <input type="text" id="footerAddress" placeholder="м. Київ, вул. Хрещатик, 1">
      </div>
      
      <div class="form-group">
        <label for="socialLinks">Соціальні мережі (по одному на рядок)</label>
        <textarea id="socialLinks" rows="3" placeholder="Facebook: https://facebook.com/yourpage&#10;Instagram: https://instagram.com/yourpage&#10;Telegram: https://t.me/yourpage"></textarea>
      </div>
      
      <div class="form-group">
        <label for="copyrightText">Текст копірайту *</label>
        <input type="text" id="copyrightText" placeholder="© 2025 Назва компанії. Всі права захищені">
      </div>
    </div>
  `;
}

// Generate landing pages form
function generateLandingForm() {
  return `
    <div class="section-block">
      <h3>🏠 Головна сторінка</h3>
      <p class="section-description">Hero-блок, коротко про компанію, переваги, CTA</p>
      
      <div class="form-group">
        <label for="homeHeroTitle">Hero заголовок *</label>
        <input type="text" id="homeHeroTitle" placeholder="Головний заголовок сайту">
      </div>
      
      <div class="form-group">
        <label for="homeHeroSubtitle">Hero підзаголовок *</label>
        <input type="text" id="homeHeroSubtitle" placeholder="Короткий опис діяльності">
      </div>
      
      <div class="form-group">
        <label for="homeCompanyBrief">Коротко про компанію *</label>
        <textarea id="homeCompanyBrief" rows="3" placeholder="1-2 речення про вашу компанію"></textarea>
      </div>
      
      <div class="form-group">
        <label for="homeAdvantages">Переваги (через кому) *</label>
        <textarea id="homeAdvantages" rows="2" placeholder="Якість, Швидкість, Досвід, Гарантія"></textarea>
      </div>
      
      <div class="form-group">
        <label for="homeCTAButton">Текст CTA кнопки *</label>
        <input type="text" id="homeCTAButton" placeholder="Замовити послугу, Дізнатися більше">
      </div>
    </div>

    <div class="section-block">
      <h3>🛍️ Сторінка послуг/продуктів</h3>
      <p class="section-description">Детальна інформація про кожну послугу, пакети або ціни, кнопка "Замовити"</p>
      
      <div class="form-group">
        <label for="servicesPageTitle">Заголовок сторінки *</label>
        <input type="text" id="servicesPageTitle" placeholder="Наші послуги, Що ми пропонуємо">
      </div>
      
      <div class="form-group">
        <label for="servicesPageIntro">Вступний текст</label>
        <textarea id="servicesPageIntro" rows="2" placeholder="Короткий опис ваших послуг"></textarea>
      </div>
      
      <div class="services-detailed-list" id="servicesDetailedList">
        <div class="service-detailed-item">
          <input type="text" placeholder="Назва послуги" class="service-detailed-name">
          <textarea placeholder="Детальний опис послуги" rows="3" class="service-detailed-desc"></textarea>
          <input type="text" placeholder="Ціна (опціонально)" class="service-detailed-price">
        </div>
        <div class="service-detailed-item">
          <input type="text" placeholder="Назва послуги" class="service-detailed-name">
          <textarea placeholder="Детальний опис послуги" rows="3" class="service-detailed-desc"></textarea>
          <input type="text" placeholder="Ціна (опціонально)" class="service-detailed-price">
        </div>
      </div>
      <button type="button" class="add-service-detailed-btn" onclick="addDetailedService()">+ Додати послугу</button>
      
      <div class="form-group">
        <label for="servicesOrderButton">Текст кнопки замовлення *</label>
        <input type="text" id="servicesOrderButton" placeholder="Замовити послугу">
      </div>
    </div>

    <div class="section-block">
      <h3>👥 Сторінка "Про нас"</h3>
      <p class="section-description">Команда, історія, цінності</p>
      
      <div class="form-group">
        <label for="aboutPageTitle">Заголовок сторінки *</label>
        <input type="text" id="aboutPageTitle" placeholder="Про нас, Наша команда">
      </div>
      
      <div class="form-group">
        <label for="companyHistory">Історія компанії</label>
        <textarea id="companyHistory" rows="4" placeholder="Розкажіть про історію створення та розвиток компанії"></textarea>
      </div>
      
      <div class="form-group">
        <label for="companyValues">Цінності компанії</label>
        <textarea id="companyValues" rows="3" placeholder="Що для вас важливо у роботі"></textarea>
      </div>
      
      <div class="team-list" id="teamList">
        <div class="team-member">
          <input type="text" placeholder="Ім'я співробітника" class="team-name">
          <input type="text" placeholder="Посада" class="team-position">
          <textarea placeholder="Короткий опис" rows="2" class="team-desc"></textarea>
        </div>
      </div>
      <button type="button" class="add-team-member-btn" onclick="addTeamMember()">+ Додати співробітника</button>
    </div>

    <div class="section-block">
      <h3>📞 Сторінка контактів</h3>
      <p class="section-description">Карта, форма зворотного зв'язку, соціальні мережі</p>
      
      <div class="form-group">
        <label for="contactsPageTitle">Заголовок сторінки *</label>
        <input type="text" id="contactsPageTitle" placeholder="Контакти, Зв'яжіться з нами">
      </div>
      
      <div class="form-group">
        <label for="contactsPhone">Телефон *</label>
        <input type="tel" id="contactsPhone" placeholder="+380 XX XXX XX XX">
      </div>
      
      <div class="form-group">
        <label for="contactsEmail">Email *</label>
        <input type="email" id="contactsEmail" placeholder="info@company.com">
      </div>
      
      <div class="form-group">
        <label for="contactsAddress">Адреса офісу *</label>
        <input type="text" id="contactsAddress" placeholder="м. Київ, вул. Хрещатик, 1">
      </div>
      
      <div class="form-group">
        <label for="contactsHours">Години роботи</label>
        <input type="text" id="contactsHours" placeholder="Пн-Пт: 9:00-18:00, Сб-Нд: вихідні">
      </div>
      
      <div class="form-group">
        <label for="contactsSocial">Соціальні мережі</label>
        <textarea id="contactsSocial" rows="3" placeholder="Facebook: https://facebook.com/yourpage&#10;Instagram: https://instagram.com/yourpage"></textarea>
      </div>
    </div>

    <div class="section-block">
      <h3>⭐ Опціональна сторінка відгуків</h3>
      <p class="section-description">Додаткова сторінка з відгуками клієнтів</p>
      
      <div class="form-group">
        <label for="includeReviewsPage">Включити сторінку відгуків?</label>
        <input type="checkbox" id="includeReviewsPage" onchange="toggleReviewsPage()">
      </div>
      
      <div id="reviewsPageSection" style="display: none;">
        <div class="form-group">
          <label for="reviewsPageTitle">Заголовок сторінки</label>
          <input type="text" id="reviewsPageTitle" placeholder="Відгуки клієнтів">
        </div>
        
        <div class="reviews-list" id="reviewsList">
          <div class="review-item">
            <input type="text" placeholder="Ім'я клієнта" class="review-name">
            <input type="text" placeholder="Компанія" class="review-company">
            <textarea placeholder="Відгук" rows="3" class="review-text"></textarea>
          </div>
        </div>
        <button type="button" class="add-review-btn" onclick="addReview()">+ Додати відгук</button>
      </div>
    </div>
  `;
}

// Generate blog site form
function generateBlogForm() {
  return `
    <div class="section-block">
      <h3>🏠 Головна сторінка</h3>
      <p class="section-description">Hero-блок з останніми публікаціями, категорії, пошук, популярні пости</p>
      
      <div class="form-group">
        <label for="blogTitle">Назва блогу/сайту *</label>
        <input type="text" id="blogTitle" placeholder="Мій блог, Новини компанії">
      </div>
      
      <div class="form-group">
        <label for="blogSubtitle">Підзаголовок *</label>
        <input type="text" id="blogSubtitle" placeholder="Короткий опис тематики блогу">
      </div>
      
      <div class="form-group">
        <label for="blogCategories">Категорії (через кому) *</label>
        <input type="text" id="blogCategories" placeholder="Технології, Новини, Поради, Огляди">
      </div>
      
      <div class="form-group">
        <label for="postsPerPage">Кількість статей на сторінці</label>
        <select id="postsPerPage">
          <option value="5">5 статей</option>
          <option value="10" selected>10 статей</option>
          <option value="15">15 статей</option>
          <option value="20">20 статей</option>
        </select>
      </div>
      
      <div class="blog-features">
        <h4>Функції головної сторінки:</h4>
        <div class="feature-list">
          <div class="feature-item">
            <input type="checkbox" id="showSearch" checked>
            <label for="showSearch">Пошук по статтях</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="showCategories" checked>
            <label for="showCategories">Фільтр по категоріях</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="showPopular" checked>
            <label for="showPopular">Популярні статті</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="showRecent" checked>
            <label for="showRecent">Останні статті</label>
          </div>
        </div>
      </div>
    </div>

    <div class="section-block">
      <h3>📄 Сторінка публікації</h3>
      <p class="section-description">Заголовок статті, автор, дата, текст, фото, відео, кнопки соцмереж, коментарі</p>
      
      <div class="form-group">
        <label for="articleAuthorName">Ім'я автора за замовчуванням *</label>
        <input type="text" id="articleAuthorName" placeholder="Ваше ім'я або псевдонім">
      </div>
      
      <div class="form-group">
        <label for="dateFormat">Формат відображення дати</label>
        <select id="dateFormat">
          <option value="dd.mm.yyyy">ДД.ММ.РРРР (31.12.2024)</option>
          <option value="dd/mm/yyyy">ДД/ММ/РРРР (31/12/2024)</option>
          <option value="dd month yyyy">ДД місяць РРРР (31 грудня 2024)</option>
        </select>
      </div>
      
      <div class="article-features">
        <h4>Функції сторінки статті:</h4>
        <div class="feature-list">
          <div class="feature-item">
            <input type="checkbox" id="enableComments" checked>
            <label for="enableComments">Коментарі</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableSharing" checked>
            <label for="enableSharing">Кнопки поширення</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableTags" checked>
            <label for="enableTags">Теги статей</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableRelated">
            <label for="enableRelated">Схожі статті</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableReadTime">
            <label for="enableReadTime">Час читання</label>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="socialPlatforms">Платформи для поширення (обрані будуть доступні)</label>
        <div class="social-platforms">
          <div class="feature-item">
            <input type="checkbox" id="shareFacebook" checked>
            <label for="shareFacebook">Facebook</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="shareTwitter" checked>
            <label for="shareTwitter">Twitter/X</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="shareTelegram" checked>
            <label for="shareTelegram">Telegram</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="shareLinkedIn">
            <label for="shareLinkedIn">LinkedIn</label>
          </div>
        </div>
      </div>
    </div>

    <div class="section-block">
      <h3>👤 Про автора / Про блог</h3>
      <p class="section-description">Фото, ім'я, тематики блогу, посилання на соцмережі</p>
      
      <div class="form-group">
        <label for="authorName">Ім'я автора *</label>
        <input type="text" id="authorName" placeholder="Ваше повне ім'я">
      </div>
      
      <div class="form-group">
        <label for="authorBio">Біографія автора *</label>
        <textarea id="authorBio" rows="4" placeholder="Розкажіть про себе, ваш досвід, чому ведете блог"></textarea>
      </div>
      
      <div class="form-group">
        <label for="blogTopics">Тематики блогу *</label>
        <textarea id="blogTopics" rows="2" placeholder="Про що пишете, які теми висвітлюєте"></textarea>
      </div>
      
      <div class="form-group">
        <label for="authorSocial">Соціальні мережі автора</label>
        <textarea id="authorSocial" rows="3" placeholder="Facebook: https://facebook.com/yourpage&#10;Instagram: https://instagram.com/yourpage&#10;Twitter: https://twitter.com/yourpage"></textarea>
      </div>
    </div>

    <div class="section-block">
      <h3>📞 Контакти</h3>
      <p class="section-description">Форма або email для зв'язку. Можливо: розсилка, донати, реклама</p>
      
      <div class="form-group">
        <label for="contactMethod">Спосіб зв'язку</label>
        <select id="contactMethod">
          <option value="form">Контактна форма</option>
          <option value="email">Тільки email</option>
          <option value="both">Форма + email</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="contactEmail">Email для зв'язку *</label>
        <input type="email" id="contactEmail" placeholder="contact@myblog.com">
      </div>
      
      <div class="form-group">
        <label for="contactFormTitle">Заголовок форми зворотного зв'язку</label>
        <input type="text" id="contactFormTitle" placeholder="Зв'яжіться зі мною, Написати автору">
      </div>
      
      <div class="additional-features">
        <h4>Додаткові функції:</h4>
        <div class="feature-list">
          <div class="feature-item">
            <input type="checkbox" id="enableNewsletter">
            <label for="enableNewsletter">Розсилка нових статей</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableDonations">
            <label for="enableDonations">Кнопка донатів</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableAdvertising">
            <label for="enableAdvertising">Місця для реклами</label>
          </div>
          <div class="feature-item">
            <input type="checkbox" id="enableRSS" checked>
            <label for="enableRSS">RSS підписка</label>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper functions for dynamic content
function addBenefit() {
  const list = document.getElementById('benefitsList');
  const item = document.createElement('div');
  item.className = 'benefit-item';
  item.innerHTML = `
    <input type="text" placeholder="Перевага" class="benefit-title">
    <textarea placeholder="Опис переваги" rows="2" class="benefit-desc"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addService() {
  const list = document.getElementById('servicesList');
  const item = document.createElement('div');
  item.className = 'service-item';
  item.innerHTML = `
    <input type="text" placeholder="Назва послуги" class="service-name">
    <textarea placeholder="Опис та ціна" rows="2" class="service-desc"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addTestimonial() {
  const list = document.getElementById('testimonialsList');
  const item = document.createElement('div');
  item.className = 'testimonial-item';
  item.innerHTML = `
    <input type="text" placeholder="Ім'я клієнта" class="testimonial-name">
    <input type="text" placeholder="Компанія / Посада" class="testimonial-company">
    <textarea placeholder="Текст відгуку" rows="3" class="testimonial-text"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addPortfolioItem() {
  const list = document.getElementById('portfolioList');
  const item = document.createElement('div');
  item.className = 'portfolio-item';
  item.innerHTML = `
    <input type="text" placeholder="Назва проєкту" class="portfolio-name">
    <textarea placeholder="Опис проєкту" rows="2" class="portfolio-desc"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addFAQItem() {
  const list = document.getElementById('faqList');
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.innerHTML = `
    <input type="text" placeholder="Запитання" class="faq-question">
    <textarea placeholder="Відповідь" rows="2" class="faq-answer"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addDetailedService() {
  const list = document.getElementById('servicesDetailedList');
  const item = document.createElement('div');
  item.className = 'service-detailed-item';
  item.innerHTML = `
    <input type="text" placeholder="Назва послуги" class="service-detailed-name">
    <textarea placeholder="Детальний опис послуги" rows="3" class="service-detailed-desc"></textarea>
    <input type="text" placeholder="Ціна (опціонально)" class="service-detailed-price">
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addTeamMember() {
  const list = document.getElementById('teamList');
  const item = document.createElement('div');
  item.className = 'team-member';
  item.innerHTML = `
    <input type="text" placeholder="Ім'я співробітника" class="team-name">
    <input type="text" placeholder="Посада" class="team-position">
    <textarea placeholder="Короткий опис" rows="2" class="team-desc"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function addReview() {
  const list = document.getElementById('reviewsList');
  const item = document.createElement('div');
  item.className = 'review-item';
  item.innerHTML = `
    <input type="text" placeholder="Ім'я клієнта" class="review-name">
    <input type="text" placeholder="Компанія" class="review-company">
    <textarea placeholder="Відгук" rows="3" class="review-text"></textarea>
    <button type="button" class="remove-item" onclick="removeItem(this)">×</button>
  `;
  list.appendChild(item);
  updateOrderSummary();
}

function removeItem(button) {
  button.parentElement.remove();
  updateOrderSummary();
}

// Toggle functions for optional sections
function togglePortfolioSection() {
  const checkbox = document.getElementById('includePortfolio');
  const section = document.getElementById('portfolioSection');
  section.style.display = checkbox.checked ? 'block' : 'none';
  updateOrderSummary();
}

function toggleFAQSection() {
  const checkbox = document.getElementById('includeFAQ');
  const section = document.getElementById('faqSection');
  section.style.display = checkbox.checked ? 'block' : 'none';
  updateOrderSummary();
}

function toggleReviewsPage() {
  const checkbox = document.getElementById('includeReviewsPage');
  const section = document.getElementById('reviewsPageSection');
  section.style.display = checkbox.checked ? 'block' : 'none';
  updateOrderSummary();
}

// Setup form listeners
function setupFormListeners(template) {
  // Terms checkbox validation
  const agreeTerms = document.getElementById('agreeTerms');
  if (agreeTerms) {
    agreeTerms.addEventListener('change', function() {
      document.getElementById('finalOrderBtn').disabled = !this.checked;
    });
  }
  
  // Add change listeners to update pricing
  const formElements = document.querySelectorAll('#dynamicSections input, #dynamicSections textarea, #dynamicSections select');
  formElements.forEach(element => {
    element.addEventListener('change', updateOrderSummary);
  });
}

// Update order summary
function updateOrderSummary() {
  if (!selectedTemplate) return;
  
  const config = templateConfigs[selectedTemplate];
  const templateName = config.name;
  let configSummary = '';
  let price = config.price;
  
  switch (selectedTemplate) {
    case 'single':
      const includePortfolio = document.getElementById('includePortfolio')?.checked;
      const includeFAQ = document.getElementById('includeFAQ')?.checked;
      let optionalSections = 0;
      if (includePortfolio) optionalSections++;
      if (includeFAQ) optionalSections++;
      
      configSummary = `Односторінковий сайт з ${6 + optionalSections} секціями`;
      price += optionalSections * 75;
      break;
      
    case 'landing':
      const includeReviews = document.getElementById('includeReviewsPage')?.checked;
      const pagesCount = includeReviews ? 5 : 4;
      configSummary = `${pagesCount} сторінки (Головна, Послуги, Про нас, Контакти${includeReviews ? ', Відгуки' : ''})`;
      if (includeReviews) price += 100;
      break;
      
    case 'blog':
      const blogFeatures = document.querySelectorAll('#dynamicSections .feature-item input:checked').length;
      configSummary = `Блог система з ${blogFeatures} функціями`;
      break;
  }
  
  document.getElementById('selectedTemplate').textContent = templateName;
  document.getElementById('configSummary').textContent = configSummary;
  document.getElementById('estimatedPrice').textContent = `від $${price}`;
}

// Order submission and data collection functions
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'finalOrderBtn') {
    handleOrderSubmission();
  }
});

async function handleOrderSubmission() {
  if (!selectedTemplate) {
    alert('Будь ласка, оберіть шаблон');
    return;
  }
  
  if (!document.getElementById('agreeTerms').checked) {
    alert('Необхідно погодитися з умовами');
    return;
  }
  
  const orderData = collectOrderData();
  
  if (!validateOrderData(orderData)) {
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/orders/update-template'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert('Замовлення успішно оформлено! Ми зв\'яжемося з вами найближчим часом.');
    } else {
      alert('Помилка: ' + result.error);
    }
  } catch (error) {
    console.error('Order submission error:', error);
    alert('Помилка при оформленні замовлення. Спробуйте пізніше.');
  }
}

function collectOrderData() {
  const config = templateConfigs[selectedTemplate];
  let blocks = { type: selectedTemplate };
  
  switch (selectedTemplate) {
    case 'single':
      blocks = collectOnePageData();
      break;
    case 'landing':
      blocks = collectLandingData();
      break;
    case 'blog':
      blocks = collectBlogData();
      break;
  }
  
  return {
    template: selectedTemplate,
    blocks: blocks
  };
}

function collectOnePageData() {
  // Collect benefits
  const benefits = [];
  document.querySelectorAll('.benefit-item').forEach(item => {
    const title = item.querySelector('.benefit-title')?.value?.trim();
    const desc = item.querySelector('.benefit-desc')?.value?.trim();
    if (title) benefits.push({ title, description: desc });
  });
  
  // Collect services
  const services = [];
  document.querySelectorAll('.service-item').forEach(item => {
    const name = item.querySelector('.service-name')?.value?.trim();
    const desc = item.querySelector('.service-desc')?.value?.trim();
    if (name) services.push({ name, description: desc });
  });
  
  // Collect testimonials
  const testimonials = [];
  document.querySelectorAll('.testimonial-item').forEach(item => {
    const name = item.querySelector('.testimonial-name')?.value?.trim();
    const company = item.querySelector('.testimonial-company')?.value?.trim();
    const text = item.querySelector('.testimonial-text')?.value?.trim();
    if (name && text) testimonials.push({ name, company, text });
  });
  
  return {
    type: 'onepage',
    hero: {
      title: document.getElementById('heroTitle')?.value || '',
      subtitle: document.getElementById('heroSubtitle')?.value || '',
      buttonText: document.getElementById('heroButton')?.value || ''
    },
    about: {
      title: document.getElementById('aboutTitle')?.value || '',
      text: document.getElementById('aboutText')?.value || ''
    },
    benefits: {
      title: document.getElementById('benefitsTitle')?.value || '',
      items: benefits
    },
    services: {
      title: document.getElementById('servicesTitle')?.value || '',
      items: services
    },
    testimonials: {
      title: document.getElementById('testimonialsTitle')?.value || '',
      items: testimonials
    },
    portfolio: document.getElementById('includePortfolio')?.checked ? {
      title: document.getElementById('portfolioTitle')?.value || '',
      items: collectPortfolioItems()
    } : null,
    faq: document.getElementById('includeFAQ')?.checked ? {
      title: document.getElementById('faqTitle')?.value || '',
      items: collectFAQItems()
    } : null,
    contact: {
      title: document.getElementById('contactTitle')?.value || '',
      text: document.getElementById('contactText')?.value || '',
      buttonText: document.getElementById('contactButton')?.value || ''
    },
    footer: {
      phone: document.getElementById('footerPhone')?.value || '',
      email: document.getElementById('footerEmail')?.value || '',
      address: document.getElementById('footerAddress')?.value || '',
      socialLinks: document.getElementById('socialLinks')?.value || '',
      copyright: document.getElementById('copyrightText')?.value || ''
    }
  };
}

function collectLandingData() {
  return {
    type: 'landing',
    home: {
      heroTitle: document.getElementById('homeHeroTitle')?.value || '',
      heroSubtitle: document.getElementById('homeHeroSubtitle')?.value || '',
      companyBrief: document.getElementById('homeCompanyBrief')?.value || '',
      advantages: document.getElementById('homeAdvantages')?.value || '',
      ctaButton: document.getElementById('homeCTAButton')?.value || ''
    },
    services: {
      title: document.getElementById('servicesPageTitle')?.value || '',
      intro: document.getElementById('servicesPageIntro')?.value || '',
      items: collectDetailedServices(),
      orderButton: document.getElementById('servicesOrderButton')?.value || ''
    },
    about: {
      title: document.getElementById('aboutPageTitle')?.value || '',
      history: document.getElementById('companyHistory')?.value || '',
      values: document.getElementById('companyValues')?.value || '',
      team: collectTeamMembers()
    },
    contacts: {
      title: document.getElementById('contactsPageTitle')?.value || '',
      phone: document.getElementById('contactsPhone')?.value || '',
      email: document.getElementById('contactsEmail')?.value || '',
      address: document.getElementById('contactsAddress')?.value || '',
      hours: document.getElementById('contactsHours')?.value || '',
      social: document.getElementById('contactsSocial')?.value || ''
    },
    reviews: document.getElementById('includeReviewsPage')?.checked ? {
      title: document.getElementById('reviewsPageTitle')?.value || '',
      items: collectReviews()
    } : null
  };
}

function collectBlogData() {
  const features = [];
  document.querySelectorAll('#dynamicSections .feature-item input:checked').forEach(checkbox => {
    features.push(checkbox.id);
  });
  
  return {
    type: 'blog',
    home: {
      title: document.getElementById('blogTitle')?.value || '',
      subtitle: document.getElementById('blogSubtitle')?.value || '',
      categories: document.getElementById('blogCategories')?.value || '',
      postsPerPage: document.getElementById('postsPerPage')?.value || '10'
    },
    article: {
      authorName: document.getElementById('articleAuthorName')?.value || '',
      dateFormat: document.getElementById('dateFormat')?.value || 'dd.mm.yyyy'
    },
    author: {
      name: document.getElementById('authorName')?.value || '',
      bio: document.getElementById('authorBio')?.value || '',
      topics: document.getElementById('blogTopics')?.value || '',
      social: document.getElementById('authorSocial')?.value || ''
    },
    contacts: {
      method: document.getElementById('contactMethod')?.value || 'form',
      email: document.getElementById('contactEmail')?.value || '',
      formTitle: document.getElementById('contactFormTitle')?.value || ''
    },
    features: features
  };
}

// Helper collection functions
function collectPortfolioItems() {
  const items = [];
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const name = item.querySelector('.portfolio-name')?.value?.trim();
    const desc = item.querySelector('.portfolio-desc')?.value?.trim();
    if (name) items.push({ name, description: desc });
  });
  return items;
}

function collectFAQItems() {
  const items = [];
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question')?.value?.trim();
    const answer = item.querySelector('.faq-answer')?.value?.trim();
    if (question && answer) items.push({ question, answer });
  });
  return items;
}

function collectDetailedServices() {
  const items = [];
  document.querySelectorAll('.service-detailed-item').forEach(item => {
    const name = item.querySelector('.service-detailed-name')?.value?.trim();
    const desc = item.querySelector('.service-detailed-desc')?.value?.trim();
    const price = item.querySelector('.service-detailed-price')?.value?.trim();
    if (name) items.push({ name, description: desc, price });
  });
  return items;
}

function collectTeamMembers() {
  const items = [];
  document.querySelectorAll('.team-member').forEach(item => {
    const name = item.querySelector('.team-name')?.value?.trim();
    const position = item.querySelector('.team-position')?.value?.trim();
    const desc = item.querySelector('.team-desc')?.value?.trim();
    if (name) items.push({ name, position, description: desc });
  });
  return items;
}

function collectReviews() {
  const items = [];
  document.querySelectorAll('.review-item').forEach(item => {
    const name = item.querySelector('.review-name')?.value?.trim();
    const company = item.querySelector('.review-company')?.value?.trim();
    const text = item.querySelector('.review-text')?.value?.trim();
    if (name && text) items.push({ name, company, text });
  });
  return items;
}

// Validation function
function validateOrderData(data) {
  switch (selectedTemplate) {
    case 'single':
      if (!data.blocks.hero.title || !data.blocks.hero.subtitle || !data.blocks.footer.phone || !data.blocks.footer.email) {
        showAlert('Заповніть обов\'язкові поля: заголовок Hero, підзаголовок, телефон та email у футері', 'warning', 'Необхідні поля');
        return false;
      }
      break;
      
    case 'landing':
      if (!data.blocks.home.heroTitle || !data.blocks.contacts.phone || !data.blocks.contacts.email) {
        showAlert('Заповніть обов\'язкові поля: заголовок головної сторінки, телефон та email', 'warning', 'Необхідні поля');
        return false;
      }
      break;
      
    case 'blog':
      if (!data.blocks.home.title || !data.blocks.author.name || !data.blocks.contacts.email) {
        showAlert('Заповніть обов\'язкові поля: назву блогу, ім\'я автора та email', 'warning', 'Необхідні поля');
        return false;
      }
      break;
  }
  
  return true;
}

// Password change functionality
function openPasswordModal() {
  console.log('openPasswordModal called');
  const modal = document.getElementById('passwordModal');
  console.log('Modal element:', modal);
  
  if (modal) {
    modal.style.display = 'block';
    modal.style.zIndex = '1001';
    modal.classList.add('show');
    console.log('Password modal opened successfully');
    
    // Clear form
    const form = document.getElementById('passwordForm');
    if (form) {
      form.reset();
    }
    
    // Focus first input
    const firstInput = modal.querySelector('input[type="password"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  } else {
    console.error('Password modal not found in DOM');
    
    // Debug: list all elements with 'modal' in their id
    const allElements = document.querySelectorAll('[id*="modal"], [id*="Modal"]');
    console.log('All modal-related elements:', Array.from(allElements).map(el => el.id));
  }
}

function closePasswordModal() {
  console.log('closePasswordModal called');
  const modal = document.getElementById('passwordModal');
  const form = document.getElementById('passwordForm');
  
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
  if (form) {
    form.reset();
  }
}

// Popup Modal System
let popupCallback = null;
let popupInputCallback = null;

function showPopup(type, title, message, options = {}) {
  const modal = document.getElementById('popupModal');
  const icon = document.getElementById('popupIcon');
  const titleEl = document.getElementById('popupTitle');
  const messageEl = document.getElementById('popupMessage');
  const inputContainer = document.getElementById('popupInput');
  const inputField = document.getElementById('popupInputField');
  const cancelBtn = document.getElementById('popupCancelBtn');
  const confirmBtn = document.getElementById('popupConfirmBtn');
  
  // Set icon based on type
  icon.className = `popup-icon ${type}`;
  switch(type) {
    case 'success':
      icon.innerHTML = '✓';
      break;
    case 'error':
      icon.innerHTML = '✕';
      break;
    case 'warning':
      icon.innerHTML = '⚠';
      break;
    case 'info':
      icon.innerHTML = 'i';
      break;
    case 'question':
      icon.innerHTML = '?';
      break;
    default:
      icon.innerHTML = 'i';
  }
  
  titleEl.textContent = title;
  messageEl.textContent = message;
  
  // Configure buttons
  if (options.showCancel !== false) {
    cancelBtn.style.display = 'block';
    cancelBtn.textContent = options.cancelText || 'Скасувати';
  } else {
    cancelBtn.style.display = 'none';
  }
  
  confirmBtn.textContent = options.confirmText || 'OK';
  
  // Handle input field
  if (options.showInput) {
    inputContainer.style.display = 'block';
    inputField.placeholder = options.inputPlaceholder || '';
    inputField.value = options.inputValue || '';
    inputField.focus();
  } else {
    inputContainer.style.display = 'none';
  }
  
  // Store callback
  popupCallback = options.callback;
  popupInputCallback = options.inputCallback;
  
  modal.style.display = 'block';
  
  // Focus confirm button if no input
  if (!options.showInput) {
    confirmBtn.focus();
  }
}

function closePopup() {
  const modal = document.getElementById('popupModal');
  modal.style.display = 'none';
  popupCallback = null;
  popupInputCallback = null;
}

function confirmPopup() {
  const inputField = document.getElementById('popupInputField');
  const inputContainer = document.getElementById('popupInput');
  
  if (inputContainer.style.display !== 'none' && popupInputCallback) {
    popupInputCallback(inputField.value);
  } else if (popupCallback) {
    popupCallback(true);
  }
  
  closePopup();
}

// Custom alert function
function showAlert(message, type = 'info', title = 'Повідомлення') {
  return new Promise((resolve) => {
    showPopup(type, title, message, {
      showCancel: false,
      callback: resolve
    });
  });
}

// Custom confirm function
function showConfirm(message, title = 'Підтвердження') {
  return new Promise((resolve) => {
    showPopup('question', title, message, {
      showCancel: true,
      confirmText: 'Так',
      cancelText: 'Ні',
      callback: resolve
    });
  });
}

// Load user order function
async function loadUserOrder() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/orders/my-order'), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const order = await response.json();
      currentOrder = order;
      
      // Check if user has a specific tariff and filter templates
      if (order && order.selectedTemplate) {
        // User already has an order with template
        filterTemplatesByTariff(order.selectedTemplate);
        
        // Load saved data into forms
        if (order.blocks) {
          loadTemplateData({blocks: order.blocks});
        }
      } else {
        // New user, show all templates
        setupTemplateSelection();
      }
    } else if (response.status === 404) {
      // No existing order found, setup normal template selection
      console.log('No existing order found, setting up template selection');
      setupTemplateSelection();
    } else {
      // Other error, setup normal template selection
      console.error('Error loading order:', response.status);
      setupTemplateSelection();
    }
  } catch (error) {
    console.error('Error loading user order:', error);
    setupTemplateSelection();
  }
}

// Load template data into forms
function loadTemplateData(templateData) {
  if (!templateData || !templateData.blocks) return;
  
  const blocks = templateData.blocks;
  
  try {
    switch (blocks.type) {
      case 'onepage':
        loadOnePageData(blocks);
        break;
      case 'landing':
        loadLandingData(blocks);
        break;
      case 'blog':
        loadBlogData(blocks);
        break;
    }
  } catch (error) {
    console.error('Error loading template data:', error);
  }
}

// Load one page data
function loadOnePageData(blocks) {
  // Hero section
  if (blocks.hero) {
    setValue('heroTitle', blocks.hero.title);
    setValue('heroSubtitle', blocks.hero.subtitle);
    setValue('heroButton', blocks.hero.buttonText);
  }
  
  // About section
  if (blocks.about) {
    setValue('aboutTitle', blocks.about.title);
    setValue('aboutText', blocks.about.text);
  }
  
  // Benefits section
  if (blocks.benefits) {
    setValue('benefitsTitle', blocks.benefits.title);
    loadListItems('benefitsList', blocks.benefits.items, ['title', 'description'], 'benefit');
  }
  
  // Services section
  if (blocks.services) {
    setValue('servicesTitle', blocks.services.title);
    loadListItems('servicesList', blocks.services.items, ['name', 'description'], 'service');
  }
  
  // Testimonials section
  if (blocks.testimonials) {
    setValue('testimonialsTitle', blocks.testimonials.title);
    loadListItems('testimonialsList', blocks.testimonials.items, ['name', 'company', 'text'], 'testimonial');
  }
  
  // Contact section
  if (blocks.contact) {
    setValue('contactTitle', blocks.contact.title);
    setValue('contactText', blocks.contact.text);
    setValue('contactButton', blocks.contact.buttonText);
  }
  
  // Footer section
  if (blocks.footer) {
    setValue('footerPhone', blocks.footer.phone);
    setValue('footerEmail', blocks.footer.email);
    setValue('footerAddress', blocks.footer.address);
    setValue('socialLinks', blocks.footer.socialLinks);
    setValue('copyrightText', blocks.footer.copyright);
  }
  
  // Optional sections
  if (blocks.portfolio) {
    setCheckbox('includePortfolio', true);
    togglePortfolioSection();
    setValue('portfolioTitle', blocks.portfolio.title);
    loadListItems('portfolioList', blocks.portfolio.items, ['name', 'description'], 'portfolio');
  }
  
  if (blocks.faq) {
    setCheckbox('includeFAQ', true);
    toggleFAQSection();
    setValue('faqTitle', blocks.faq.title);
    loadListItems('faqList', blocks.faq.items, ['question', 'answer'], 'faq');
  }
}

// Helper function to set input values
function setValue(id, value) {
  const element = document.getElementById(id);
  if (element && value) {
    element.value = value;
  }
}

// Helper function to set checkbox values
function setCheckbox(id, checked) {
  const element = document.getElementById(id);
  if (element) {
    element.checked = checked;
  }
}

// Helper function to load list items
function loadListItems(containerId, items, fields, itemClass) {
  const container = document.getElementById(containerId);
  if (!container || !items || !Array.isArray(items)) return;
  
  // Clear existing items except the first one
  const existingItems = container.querySelectorAll(`.${itemClass}-item`);
  for (let i = 1; i < existingItems.length; i++) {
    existingItems[i].remove();
  }
  
  // Fill items
  items.forEach((item, index) => {
    let itemElement;
    if (index === 0) {
      // Use existing first item
      itemElement = container.querySelector(`.${itemClass}-item`);
    } else {
      // Create new item
      itemElement = container.querySelector(`.${itemClass}-item`).cloneNode(true);
      container.appendChild(itemElement);
    }
    
    if (itemElement) {
      fields.forEach(field => {
        const input = itemElement.querySelector(`.${itemClass}-${field}`);
        if (input && item[field]) {
          input.value = item[field];
        }
      });
    }
  });
}

// Logout functionality
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

// Make functions globally available
window.openPasswordModal = openPasswordModal;
window.closePasswordModal = closePasswordModal;
window.showPopup = showPopup;
window.closePopup = closePopup;
window.confirmPopup = confirmPopup;
window.showAlert = showAlert;
window.showConfirm = showConfirm;
window.loadUserOrder = loadUserOrder;
window.logout = logout;

