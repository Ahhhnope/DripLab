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
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
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
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
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
  if(userProfileBtn) {
    userProfileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = userDropdown.classList.contains('active');
      
      if (isActive) {
        closeUserDropdown();
      } else {
        openUserDropdown();
      }
    });
  }
  
  function openUserDropdown() {
    if(userDropdown) {
      userDropdown.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeUserDropdown() {
    if(userDropdown) {
      userDropdown.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  /*========== Close dropdown when clicking outside ==========*/
  overlay.addEventListener('click', closeUserDropdown);
  
  document.addEventListener('click', function(e) {
    if (userDropdown && !userDropdown.contains(e.target) && userProfileBtn && !userProfileBtn.contains(e.target)) {
      closeUserDropdown();
    }
  });
  
  // Prevent dropdown from closing when clicking inside
  if(userDropdown) {
    userDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  /*========== Menu Dropdown Hover - AUTO SHOW/HIDE ==========*/
  // Menu dropdown tự động hiện khi hover, không cần click
  // CSS đã xử lý phần hover, JS chỉ cần handle click events
  
  /*========== Menu Options Click Handlers ==========*/
  menuOptions.forEach(option => {
     option.addEventListener('click', function() {
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
  if (themeToggle) {
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
  }
  
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
  
  /*========== Action Buttons ==========*/
  
  // Login button
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      console.log('Login clicked');
      alert('Chức năng đăng nhập / Login function');
      closeUserDropdown();
    });
  }
  
  // Sign out button
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
    if (e.key === 'Escape' && userDropdown && userDropdown.classList.contains('active')) {
      closeUserDropdown();
    }
  });
});

/*=============== HIDE & SHOW PASSWORD ===============*/
const showHiddenPass = (password, eye) => {
    const input = document.getElementById(password),
          iconEye = document.getElementById(eye)

    if(iconEye) {
        iconEye.addEventListener('click', () => {
            input.type === 'password' ? input.type = 'text'
                                      : input.type = 'password'
                                      
            iconEye.classList.toggle('ri-eye-off-line')
            iconEye.classList.toggle('ri-eye-line')
        })
    }
}

showHiddenPass('LoginPassword','LoginEye')

/*=============== IMAGE SWIPER ===============*/
class ImageSwiper {
    constructor() {
        this.slides = document.querySelectorAll('.login-swiper-slide');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        if(this.slides.length === 0) return;
        
        this.createPagination();
        
        this.addNavigationListeners();
        
        this.addSwipeListeners();
        
        this.startAutoPlay();
    }

    createPagination() {
        const paginationContainer = document.querySelector('.swiper-pagination');
        if(!paginationContainer) return;
        
        this.slides.forEach((_, index) => {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            if(index === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
            paginationContainer.appendChild(bullet);
        });
    }

    addNavigationListeners() {
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoPlay();
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
    }

    addSwipeListeners() {
        const swiperWrapper = document.querySelector('.login-swiper-wrapper');
        if(!swiperWrapper) return;

        swiperWrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        swiperWrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        let isMouseDown = false;
        
        swiperWrapper.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            this.touchStartX = e.screenX;
            swiperWrapper.style.cursor = 'grabbing';
        });

        swiperWrapper.addEventListener('mouseup', (e) => {
            if(isMouseDown) {
                this.touchEndX = e.screenX;
                this.handleSwipe();
                isMouseDown = false;
                swiperWrapper.style.cursor = 'grab';
            }
        });

        swiperWrapper.addEventListener('mouseleave', () => {
            isMouseDown = false;
            swiperWrapper.style.cursor = 'grab';
        });

        swiperWrapper.style.cursor = 'grab';
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if(Math.abs(diff) > swipeThreshold) {
            if(diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
            this.resetAutoPlay();
        }
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.remove('active');
        }

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Auto change every 5 seconds
    }

    stopAutoPlay() {
        if(this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

let swiperInstance = null;

// Khởi tạo swiper sau khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    swiperInstance = new ImageSwiper();
});

// Dừng autoplay khi tab không active
document.addEventListener('visibilitychange', () => {
    if(swiperInstance) {
        if(document.hidden) {
            swiperInstance.stopAutoPlay();
        } else {
            swiperInstance.startAutoPlay();
        }
    }
});