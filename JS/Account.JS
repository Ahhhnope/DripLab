const translations = {
  vi: {
    // Navigation
    "nav.menu": "MENU",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.news": "TIN TỨC",
    "nav.stores": "CỬA HÀNG",
    
    // Menu Dropdown
    "menu.buyNow": "Mua ngay",
    "menu.customize": "Tự pha chế",
    
    // Profile Dropdown
    "profile.title": "Thông Tin Tài Khoản",
    "profile.userName": "Nguyễn Văn A",
    "profile.theme": "Chế độ tối",
    "profile.language": "Ngôn ngữ",
    "profile.login": "Đăng nhập",
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
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

    // Profile Settings Page
    "sidebar.account": "Account",
    "sidebar.changePassword": "Đổi Mật Khẩu",
    "sidebar.address": "Địa Chỉ",
    "sidebar.orders": "Đơn Hàng",
    "sidebar.favorites": "Yêu Thích",
    "sidebar.logout": "Đăng Xuất",
    "sidebar.badge": "Thành Viên Premium",
    "panel.title": "Cài Đặt Hồ Sơ",
    "panel.picTitle": "Ảnh Đại Diện",
    "panel.picDesc": "PNG, JPG hoặc GIF. Tối đa 2MB.",
    "form.fullName": "Họ và Tên",
    "form.email": "Địa Chỉ Email",
    "form.phone": "Số Điện Thoại",
    "form.save": "Lưu Thay Đổi"
  },
  en: {
    // Navigation
    "nav.menu": "MENU",
    "nav.about": "ABOUT US",
    "nav.news": "NEWS",
    "nav.stores": "STORES",
    
    // Menu Dropdown
    "menu.buyNow": "Buy Now",
    "menu.customize": "Customize",
    
    // Profile Dropdown
    "profile.title": "Account Information",
    "profile.userName": "Nguyen Van A",
    "profile.theme": "Dark mode",
    "profile.language": "Language",
    "profile.login": "Login",
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
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

    // Profile Settings Page
    "sidebar.account": "Account",
    "sidebar.changePassword": "Change Password",
    "sidebar.address": "Address",
    "sidebar.orders": "Orders",
    "sidebar.favorites": "Favorites",
    "sidebar.logout": "Logout",
    "sidebar.badge": "Premium Member",
    "panel.title": "Profile Settings",
    "panel.picTitle": "Profile Picture",
    "panel.picDesc": "PNG, JPG or GIF. Max 2MB.",
    "form.fullName": "Full Name",
    "form.email": "Email Address",
    "form.phone": "Phone Number",
    "form.save": "Save Changes"
  }
};

document.addEventListener('DOMContentLoaded', function() {
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
  userProfileBtn.addEventListener('click', function(e) {
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
  
  document.addEventListener('click', function(e) {
    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeUserDropdown();
    }
  });
  
  // Prevent dropdown from closing when clicking inside
  userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  /*========== Menu Dropdown Hover - AUTO SHOW/HIDE ==========*/
  
  /*========== Menu Options Click Handlers ==========*/
  menuOptions.forEach(option => {
    option.addEventListener('click', function(e) {
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
  
  /*========== Action Buttons - CHỈ CÒN SIGN OUT ==========*/
  
  // Sign out button - thực hiện logout
  const signoutBtn = document.querySelector('.btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function() {
      console.log('Sign out clicked');
      const confirmSignout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to sign out?');
      if (confirmSignout) {
        alert('Đã đăng xuất / Signed out');
        closeUserDropdown();
      }
    });
  }
  
  /*========== Escape key to close dropdown ==========*/
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
      closeUserDropdown();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {

    /*========== SIDEBAR NAVIGATION ==========*/
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.closest('.nav-logout')) {
                e.preventDefault();
                sidebarLinks.forEach(l => {
                    if (!l.closest('.nav-logout')) l.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    /*========== SIDEBAR LOGOUT BUTTON - CLICK ĐƯỢC ==========*/
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const confirmLogout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to logout?');
            if (confirmLogout) {
                alert('Đã đăng xuất / Logged out');
                 window.location.href = '../HTML-INTERFACE/Homepage.html';
            }
        });
    }

    /*========== ĐỔI ẢNH ĐẠI DIỆN ==========*/
    const editPicBtn = document.querySelector('.edit-pic-btn');

    if (editPicBtn) {
        editPicBtn.addEventListener('click', function () {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/png, image/jpeg, image/gif';

            fileInput.addEventListener('change', function () {
                const file = this.files[0];
                if (!file) return;

                if (file.size > 2 * 1024 * 1024) {
                    alert('File quá lớn! Vui lòng chọn ảnh dưới 2MB.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    const profilePicImg = document.querySelector('.profile-pic-img img');
                    if (profilePicImg) profilePicImg.src = e.target.result;

                    const sidebarAvatarImg = document.querySelector('.sidebar-avatar img');
                    if (sidebarAvatarImg) sidebarAvatarImg.src = e.target.result;

                    const headerAvatarImg = document.getElementById('user-avatar-img');
                    if (headerAvatarImg) headerAvatarImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });

            fileInput.click();
        });
    }

    /*========== NÚT SAVE CHANGES ==========*/
    const saveBtn = document.querySelector('.save-btn');

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const fullName = document.querySelector('.form-input[type="text"]')?.value.trim();
            const email = document.querySelector('.form-input[type="email"]')?.value.trim();

            if (!fullName || !email) {
                alert('Vui lòng điền đầy đủ Họ tên và Email!');
                return;
            }

            const sidebarName = document.querySelector('.sidebar-name');
            if (sidebarName) sidebarName.textContent = fullName;

            const headerName = document.querySelector('.user-name');
            if (headerName) headerName.textContent = fullName;

            const headerEmail = document.querySelector('.user-email');
            if (headerEmail) headerEmail.textContent = email;

            const originalText = this.textContent;
            this.textContent = '✓ Saved!';
            this.style.background = '#3b5e4a';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        });
    }

});