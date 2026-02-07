/*===============================================*/
/*========== CẤU HÌNH AVATAR - ĐỔI URL Ở ĐÂY ==========*/
/*===============================================*/

// ========== ĐỔI AVATAR: Thay URL bên dưới ==========
const USER_AVATAR_URL = "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=50743e&color=fff&size=120";
// Ví dụ các URL khác bạn có thể dùng:
// const USER_AVATAR_URL = "https://i.imgur.com/abc123.jpg";
// const USER_AVATAR_URL = "https://example.com/my-photo.png";
// const USER_AVATAR_URL = "https://avatars.githubusercontent.com/u/123456";

/*===============================================*/
/*========== THÊM MỚI: I18N TRANSLATIONS ==========*/
/*===============================================*/

const translations = {
  vi: {
    // Navigation
    "nav.menu": "MENU",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.news": "TIN TỨC",
    "nav.stores": "CỬA HÀNG",
    
    // Profile Dropdown
    "profile.title": "Thông Tin Tài Khoản",
    "profile.userName": "Nguyễn Văn A",
    "profile.theme": "Chế độ tối",
    "profile.language": "Ngôn ngữ",
    "profile.signout": "Đăng xuất",
    
    // Content
    "content.title": "Tiêu đề trang của bạn",
    "content.description": "Nội dung ở đây...",
    
    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  },
  en: {
    // Navigation
    "nav.menu": "MENU",
    "nav.about": "ABOUT US",
    "nav.news": "NEWS",
    "nav.stores": "STORES",
    
    // Profile Dropdown
    "profile.title": "Account Information",
    "profile.userName": "Nguyen Van A",
    "profile.theme": "Dark mode",
    "profile.language": "Language",
    "profile.signout": "Sign out",
    
    // Content
    "content.title": "Your page title",
    "content.description": "Content goes here...",
    
    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  }
};

/*===============================================*/
/*========== THÊM MỚI: DROPDOWN FUNCTIONALITY ==========*/
/*===============================================*/

document.addEventListener('DOMContentLoaded', function() {
  // ========== Set avatar từ config ==========
  const avatarImg = document.getElementById('user-avatar-img');
  if (avatarImg && USER_AVATAR_URL) {
    avatarImg.src = USER_AVATAR_URL;
  }
  
  // Get elements
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const themeToggle = document.getElementById('theme-toggle-dropdown');
  const langButtons = document.querySelectorAll('.lang-btn');
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'dropdown-overlay';
  document.body.appendChild(overlay);
  
  /*========== Toggle Dropdown ==========*/
  userProfileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isActive = userDropdown.classList.contains('active');
    
    if (isActive) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });
  
  function openDropdown() {
    userDropdown.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when dropdown is open
  }
  
  function closeDropdown() {
    userDropdown.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
  
  /*========== Close dropdown when clicking outside ==========*/
  overlay.addEventListener('click', closeDropdown);
  
  // Close dropdown when clicking anywhere else
  document.addEventListener('click', function(e) {
    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Prevent dropdown from closing when clicking inside
  userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
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
  themeToggle.addEventListener('click', function() {
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
    btn.addEventListener('click', function() {
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
        element.textContent = translations[lang][key];
      }
    });
  }
  
  /*========== Action Buttons ==========*/
  
  /* ========== REMOVED: Login button không còn tồn tại ========== */
  
  // Sign out button
  const signoutBtn = document.querySelector('.btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function() {
      console.log('Sign out clicked');
      const confirmSignout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to sign out?');
      if (confirmSignout) {
        alert('Đã đăng xuất / Signed out');
        closeDropdown();
      }
    });
  }
  
  /*========== Escape key to close dropdown ==========*/
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
      closeDropdown();
    }
  });
});

/*===============================================*/
/*========== KẾT THÚC: DROPDOWN FUNCTIONALITY ==========*/
/*===============================================*/