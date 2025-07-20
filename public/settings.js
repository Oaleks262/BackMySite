// Settings page functionality
let currentSettings = {};

// Check admin authentication
function checkAdminAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token) {
    window.location.href = '/admin.html';
    return false;
  }
  
  try {
    const userData = JSON.parse(user);
    if (userData && userData.role === 'admin') {
      return true;
    }
  } catch (e) {
    // Invalid user data
  }
  
  window.location.href = '/admin.html';
  return false;
}

// Get API URL
function getAPIUrl(endpoint) {
  if (typeof API_CONFIG !== 'undefined') {
    return `${API_CONFIG.baseURL}${endpoint}`;
  } else {
    const baseURL = window.location.hostname === 'localhost' 
      ? 'http://localhost:4444' 
      : 'https://growth-tech.com.ua';
    return `${baseURL}${endpoint}`;
  }
}

// Show alert message
function showAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alertContainer');
  const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
  
  alertContainer.innerHTML = `
    <div class="alert ${alertClass}">
      ${message}
    </div>
  `;
  
  // Remove alert after 5 seconds
  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 5000);
}

// Load current settings
async function loadSettings() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/admin/settings'), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const settings = await response.json();
      currentSettings = settings;
      populateForm(settings);
    } else {
      console.error('Failed to load settings');
      showAlert('Помилка завантаження налаштувань', 'error');
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    showAlert('Помилка з\'єднання з сервером', 'error');
  }
}

// Populate forms with current settings
function populateForm(settings) {
  // Bank details
  if (settings.bankDetails) {
    document.getElementById('bankRecipient').value = settings.bankDetails.recipient || '';
    document.getElementById('bankIban').value = settings.bankDetails.iban || '';
    document.getElementById('bankName').value = settings.bankDetails.bank || '';
    document.getElementById('currency').value = settings.bankDetails.currency || '';
  }
  
  // Company info
  if (settings.companyInfo) {
    document.getElementById('companyName').value = settings.companyInfo.name || '';
    document.getElementById('companyEmail').value = settings.companyInfo.email || '';
    document.getElementById('companyPhone').value = settings.companyInfo.phone || '';
    document.getElementById('companyWebsite').value = settings.companyInfo.website || '';
  }
  
  // Pricing
  if (settings.pricing) {
    if (settings.pricing.tariffs) {
      document.getElementById('priceSingle').value = settings.pricing.tariffs.single || '';
      document.getElementById('priceLanding').value = settings.pricing.tariffs.landing || '';
      document.getElementById('priceBlog').value = settings.pricing.tariffs.blog || '';
    }
    
    if (settings.pricing.additionalFeatures) {
      document.getElementById('priceEcommerce').value = settings.pricing.additionalFeatures.ecommerce || '';
      document.getElementById('priceBooking').value = settings.pricing.additionalFeatures.booking || '';
      document.getElementById('priceAnalytics').value = settings.pricing.additionalFeatures.analytics || '';
      document.getElementById('priceSeo').value = settings.pricing.additionalFeatures.seo || '';
    }
  }
}

// Save settings section
async function saveSettings(section, data) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/admin/settings'), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section, data })
    });

    if (response.ok) {
      showAlert(`${section} успішно збережено!`, 'success');
      await loadSettings(); // Reload settings
    } else {
      const error = await response.text();
      showAlert(`Помилка збереження: ${error}`, 'error');
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    showAlert('Помилка з\'єднання з сервером', 'error');
  }
}

// Form submit handlers
document.getElementById('bankForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  await saveSettings('bankDetails', data);
});

document.getElementById('companyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  await saveSettings('companyInfo', data);
});

document.getElementById('pricingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Convert prices to numbers
  const tariffs = {
    single: parseInt(data.single),
    landing: parseInt(data.landing),
    blog: parseInt(data.blog)
  };
  
  const additionalFeatures = {
    ecommerce: parseInt(data.ecommerce),
    booking: parseInt(data.booking),
    analytics: parseInt(data.analytics),
    seo: parseInt(data.seo)
  };
  
  await saveSettings('pricing', { tariffs, additionalFeatures });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  if (checkAdminAuth()) {
    loadSettings();
  }
});