(function () {
  const modal = document.getElementById('orderDetailsModal');
  if (!modal) return;

  const modalContent = modal.querySelector('[data-modal-content]');
  const closeBtn = document.getElementById('closeModalBtn');
  const closeTop = document.getElementById('closeModalTop');

  const elOrderId = document.getElementById('modalOrderID');
  const elOrderDate = document.getElementById('modalOrderDate');
  const elTotal = document.getElementById('modalTotalPrice');

  function openModal(id, date, total) {
    if (elOrderId) elOrderId.textContent = id;
    if (elOrderDate) elOrderDate.textContent = date;
    if (elTotal) elTotal.textContent = total;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // animation
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modalContent?.classList.remove('scale-95');
      modalContent?.classList.add('scale-100');
    });
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modalContent?.classList.remove('scale-100');
    modalContent?.classList.add('scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 250);
  }

  // Event delegation: click "View Details" in table
  const table = document.querySelector('table');
  table?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const label = (btn.textContent || '').trim();
    if (label !== 'View Details') return;

    const row = btn.closest('tr');
    if (!row) return;

    const id = row.querySelector('p.text-sm.font-bold')?.textContent?.trim() || '#';
    const date = row.cells?.[1]?.textContent?.trim() || '';
    const total = row.cells?.[2]?.textContent?.trim() || '';

    openModal(id, date, total);
  });

  closeBtn?.addEventListener('click', closeModal);
  closeTop?.addEventListener('click', closeModal);

  // click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
})();


document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const themeToggle = document.getElementById('theme-toggle-dropdown');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Menu dropdown elements
  const menuDropdownWrapper = document.querySelector('.menu-dropdown-wrapper');
  const menuDropdown = document.getElementById('menu-dropdown');
  const menuOptions = document.querySelectorAll('.menu-option');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'dropdown-overlay';
  document.body.appendChild(overlay);

  /*========== Toggle User Profile Dropdown ==========*/
  userProfileBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isActive = userDropdown.classList.contains('active');

    if (isActive) {
      closeUserDropdown();
    } else {
      openUserDropdown();
    }
  });

  function openUserDropdown() {
    userDropdown.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeUserDropdown() {
    userDropdown.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /*========== Close dropdown when clicking outside ==========*/
  overlay.addEventListener('click', closeUserDropdown);

  document.addEventListener('click', function (e) {
    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeUserDropdown();
    }
  });

  // Prevent dropdown from closing when clicking inside
  userDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  /*========== Menu Dropdown Hover - AUTO SHOW/HIDE ==========*/
  // Menu dropdown tự động hiện khi hover, không cần click
  // CSS đã xử lý phần hover, JS chỉ cần handle click events

  /*========== Menu Options Click Handlers ==========*/
  menuOptions.forEach(option => {
    option.addEventListener('click', function (e) {
      // Xóa e.preventDefault() đi
      // Để link tự chuyển trang bình thường
      const href = this.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    });
  });

  /*========== Theme Toggle Functionality ==========*/
  const html = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.classList.add(currentTheme);

  // Update toggle switch state based on current theme
  if (currentTheme === 'dark') {
    themeToggle.classList.add('active');
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', function () {
    const isDark = html.classList.contains('dark');

    if (isDark) {
      html.classList.remove('dark');
      html.classList.add('light');
      themeToggle.classList.remove('active');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      themeToggle.classList.add('active');
      localStorage.setItem('theme', 'dark');
    }
  });

  /*========== Language Toggle Functionality ==========*/

  // Get current language from localStorage or default to 'vi'
  let currentLang = localStorage.getItem('language') || 'vi';

  // Set initial language
  setLanguage(currentLang);

  // Language button click handlers
  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  function setLanguage(lang) {
    currentLang = lang;

    // Update active state on buttons
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Apply translations
    applyTranslations(lang);

    // Save to localStorage
    localStorage.setItem('language', lang);
  }

  function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Kiểm tra nếu element có chứa icon (menu options)
        const span = element.querySelector('span');
        if (span) {
          // Chỉ thay đổi text trong span, giữ nguyên icon
          span.textContent = translations[lang][key];
        } else {
          // Các element thông thường không có icon
          element.textContent = translations[lang][key];
        }
      }
    });
  }

  /*========== Action Buttons ==========*/

  // Login button
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      console.log('Login clicked');
      alert('Chức năng đăng nhập / Login function');
      closeUserDropdown();
    });
  }

  // Sign out button
  const registerBtn = document.querySelector('.btn-register');
  if (registerBtn) {
    registerBtn.addEventListener('click', function () {
      console.log('Register clicked');
      window.location.href = '../HTML-INTERFACE/Register.HTML';
      alert('Chức năng đăng ký / Register function');
      closeUserDropdown();
    });
  }
  
  /*========== Escape key to close dropdown ==========*/
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
      closeUserDropdown();
    }
  });
});

