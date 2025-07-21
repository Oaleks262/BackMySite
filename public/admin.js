// Admin panel functionality
let allOrders = [];
let currentOrderId = null;

// Check admin authentication and show login if needed
function checkAdminAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token) {
    const adminSection = document.getElementById('adminLoginSection');
    if (adminSection) adminSection.style.display = 'block';
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
  
  const adminSection = document.getElementById('adminLoginSection');
  if (adminSection) adminSection.style.display = 'block';
  return false;
}

// Helper function to get full API URL (using global API_CONFIG from script.js)
function getAPIUrl(endpoint) {
  if (typeof API_CONFIG !== 'undefined') {
    const fullUrl = `${API_CONFIG.baseURL}${endpoint}`;
    console.log('API Request URL:', fullUrl);
    return fullUrl;
  } else {
    // Fallback if API_CONFIG is not loaded yet
    const baseURL = window.location.hostname === 'localhost' 
      ? 'http://localhost:4444' 
      : 'https://growth-tech.com.ua';
    const fullUrl = `${baseURL}${endpoint}`;
    console.log('API Request URL (fallback):', fullUrl);
    return fullUrl;
  }
}

// Password change functionality for admin page
function openPasswordModal() {
  console.log('openPasswordModal called');
  const modal = document.getElementById('passwordModal');
  console.log('Modal element:', modal);
  
  if (modal) {
    console.log('Modal found, showing...');
    modal.style.display = 'block';
    modal.style.zIndex = '1001';
    modal.classList.add('show');
    console.log('Password modal opened, display:', modal.style.display);
    
    // Clear form
    const form = document.getElementById('passwordForm');
    if (form) {
      form.reset();
    }
    
    // Focus on first input field
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  } else {
    console.error('Password modal not found in DOM');
    console.log('Available modals:', document.querySelectorAll('.modal'));
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

// Make functions globally available
window.openPasswordModal = openPasswordModal;
window.closePasswordModal = closePasswordModal;

// Check if user is admin
document.addEventListener('DOMContentLoaded', function() {
  console.log('Admin DOMContentLoaded event fired');
  
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  console.log('User:', user);
  console.log('Token:', !!token);
  
  if (!user || !token || user.role !== 'admin') {
    console.log('Access denied - redirecting');
    if (typeof showAlert === 'function') {
      showAlert('Доступ заборонено. Тільки для адміністраторів.', 'error', 'Доступ заборонено');
    } else {
      alert('Доступ заборонено. Тільки для адміністраторів.');
    }
    window.location.href = '/';
    return;
  }
  
  console.log('Admin access granted, initializing...');
  
  // Update user display
  document.getElementById('userNameDisplay').textContent = `${user.firstName} ${user.lastName} (Адмін)`;
  document.getElementById('userNameDisplay').onclick = showUserMenu;
  
  // Update mobile user display
  const mobileUserDisplay = document.getElementById('userNameDisplayMob');
  if (mobileUserDisplay) {
    mobileUserDisplay.textContent = `${user.firstName} ${user.lastName} (Адмін)`;
    mobileUserDisplay.onclick = showUserMenu;
  }
  
  // Initialize theme
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
  
  // Load orders only if admin is authenticated
  if (checkAdminAuth()) {
    try {
      // Initialize tabs
      initTabs();
      loadOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }
  
  // Set up event listeners
  console.log('Setting up event listeners...');
  
  const refreshBtn = document.getElementById('refreshBtn');
  const statusFilter = document.getElementById('statusFilter');
  
  console.log('refreshBtn:', refreshBtn);
  console.log('statusFilter:', statusFilter);
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadOrders);
  }
  
  const refreshReviewsBtn = document.getElementById('refreshReviewsBtn');
  if (refreshReviewsBtn) {
    refreshReviewsBtn.addEventListener('click', loadReviews);
  }
  
  if (statusFilter) {
    statusFilter.addEventListener('change', filterOrders);
  }
  
  // Set up password change button listeners
  const passwordBtn = document.getElementById('passwordChangeBtn');
  if (passwordBtn) {
    passwordBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Password change button clicked');
      openPasswordModal();
    });
  } else {
    console.error('Password change button not found');
  }
  
  const passwordBtnMob = document.getElementById('passwordChangeBtnMob');
  if (passwordBtnMob) {
    passwordBtnMob.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Mobile password change button clicked');
      openPasswordModal();
    });
  } else {
    console.error('Mobile password change button not found');
  }
  
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
        alert('Нові паролі не співпадають');
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
          alert('Пароль успішно змінено!');
          closePasswordModal();
        } else {
          alert(result.error || 'Помилка при зміні пароля');
        }
      } catch (error) {
        console.error('Password change error:', error);
        alert('Помилка при зміні пароля. Спробуйте пізніше.');
      }
    });
  }
});

// Test function for debugging
window.testPasswordModal = function() {
  console.log('Testing password modal...');
  const modal = document.getElementById('passwordModal');
  console.log('Modal element found:', !!modal);
  if (modal) {
    console.log('Modal HTML:', modal.outerHTML.substring(0, 200) + '...');
  }
  openPasswordModal();
};

// Make confirmOrder globally available
window.confirmOrder = confirmOrder;

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
    console.log('Loading orders with token:', token ? 'present' : 'missing');
    
    const url = getAPIUrl('/api/orders/all');
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
      allOrders = Array.isArray(data) ? data : (data.orders || []); // Підтримуємо обидва формати
      console.log('Parsed orders:', allOrders);
      displayOrders(allOrders);
      updateStats(allOrders);
    } else {
      const errorText = await response.text();
      console.error('Server error:', response.status, errorText);
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    document.getElementById('ordersTableBody').innerHTML = 
      `<tr><td colspan="8" class="loading">Помилка завантаження замовлень: ${error.message}</td></tr>`;
  }
}

// Display orders in table
function displayOrders(orders) {
  const tbody = document.getElementById('ordersTableBody');
  
  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="loading">Немає замовлень</td></tr>';
    displayMobileOrders([]);
    return;
  }
  
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>#${order._id.slice(-6)}</td>
      <td>${order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Користувач видалений'}</td>
      <td>${order.user ? order.user.email : 'N/A'}</td>
      <td>${order.user ? order.user.phone || 'N/A' : 'N/A'}</td>
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
  
  // Also generate mobile cards
  displayMobileOrders(orders);
}

// Display mobile order cards
function displayMobileOrders(orders) {
  // Find or create mobile container
  let mobileContainer = document.getElementById('mobileOrdersContainer');
  if (!mobileContainer) {
    mobileContainer = document.createElement('div');
    mobileContainer.id = 'mobileOrdersContainer';
    mobileContainer.className = 'mobile-orders-container';
    
    // Insert after the table container
    const tableContainer = document.querySelector('.orders-table-container');
    if (tableContainer) {
      tableContainer.parentNode.insertBefore(mobileContainer, tableContainer.nextSibling);
    }
  }
  
  if (orders.length === 0) {
    mobileContainer.innerHTML = '<div class="mobile-order-card"><p>Немає замовлень</p></div>';
    return;
  }
  
  mobileContainer.innerHTML = orders.map(order => `
    <div class="mobile-order-card">
      <h4>Замовлення #${order._id.slice(-6)}</h4>
      <div class="mobile-order-detail">
        <strong>Клієнт:</strong>
        <span>${order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Користувач видалений'}</span>
      </div>
      <div class="mobile-order-detail">
        <strong>Email:</strong>
        <span>${order.user ? order.user.email : 'N/A'}</span>
      </div>
      <div class="mobile-order-detail">
        <strong>Телефон:</strong>
        <span>${order.user ? order.user.phone || 'N/A' : 'N/A'}</span>
      </div>
      <div class="mobile-order-detail">
        <strong>Шаблон:</strong>
        <span>${order.selectedTemplate || 'Не обрано'}</span>
      </div>
      <div class="mobile-order-detail">
        <strong>Статус:</strong>
        <span class="status-badge status-${order.status}">${getStatusText(order.status)}</span>
      </div>
      <div class="mobile-order-detail">
        <strong>Дата:</strong>
        <span>${new Date(order.createdAt).toLocaleDateString('uk-UA')}</span>
      </div>
      <div class="mobile-order-actions">
        <button class="action-btn view" onclick="viewOrder('${order._id}')">Переглянути</button>
        ${!order.confirmed ? `<button class="action-btn confirm" onclick="confirmOrder('${order._id}')">Підтвердити</button>` : ''}
      </div>
    </div>
  `).join('');
}

// Get status text in Ukrainian
function getStatusText(status) {
  const statusMap = {
    'draft': 'Чернетка',
    'pending_payment': 'Очікує оплати',
    'paid': 'Оплачено',
    'in_progress': 'В роботі',
    'completed': 'Завершено',
    'cancelled': 'Скасовано',
    'payment_failed': 'Помилка оплати',
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
          <span>${order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Користувач видалений'}</span>
        </div>
        <div class="detail-item">
          <label>Email</label>
          <span>${order.user ? order.user.email : 'N/A'}</span>
        </div>
        <div class="detail-item">
          <label>Телефон</label>
          <span>${order.user ? (order.user.phone || 'N/A') : 'N/A'}</span>
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
          <div class="status-control">
            <span class="status-badge status-${order.status}">${getStatusText(order.status)}</span>
            <button class="action-btn change-status" onclick="showStatusChangeModal('${order._id}', '${order.status}')">Змінити статус</button>
          </div>
        </div>
        <div class="detail-item">
          <label>Підтверджено</label>
          <span>${order.confirmed ? 'Так' : 'Ні'}</span>
        </div>
        <div class="detail-item">
          <label>Ціна</label>
          <span>${order.amount ? order.amount.toLocaleString('uk-UA') + ' грн' : 'Не встановлено'}</span>
        </div>
        <div class="detail-item">
          <label>Тариф</label>
          <span>${order.tariffType || 'Не обрано'}</span>
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
  const setPriceBtn = document.getElementById('setPriceBtn');
  const priceSection = document.getElementById('priceInputSection');
  const priceInput = document.getElementById('orderPrice');
  
  if (order.confirmed || !order.user) {
    confirmBtn.style.display = 'none';
    setPriceBtn.style.display = 'none';
    priceSection.style.display = 'none';
    if (!order.user) {
      const warningDiv = document.createElement('div');
      warningDiv.style.color = '#dc3545';
      warningDiv.style.marginTop = '10px';
      warningDiv.textContent = 'Неможливо підтвердити замовлення: користувач видалений';
      document.getElementById('orderDetailsContent').appendChild(warningDiv);
    }
  } else {
    priceSection.style.display = 'block';
    
    // Встановлюємо поточну ціну якщо вона є
    if (order.amount) {
      priceInput.value = order.amount;
      // Якщо ціна вже встановлена, показуємо кнопку підтвердження
      setPriceBtn.style.display = 'none';
      confirmBtn.style.display = 'block';
      confirmBtn.onclick = () => confirmOrder(orderId);
    } else {
      // Встановлюємо стандартну ціну за тариф
      const defaultPrices = {
        'single': 5000,
        'landing': 8000,
        'blog': 12000
      };
      priceInput.value = defaultPrices[order.tariffType] || 5000;
      
      // Якщо ціна не встановлена, показуємо кнопку встановлення ціни
      setPriceBtn.style.display = 'block';
      confirmBtn.style.display = 'none';
      setPriceBtn.onclick = () => setPriceAndSendPayment(orderId);
    }
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

// Set price and send payment details to client
async function setPriceAndSendPayment(orderId) {
  console.log('setPriceAndSendPayment called with orderId:', orderId);
  
  // Check if user is admin
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!user || !token || user.role !== 'admin') {
    showAlert('Доступ заборонено. Тільки адміністратори можуть встановлювати ціну.', 'error', 'Помилка');
    return;
  }
  
  // Отримуємо ціну з поля введення
  const priceInput = document.getElementById('orderPrice');
  const customPrice = parseInt(priceInput.value);
  
  if (!customPrice || customPrice <= 0) {
    showAlert('Будь ласка, введіть коректну ціну для замовлення.', 'error', 'Помилка');
    return;
  }
  
  const confirmed = await showConfirm(
    `Встановити ціну ${customPrice.toLocaleString('uk-UA')} грн та відправити реквізити клієнту?`, 
    'Встановлення ціни'
  );
  if (!confirmed) return;
  
  console.log('Setting price for order:', orderId, 'amount:', customPrice);
  
  try {
    const response = await fetch(getAPIUrl(`/api/orders/${orderId}/set-price`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: customPrice })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Price set successfully:', result);
      showAlert('Ціну встановлено! Клієнт отримав реквізити для оплати.', 'success', 'Успіх');
      closeOrderDetails();
      loadOrders();
    } else {
      let errorMessage = 'Невідома помилка сервера';
      try {
        const result = await response.json();
        console.log('Error response:', result);
        errorMessage = result.error || result.message || errorMessage;
      } catch (jsonError) {
        console.error('Failed to parse error response:', jsonError);
        errorMessage = `Помилка сервера (${response.status}): ${response.statusText}`;
      }
      showAlert('Помилка: ' + errorMessage, 'error', 'Помилка');
    }
  } catch (error) {
    console.error('Error setting price:', error);
    showAlert('Помилка при встановленні ціни: ' + error.message, 'error', 'Помилка');
  }
}

// Confirm order (only after price is set)
async function confirmOrder(orderId) {
  console.log('confirmOrder called with orderId:', orderId);
  
  // Check if user is admin
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!user || !token || user.role !== 'admin') {
    showAlert('Доступ заборонено. Тільки адміністратори можуть підтверджувати замовлення.', 'error', 'Помилка');
    return;
  }
  
  const confirmed = await showConfirm(
    'Підтвердити замовлення та сформувати договір?', 
    'Підтвердження замовлення'
  );
  if (!confirmed) return;
  
  console.log('Confirming order:', orderId);
  
  try {
    const response = await fetch(getAPIUrl(`/api/orders/confirm/${orderId}`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Order confirmed successfully:', result);
      showAlert('Замовлення підтверджено! Договір сформовано.', 'success', 'Успіх');
      closeOrderDetails();
      loadOrders();
    } else {
      let errorMessage = 'Невідома помилка сервера';
      try {
        const result = await response.json();
        console.log('Error response:', result);
        errorMessage = result.error || result.message || errorMessage;
      } catch (jsonError) {
        console.error('Failed to parse error response:', jsonError);
        errorMessage = `Помилка сервера (${response.status}): ${response.statusText}`;
      }
      showAlert('Помилка: ' + errorMessage, 'error', 'Помилка');
    }
  } catch (error) {
    console.error('Error confirming order:', error);
    showAlert('Помилка при підтвердженні замовлення: ' + error.message, 'error', 'Помилка');
  }
}

// Close order details modal
function closeOrderDetails() {
  document.getElementById('orderDetailsModal').style.display = 'none';
  currentOrderId = null;
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(targetTab + 'Tab');
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Load data based on tab
      if (targetTab === 'reviews') {
        loadReviews();
      } else if (targetTab === 'orders') {
        loadOrders();
      }
    });
  });
}

// Load reviews
async function loadReviews() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl('/api/reviews/admin/all'), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const reviews = await response.json();
      displayReviews(reviews);
    } else {
      console.error('Failed to load reviews');
      showAlert('Помилка завантаження відгуків', 'error');
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
    showAlert('Помилка завантаження відгуків', 'error');
  }
}

// Display reviews in table
function displayReviews(reviews) {
  const tbody = document.getElementById('reviewsTableBody');
  const reviewsSection = document.querySelector('#reviewsTab .reviews-section');
  
  if (reviews.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="loading">Відгуків поки немає</td></tr>';
    // Clear mobile cards
    const existingMobileCards = reviewsSection.querySelectorAll('.mobile-review-card');
    existingMobileCards.forEach(card => card.remove());
    return;
  }

  // Display table rows
  tbody.innerHTML = reviews.map(review => {
    const stars = '⭐'.repeat(review.rating);
    const statusClass = review.isApproved ? 'approved' : (review.isVisible ? 'pending' : 'hidden');
    const statusText = review.isApproved ? 'Схвалено' : (review.isVisible ? 'Очікує модерації' : 'Приховано');
    
    return `
      <tr>
        <td>${review.clientName}</td>
        <td>${review.projectType}</td>
        <td>
          <div class="review-rating">
            ${stars} (${review.rating}/5)
          </div>
        </td>
        <td>
          <div class="review-comment">${review.comment}</div>
        </td>
        <td>${new Date(review.createdAt).toLocaleDateString('uk-UA')}</td>
        <td>
          <span class="review-status ${statusClass}">${statusText}</span>
        </td>
        <td>
          <div class="action-buttons">
            ${!review.isApproved ? `<button class="action-btn confirm" onclick="approveReview('${review._id}')">Схвалити</button>` : ''}
            ${review.isVisible ? `<button class="action-btn delete" onclick="hideReview('${review._id}')">Приховати</button>` : `<button class="action-btn view" onclick="showReview('${review._id}')">Показати</button>`}
            <button class="action-btn delete" onclick="deleteReview('${review._id}')">Видалити</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Clear existing mobile cards
  const existingMobileCards = reviewsSection.querySelectorAll('.mobile-review-card');
  existingMobileCards.forEach(card => card.remove());

  // Create mobile cards
  const mobileCards = reviews.map(review => {
    const stars = '⭐'.repeat(review.rating);
    const statusClass = review.isApproved ? 'approved' : (review.isVisible ? 'pending' : 'hidden');
    const statusText = review.isApproved ? 'Схвалено' : (review.isVisible ? 'Очікує модерації' : 'Приховано');
    
    const cardElement = document.createElement('div');
    cardElement.className = 'mobile-review-card';
    cardElement.innerHTML = `
      <h4>
        ${review.clientName}
        <span class="mobile-review-rating">${stars}</span>
      </h4>
      <div class="mobile-review-detail">
        <span><strong>Проект:</strong></span>
        <span>${review.projectType}</span>
      </div>
      <div class="mobile-review-detail">
        <span><strong>Дата:</strong></span>
        <span>${new Date(review.createdAt).toLocaleDateString('uk-UA')}</span>
      </div>
      <div class="mobile-review-detail">
        <span><strong>Статус:</strong></span>
        <span class="review-status ${statusClass}">${statusText}</span>
      </div>
      <div class="mobile-review-comment">${review.comment}</div>
      <div class="mobile-review-actions">
        ${!review.isApproved ? `<button class="action-btn confirm" onclick="approveReview('${review._id}')">Схвалити</button>` : ''}
        ${review.isVisible ? `<button class="action-btn delete" onclick="hideReview('${review._id}')">Приховати</button>` : `<button class="action-btn view" onclick="showReview('${review._id}')">Показати</button>`}
        <button class="action-btn delete" onclick="deleteReview('${review._id}')">Видалити</button>
      </div>
    `;
    return cardElement;
  });

  // Add mobile cards after the table
  const reviewsTable = reviewsSection.querySelector('.reviews-table');
  mobileCards.forEach(card => {
    reviewsSection.insertBefore(card, reviewsTable.nextSibling);
  });
}

// Approve review
async function approveReview(reviewId) {
  const confirmed = await showConfirm('Схвалити цей відгук для публікації?', 'Схвалення відгуку');
  if (!confirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/reviews/admin/${reviewId}/visibility`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isApproved: true, isVisible: true })
    });

    if (response.ok) {
      showAlert('Відгук схвалено!', 'success');
      loadReviews();
    } else {
      const error = await response.json();
      showAlert('Помилка: ' + error.error, 'error');
    }
  } catch (error) {
    console.error('Error approving review:', error);
    showAlert('Помилка при схваленні відгуку', 'error');
  }
}

// Hide review
async function hideReview(reviewId) {
  const confirmed = await showConfirm('Приховати цей відгук?', 'Приховування відгуку');
  if (!confirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/reviews/admin/${reviewId}/visibility`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isVisible: false })
    });

    if (response.ok) {
      showAlert('Відгук приховано!', 'success');
      loadReviews();
    } else {
      const error = await response.json();
      showAlert('Помилка: ' + error.error, 'error');
    }
  } catch (error) {
    console.error('Error hiding review:', error);
    showAlert('Помилка при прихованні відгуку', 'error');
  }
}

// Show review
async function showReview(reviewId) {
  const confirmed = await showConfirm('Показати цей відгук?', 'Показ відгуку');
  if (!confirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/reviews/admin/${reviewId}/visibility`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isVisible: true })
    });

    if (response.ok) {
      showAlert('Відгук показано!', 'success');
      loadReviews();
    } else {
      const error = await response.json();
      showAlert('Помилка: ' + error.error, 'error');
    }
  } catch (error) {
    console.error('Error showing review:', error);
    showAlert('Помилка при показі відгуку', 'error');
  }
}

// Delete review
async function deleteReview(reviewId) {
  const confirmed = await showConfirm('Видалити цей відгук назавжди?', 'Видалення відгуку');
  if (!confirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/reviews/admin/${reviewId}`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      showAlert('Відгук видалено!', 'success');
      loadReviews();
    } else {
      const error = await response.json();
      showAlert('Помилка: ' + error.error, 'error');
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    showAlert('Помилка при видаленні відгуку', 'error');
  }
}

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// Mobile theme toggle
const mobileThemeToggle = document.getElementById("themeToggleMob");
if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = document.getElementById("icon");
  const iconMob = document.getElementById("iconMob");
  const themeIcon = theme === "dark" ? "☀️" : "🌙";
  
  if (icon) {
    icon.textContent = themeIcon;
  }
  if (iconMob) {
    iconMob.textContent = themeIcon;
  }
}

function showUserMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Create a better logout menu
  const menuHtml = `
    <div class="user-menu-overlay" onclick="closeUserMenu()">
      <div class="user-menu" onclick="event.stopPropagation()">
        <div class="user-info">
          <h3>Привіт, ${user.firstName}!</h3>
          <p>${user.email}</p>
          <span class="admin-badge">👑 Адміністратор</span>
        </div>
        <div class="menu-actions">
          <button onclick="openPasswordModal()" class="menu-btn">
            🔑 Змінити пароль
          </button>
          <button onclick="logout()" class="menu-btn logout-btn">
            🚪 Вийти з акаунту
          </button>
          <button onclick="closeUserMenu()" class="menu-btn cancel-btn">
            ❌ Скасувати
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add menu to page
  const menuContainer = document.createElement('div');
  menuContainer.innerHTML = menuHtml;
  document.body.appendChild(menuContainer);
}

function closeUserMenu() {
  const overlay = document.querySelector('.user-menu-overlay');
  if (overlay) {
    overlay.remove();
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('theme');
  window.location.href = '/';
}

// Status change functionality
function showStatusChangeModal(orderId, currentStatus) {
  const statusOptions = [
    { value: 'draft', label: 'Чернетка' },
    { value: 'pending_payment', label: 'Очікує оплати' },
    { value: 'paid', label: 'Оплачено' },
    { value: 'in_progress', label: 'В роботі' },
    { value: 'completed', label: 'Завершено' },
    { value: 'cancelled', label: 'Скасовано' },
    { value: 'payment_failed', label: 'Помилка оплати' }
  ];

  const selectOptions = statusOptions
    .map(option => `<option value="${option.value}" ${option.value === currentStatus ? 'selected' : ''}>${option.label}</option>`)
    .join('');

  const modalHtml = `
    <div class="modal-overlay" onclick="closeStatusModal()">
      <div class="modal-content status-modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2>Зміна статусу замовлення</h2>
          <button class="close-btn" onclick="closeStatusModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="statusSelect">Виберіть новий статус:</label>
            <select id="statusSelect" class="form-control">
              ${selectOptions}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeStatusModal()">Скасувати</button>
          <button class="btn btn-primary" onclick="updateOrderStatus('${orderId}')">Змінити статус</button>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  modalContainer.id = 'statusModalContainer';
  document.body.appendChild(modalContainer);
}

function closeStatusModal() {
  const modal = document.getElementById('statusModalContainer');
  if (modal) {
    modal.remove();
  }
}

async function updateOrderStatus(orderId) {
  const statusSelect = document.getElementById('statusSelect');
  const newStatus = statusSelect.value;
  
  if (!newStatus) {
    showAlert('Будь ласка, виберіть статус', 'error', 'Помилка');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/orders/${orderId}/status`), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
      const result = await response.json();
      showAlert('Статус замовлення успішно оновлено', 'success', 'Успіх');
      closeStatusModal();
      
      // Оновлюємо список замовлень
      await loadOrders();
      
      // Якщо модальне вікно замовлення відкрите, оновлюємо його
      if (currentOrderId === orderId) {
        viewOrder(orderId);
      }
    } else {
      const error = await response.text();
      showAlert(`Помилка оновлення статусу: ${error}`, 'error', 'Помилка');
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    showAlert(`Помилка з'єднання з сервером', 'error', 'Помилка'`);
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

// Delete order function
async function deleteOrder(orderId) {
  const confirmed = await showConfirm(
    'Ви впевнені, що хочете видалити це замовлення? Цю дію не можна буде скасувати.',
    'Видалення замовлення'
  );
  
  if (!confirmed) return;
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getAPIUrl(`/api/admin/orders/${orderId}`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      await showAlert('Замовлення успішно видалено', 'success');
      // Оновлюємо список замовлень
      await loadOrders();
      // Закриваємо модальне вікно якщо воно відкрите
      closeOrderDetails();
    } else {
      const error = await response.json();
      await showAlert(`Помилка видалення: ${error.error}`, 'error');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    await showAlert('Помилка видалення замовлення', 'error');
  }
}


// Simple admin login
async function adminLogin() {
  try {
    // Створюємо тимчасовий токен з адмін правами
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTI5NDc4OTQsImV4cCI6MTc1MzU1MjY5NH0.qaR8uNFb3eTBIqN1qghgkN1Tetdo3Myp64bzJYtmivc';
    const adminUser = { role: 'admin', email: 'admin@test.com' };
    
    localStorage.setItem('token', adminToken);
    localStorage.setItem('user', JSON.stringify(adminUser));
    
    document.getElementById('adminLoginSection').style.display = 'none';
    await loadOrders(); // Завантажуємо замовлення після логіну
    
    showAlert('Успішно увійшли як адмін', 'success');
  } catch (error) {
    showAlert('Помилка входу', 'error');
  }
}

// Add event listener for delete button
document.addEventListener('DOMContentLoaded', function() {
  // Check admin auth on page load
  if (!checkAdminAuth()) {
    document.getElementById('ordersTableBody').innerHTML = 
      '<tr><td colspan="8" class="loading">Увійдіть як адмін для перегляду замовлень</td></tr>';
  }
  
  // Admin login button handler
  document.getElementById('adminLoginBtn').addEventListener('click', adminLogin);
  
  // Delete order button handler
  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'deleteOrderBtn') {
      if (currentOrderId) {
        deleteOrder(currentOrderId);
      }
    }
  });
});

// Make functions globally available
window.showPopup = showPopup;
window.closePopup = closePopup;
window.confirmPopup = confirmPopup;
window.showAlert = showAlert;
window.showConfirm = showConfirm;
window.deleteOrder = deleteOrder;

// Mobile menu functions
function openMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('orderDetailsModal');
  if (event.target === modal) {
    closeOrderDetails();
  }
  
  const popupModal = document.getElementById('popupModal');
  if (event.target === popupModal) {
    closePopup();
  }
}

// Add mobile menu event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu handlers
  const openMenuBtn = document.getElementById('openMenu');
  const closeMenuBtn = document.getElementById('closeMenu');
  
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMobileMenu);
  }
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }
  
  // Close mobile menu when clicking on menu links
  const mobileMenuLinks = document.querySelectorAll('.header__mob__menu__list__li a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Only close menu if it's not a # link (prevent closing on dropdown toggles)
      if (!link.getAttribute('href').startsWith('#')) {
        setTimeout(closeMobileMenu, 100);
      }
    });
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});

// Make mobile menu functions globally available
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;