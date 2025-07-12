// Admin panel functionality
let allOrders = [];
let currentOrderId = null;

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

// Check if user is admin
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!user || !token || user.role !== 'admin') {
    showAlert('Доступ заборонено. Тільки для адміністраторів.', 'error', 'Доступ заборонено');
    window.location.href = '/';
    return;
  }
  
  // Update user display
  document.getElementById('userNameDisplay').textContent = `${user.firstName} ${user.lastName} (Адмін)`;
  document.getElementById('userNameDisplay').onclick = showUserMenu;
  
  // Initialize theme
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
  
  // Load orders
  loadOrders();
  
  // Set up event listeners
  document.getElementById('refreshBtn').addEventListener('click', loadOrders);
  document.getElementById('statusFilter').addEventListener('change', filterOrders);
});

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

// Load all orders
async function loadOrders() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/orders/all'), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      allOrders = await response.json();
      displayOrders(allOrders);
      updateStats(allOrders);
    } else {
      throw new Error('Failed to load orders');
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    document.getElementById('ordersTableBody').innerHTML = 
      '<tr><td colspan="8" class="loading">Помилка завантаження замовлень</td></tr>';
  }
}

// Display orders in table
function displayOrders(orders) {
  const tbody = document.getElementById('ordersTableBody');
  
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="loading">Немає замовлень</td></tr>';
    return;
  }
  
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>#${order._id.slice(-6)}</td>
      <td>${order.user.firstName} ${order.user.lastName}</td>
      <td>${order.user.email}</td>
      <td>${order.user.phone}</td>
      <td>${order.selectedTemplate || 'Не обрано'}</td>
      <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
      <td>${new Date(order.createdAt).toLocaleDateString('uk-UA')}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn view" onclick="viewOrder('${order._id}')">Переглянути</button>
          ${!order.confirmed ? `<button class="action-btn confirm" onclick="confirmOrder('${order._id}')">Підтвердити</button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Get status text in Ukrainian
function getStatusText(status) {
  const statusMap = {
    'draft': 'Чернетка',
    'completed': 'Завершено',
    'confirmed': 'Підтверджено'
  };
  return statusMap[status] || status;
}

// Update statistics
function updateStats(orders) {
  const total = orders.length;
  const newOrders = orders.filter(order => order.status === 'draft').length;
  const confirmed = orders.filter(order => order.confirmed).length;
  
  document.getElementById('totalOrders').textContent = total;
  document.getElementById('newOrders').textContent = newOrders;
  document.getElementById('confirmedOrders').textContent = confirmed;
}

// Filter orders by status
function filterOrders() {
  const filter = document.getElementById('statusFilter').value;
  let filteredOrders = allOrders;
  
  if (filter) {
    filteredOrders = allOrders.filter(order => order.status === filter);
  }
  
  displayOrders(filteredOrders);
}

// View order details
function viewOrder(orderId) {
  const order = allOrders.find(o => o._id === orderId);
  if (!order) return;
  
  currentOrderId = orderId;
  
  const content = `
    <div class="order-detail-section">
      <h3>Інформація про клієнта</h3>
      <div class="detail-grid">
        <div class="detail-item">
          <label>Ім'я</label>
          <span>${order.user.firstName} ${order.user.lastName}</span>
        </div>
        <div class="detail-item">
          <label>Email</label>
          <span>${order.user.email}</span>
        </div>
        <div class="detail-item">
          <label>Телефон</label>
          <span>${order.user.phone}</span>
        </div>
        <div class="detail-item">
          <label>Дата створення</label>
          <span>${new Date(order.createdAt).toLocaleString('uk-UA')}</span>
        </div>
      </div>
    </div>

    <div class="order-detail-section">
      <h3>Деталі замовлення</h3>
      <div class="detail-grid">
        <div class="detail-item">
          <label>Шаблон</label>
          <span>${order.selectedTemplate || 'Не обрано'}</span>
        </div>
        <div class="detail-item">
          <label>Статус</label>
          <span class="status-badge status-${order.status}">${getStatusText(order.status)}</span>
        </div>
        <div class="detail-item">
          <label>Підтверджено</label>
          <span>${order.confirmed ? 'Так' : 'Ні'}</span>
        </div>
        <div class="detail-item">
          <label>PDF</label>
          <span>${order.pdfUrl ? `<a href="${order.pdfUrl}" target="_blank">Завантажити</a>` : 'Не створено'}</span>
        </div>
      </div>
    </div>

    ${order.blocks ? generateBlocksHTML(order.blocks) : '<div class="order-detail-section"><h3>Контент сайту</h3><p>Не налаштовано</p></div>'}
  `;
  
  document.getElementById('orderDetailsContent').innerHTML = content;
  document.getElementById('orderDetailsModal').style.display = 'block';
  
  // Update action buttons
  const confirmBtn = document.getElementById('confirmOrderBtn');
  if (order.confirmed) {
    confirmBtn.style.display = 'none';
  } else {
    confirmBtn.style.display = 'block';
    confirmBtn.onclick = () => confirmOrder(orderId);
  }
}

// Generate HTML for order blocks
function generateBlocksHTML(blocks) {
  let html = '';
  
  if (blocks.hero) {
    html += `
      <div class="order-detail-section">
        <h3>Головна секція</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Заголовок</label>
            <span>${blocks.hero.title || 'Не вказано'}</span>
          </div>
          <div class="detail-item">
            <label>Опис</label>
            <span>${blocks.hero.description || 'Не вказано'}</span>
          </div>
          <div class="detail-item">
            <label>Текст кнопки</label>
            <span>${blocks.hero.buttonText || 'Не вказано'}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  if (blocks.about) {
    html += `
      <div class="order-detail-section">
        <h3>Про нас</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Заголовок</label>
            <span>${blocks.about.title || 'Не вказано'}</span>
          </div>
          <div class="detail-item" style="grid-column: 1 / -1;">
            <label>Текст</label>
            <span>${blocks.about.text || 'Не вказано'}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  if (blocks.services) {
    html += `
      <div class="order-detail-section">
        <h3>Послуги</h3>
        <div class="detail-item">
          <label>Заголовок секції</label>
          <span>${blocks.services.title || 'Не вказано'}</span>
        </div>
        <label style="margin-top: 15px; display: block;">Список послуг:</label>
        <ul class="services-list">
          ${blocks.services.items ? blocks.services.items.map(service => `
            <li>
              <div class="service-name">${service.name}</div>
              <div class="service-desc">${service.description}</div>
            </li>
          `).join('') : '<li>Послуги не додано</li>'}
        </ul>
      </div>
    `;
  }
  
  if (blocks.contact) {
    html += `
      <div class="order-detail-section">
        <h3>Контакти</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Телефон</label>
            <span>${blocks.contact.phone || 'Не вказано'}</span>
          </div>
          <div class="detail-item">
            <label>Email</label>
            <span>${blocks.contact.email || 'Не вказано'}</span>
          </div>
          <div class="detail-item">
            <label>Адреса</label>
            <span>${blocks.contact.address || 'Не вказано'}</span>
          </div>
          <div class="detail-item">
            <label>Години роботи</label>
            <span>${blocks.contact.hours || 'Не вказано'}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  if (blocks.additional && blocks.additional.length > 0) {
    html += `
      <div class="order-detail-section">
        <h3>Додаткові секції</h3>
        <div class="additional-sections">
          ${blocks.additional.map(section => `
            <span class="section-tag">${getSectionName(section)}</span>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  return html;
}

// Get section name in Ukrainian
function getSectionName(section) {
  const sectionNames = {
    'testimonials': 'Відгуки клієнтів',
    'gallery': 'Галерея робіт',
    'team': 'Наша команда',
    'faq': 'Часті запитання',
    'blog': 'Блог/Новини',
    'pricing': 'Прайс-лист'
  };
  return sectionNames[section] || section;
}

// Confirm order
async function confirmOrder(orderId) {
  const confirmed = await showConfirm('Підтвердити це замовлення?', 'Підтвердження замовлення');
  if (!confirmed) return;
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/orders/confirm/${orderId}`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      showAlert('Замовлення підтверджено!', 'success', 'Успіх');
      closeOrderDetails();
      loadOrders();
    } else {
      const result = await response.json();
      showAlert('Помилка: ' + result.error, 'error', 'Помилка');
    }
  } catch (error) {
    console.error('Error confirming order:', error);
    showAlert('Помилка при підтвердженні замовлення', 'error', 'Помилка');
  }
}

// Close order details modal
function closeOrderDetails() {
  document.getElementById('orderDetailsModal').style.display = 'none';
  currentOrderId = null;
}

// Theme toggle functionality
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

async function showUserMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const choice = await showConfirm(`Привіт, ${user.firstName}!\n\nВи хочете вийти з акаунту?`, 'Вихід з акаунту');
  
  if (choice) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('orderDetailsModal');
  if (event.target === modal) {
    closeOrderDetails();
  }
}