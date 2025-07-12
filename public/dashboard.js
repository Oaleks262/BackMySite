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
  document.getElementById('userNameDisplay').onclick = showUserMenu;
  
  // Initialize theme
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
  
  // Load existing order if any
  loadUserOrder();
  
  // Set up template selection will be called after loading order
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
  document.getElementById('passwordModal').style.display = 'block';
}

function closePasswordModal() {
  document.getElementById('passwordModal').style.display = 'none';
  document.getElementById('passwordForm').reset();
}

// Password form submission
document.addEventListener('DOMContentLoaded', function() {
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
        showAlert('Нові паролі не співпадають', 'error', 'Помилка');
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
          showAlert('Пароль успішно змінено!', 'success', 'Успіх');
          closePasswordModal();
        } else {
          showAlert(result.error || 'Помилка при зміні пароля', 'error', 'Помилка');
        }
      } catch (error) {
        console.error('Password change error:', error);
        showAlert('Помилка при зміні пароля. Спробуйте пізніше.', 'error', 'Помилка');
      }
    });
  }
});

// Close password modal when clicking outside
window.addEventListener('click', function(event) {
  const passwordModal = document.getElementById('passwordModal');
  if (event.target === passwordModal) {
    closePasswordModal();
  }
});

// Load existing order and other utility functions
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
      if (order) {
        currentOrder = order;
        // Filter templates based on user's tariff type
        filterTemplatesByTariff(order.tariffType);
        
        if (order.blocks) {
          populateFormWithOrder(order);
        }
      }
    }
    
    // Set up template selection after loading order
    setupTemplateSelection();
  } catch (error) {
    console.error('Error loading order:', error);
    // Still setup template selection even if loading fails
    setupTemplateSelection();
  }
}

function populateFormWithOrder(order) {
  if (order.selectedTemplate) {
    selectedTemplate = order.selectedTemplate;
    const templateCard = document.querySelector(`[data-template="${order.selectedTemplate}"]`);
    if (templateCard) {
      templateCard.click();
    }
  }
}

// Theme and user functions
document.getElementById("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = document.getElementById("icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function showUserMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const choice = confirm(`Привіт, ${user.firstName}!\n\nВи хочете вийти з акаунту?`);
  
  if (choice) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}