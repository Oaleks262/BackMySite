// API Configuration
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:4444' 
    : '',
  
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

// Modal functions
function openOrderModal(packageType, price) {
  // Wait a small moment to ensure DOM is ready
  setTimeout(() => {
    const modal = document.getElementById('orderModal');
    const packageInput = document.getElementById('packageType');
    const priceInput = document.getElementById('orderPrice');
    
    const packageNames = {
      'single': 'Односторінковий сайт',
      'landing': 'Лендінг (2–4 сторінки)',
      'blog': 'Блоговий сайт'
    };
    
    // Set package name
    if (packageInput) {
      packageInput.value = packageNames[packageType] || packageType;
    }
    
    // Set price
    if (priceInput) {
      priceInput.value = `від $${price}`;
    }
    
    // Show modal
    if (modal) {
      modal.style.display = 'block';
    }
  }, 10);
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function openContactModal() {
  document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
}

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function openRegisterModal() {
  document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

function switchToRegister() {
  closeLoginModal();
  openRegisterModal();
}

function switchToLogin() {
  closeRegisterModal();
  openLoginModal();
}

// Close modals when clicking outside
window.onclick = function(event) {
  const orderModal = document.getElementById('orderModal');
  const contactModal = document.getElementById('contactModal');
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  
  if (event.target === orderModal) {
    orderModal.style.display = 'none';
  }
  if (event.target === contactModal) {
    contactModal.style.display = 'none';
  }
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target === registerModal) {
    registerModal.style.display = 'none';
  }
}

// Form submissions
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone')
  };
  
  try {
    const response = await fetch(getAPIUrl('/api/orders/create'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      showAlert('Замовлення створено успішно! Перевірте свою пошту для отримання даних для входу.', 'success', 'Успіх');
      closeOrderModal();
      e.target.reset();
    } else {
      showAlert('Помилка: ' + result.error, 'error', 'Помилка');
    }
  } catch (error) {
    showAlert('Помилка при відправці замовлення. Спробуйте пізніше.', 'error', 'Помилка');
  }
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  
  try {
    const response = await fetch(getAPIUrl('/api/contact'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      showAlert('Повідомлення надіслано успішно! Ми зв\'яжемося з вами найближчим часом.', 'success', 'Успіх');
      closeContactModal();
      e.target.reset();
    } else {
      showAlert('Помилка: ' + result.error, 'error', 'Помилка');
    }
  } catch (error) {
    showAlert('Помилка при відправці повідомлення. Спробуйте пізніше.', 'error', 'Помилка');
  }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  
  try {
    console.log('Attempting login with data:', { email: data.email, password: '[HIDDEN]' });
    const response = await fetch(getAPIUrl('/api/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    console.log('Login response status:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('Login response not OK:', response.status, response.statusText);
      if (response.status === 404) {
        showAlert('Сервер недоступний. Спробуйте пізніше.', 'error', 'Помилка підключення');
        return;
      }
    }
    
    const result = await response.json();
    console.log('Login response:', result);
    
    if (response.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      showAlert('Вхід успішний!', 'success', 'Успіх');
      closeLoginModal();
      
      // Redirect to dashboard for regular users, admin panel for admins
      if (result.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      showAlert('Помилка: ' + result.error, 'error', 'Помилка');
    }
  } catch (error) {
    showAlert('Помилка при вході. Спробуйте пізніше.', 'error', 'Помилка');
  }
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password')
  };
  
  try {
    console.log('Attempting registration with data:', data);
    const response = await fetch(getAPIUrl('/api/auth/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      if (response.status === 404) {
        showAlert('Сервер недоступний. Спробуйте пізніше.', 'error', 'Помилка підключення');
        return;
      }
    }
    
    const result = await response.json();
    console.log('Registration response:', result);
    
    if (response.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      showAlert('Реєстрація успішна!', 'success', 'Успіх');
      closeRegisterModal();
      
      // Redirect to dashboard after registration
      window.location.href = '/dashboard';
    } else {
      showAlert('Помилка: ' + result.error, 'error', 'Помилка');
    }
  } catch (error) {
    showAlert('Помилка при реєстрації. Спробуйте пізніше.', 'error', 'Помилка');
  }
});

// Update user interface based on login state
function updateUserInterface() {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginLinks = document.querySelectorAll('a[onclick="openLoginModal()"]');
  
  if (user) {
    loginLinks.forEach(link => {
      link.textContent = `${user.firstName} ${user.lastName}`;
      if (user.role === 'admin') {
        link.onclick = () => showAdminMenu();
      } else {
        link.onclick = () => showUserMenu();
      }
    });
  } else {
    loginLinks.forEach(link => {
      link.textContent = 'Вхід';
      link.onclick = () => openLoginModal();
    });
  }
}

async function showUserMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const choice = await showConfirm(`Привіт, ${user.firstName}!\n\nВи хочете вийти з акаунту?`, 'Вихід з акаунту');
  
  if (choice) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateUserInterface();
    showAlert('Ви вийшли з акаунту', 'info', 'Вихід');
  }
}

async function showAdminMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const choice = await showConfirm(`Привіт, ${user.firstName}!\n\nОберіть дію:`, 'Адмін меню');
  
  if (choice) {
    window.location.href = '/admin';
  } else {
    const logout = await showConfirm('Ви впевнені, що хочете вийти з акаунту?', 'Вихід з акаунту');
    if (logout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      updateUserInterface();
      showAlert('Ви вийшли з акаунту', 'info', 'Вихід');
    }
  }
}

// Initialize user interface on page load
document.addEventListener('DOMContentLoaded', function() {
  updateUserInterface();
});

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

// Custom prompt function
function showPrompt(message, defaultValue = '', title = 'Введіть значення') {
  return new Promise((resolve) => {
    showPopup('question', title, message, {
      showInput: true,
      inputValue: defaultValue,
      showCancel: true,
      confirmText: 'OK',
      cancelText: 'Скасувати',
      inputCallback: resolve
    });
  });
}

// Close popup when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('popupModal');
  if (event.target === modal) {
    closePopup();
  }
});

// Handle Enter key in popup input
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById('popupModal');
  const inputField = document.getElementById('popupInputField');
  
  if (modal.style.display === 'block') {
    if (event.key === 'Enter') {
      confirmPopup();
    } else if (event.key === 'Escape') {
      closePopup();
    }
  }
});

// Enhanced Features - Payment Integration
let stripe;
let elements;
let paymentElement;

async function initializeStripe() {
  if (typeof Stripe === 'undefined') {
    console.warn('Stripe not loaded');
    return;
  }
  
  stripe = Stripe('pk_test_your_stripe_public_key_here'); // Replace with actual key
  elements = stripe.elements();
}

async function createPaymentIntent(orderId) {
  try {
    const response = await fetch(getAPIUrl('/api/payment/create-payment-intent'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ orderId })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    throw error;
  }
}

// File Upload Functions
async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(getAPIUrl('/api/upload/image'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
}

// Template Preview Functions
async function loadTemplatePreview(templateId) {
  try {
    const response = await fetch(getAPIUrl(`/api/templates/${templateId}/preview`));
    const html = await response.text();
    
    return html;
  } catch (error) {
    console.error('Template preview failed:', error);
    throw error;
  }
}

// Profile Management Functions
async function updateProfile(profileData) {
  try {
    const response = await fetch(getAPIUrl('/api/profile'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(profileData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
}

async function getUserOrders() {
  try {
    const response = await fetch(getAPIUrl('/api/profile/orders'), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Orders fetch failed:', error);
    throw error;
  }
}

// Website Generation Functions
async function generateWebsite(orderId) {
  try {
    const response = await fetch(getAPIUrl(`/api/website/generate/${orderId}`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error('Website generation failed:', error);
    throw error;
  }
}

// Initialize enhanced features when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeStripe();
  
  // Add file upload handlers
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', handleFileUpload);
  });

  // Add payment button handlers
  const paymentButtons = document.querySelectorAll('.payment-btn');
  paymentButtons.forEach(button => {
    button.addEventListener('click', handlePaymentClick);
  });
});

async function handleFileUpload(event) {
  const files = event.target.files;
  if (!files.length) return;

  try {
    showAlert('Завантаження файлів...', 'info');
    
    const result = await uploadFile(files[0]);
    showAlert('Файл успішно завантажено!', 'success');
    return result;
  } catch (error) {
    showAlert(`Помилка завантаження: ${error.message}`, 'error');
  }
}

async function handlePaymentClick(event) {
  const orderId = event.target.dataset.orderId;
  if (!orderId) return;

  try {
    showAlert('Підготовка платежу...', 'info');
    
    const paymentData = await createPaymentIntent(orderId);
    showAlert('Платіж успішно обробленo!', 'success');
  } catch (error) {
    showAlert(`Помилка платежу: ${error.message}`, 'error');
  }
}