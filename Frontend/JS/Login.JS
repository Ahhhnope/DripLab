const translations = {
  vi: {
    /* NAV */
    "nav.menu": "Thực Đơn",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.news": "TIN TỨC",
    "nav.stores": "CỬA HÀNG",
    "menu.buyNow": "Mua ngay",
    "menu.customize": "Tự pha chế",
    /* PROFILE DROPDOWN */
    "profile.title": "Thông Tin Tài Khoản",
    "profile.userName": "Nguyễn Văn A",
    "profile.theme": "Chế độ tối",
    "profile.language": "Ngôn ngữ",
    "profile.login": "Đăng nhập",
    "profile.register": "Đăng ký",
    /* LOGIN FORM */
    "login.title": "Đăng nhập Drip Lab",
    "login.description": "Chào mừng trở lại với hành trình tìm kiếm tách cà phê hoàn hảo",
    "login.emailPlaceholder": "EMAIL HOẶC SỐ ĐIỆN THOẠI",
    "login.passwordPlaceholder": "MẬT KHẨU",
    "login.remember": "LƯU NHỚ TÀI KHOẢN",
    "login.forgot": "QUÊN MẬT KHẨU?",
    "login.submit": "Đăng Nhập",
    "login.orWith": "HOẶC ĐĂNG NHẬP VỚI",
    "login.newHere": "Chưa có tài khoản?",
    "login.joinUs": "Tham gia Drip Lab",
    "login.followUs": "Theo dõi chúng tôi",
    /* FOOTER */
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",
    /* ===== THÔNG BÁO LỖI VALIDATE ===== */
    "err.email.required":    "Vui lòng nhập email hoặc số điện thoại.",
    "err.email.invalid":     "Email hoặc số điện thoại không hợp lệ.",
    "err.password.required": "Vui lòng nhập mật khẩu.",
    "err.credentials":       "Email hoặc mật khẩu không đúng.",
    "err.server":            "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
  },
  en: {
    /* NAV */
    "nav.menu": "MENU",
    "nav.about": "ABOUT US",
    "nav.news": "NEWS",
    "nav.stores": "STORES",
    "menu.buyNow": "Buy Now",
    "menu.customize": "Customize",
    /* PROFILE DROPDOWN */
    "profile.title": "Account Information",
    "profile.userName": "Nguyen Van A",
    "profile.theme": "Dark mode",
    "profile.language": "Language",
    "profile.login": "Login",
    "profile.register": "Register",
    /* LOGIN FORM */
    "login.title": "Sign in with Drip Lab",
    "login.description": "Welcome back to the pursuit of the perfect brew",
    "login.emailPlaceholder": "EMAIL OR PHONE NUMBER",
    "login.passwordPlaceholder": "PASSWORD",
    "login.remember": "REMEMBER ME",
    "login.forgot": "FORGOT?",
    "login.submit": "Sign In",
    "login.orWith": "OR SIGN IN WITH",
    "login.newHere": "New to the lab?",
    "login.joinUs": "Join Drip Lab",
    "login.followUs": "Follow Us",
    /* FOOTER */
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",
    /* ===== VALIDATION ERROR MESSAGES ===== */
    "err.email.required":    "Please enter your email or phone number.",
    "err.email.invalid":     "Invalid email or phone number.",
    "err.password.required": "Please enter your password.",
    "err.credentials":       "Incorrect email or password.",
    "err.server":            "Cannot connect to server. Please try again later."
  }
};

/* Ngôn ngữ hiện tại — đồng bộ với localStorage */
let currentLang = localStorage.getItem('language') || 'vi';

/** Lấy chuỗi đã dịch theo key */
function t(key) {
  return translations[currentLang]?.[key] || translations['vi']?.[key] || key;
}

/* ============================================================
   VALIDATION HELPERS
   ============================================================ */
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v) { return /^[0-9]{9,11}$/.test(v); }

/**
 * Hiện thông báo lỗi pill bên dưới ô input.
 * @param {HTMLElement} inputEl
 * @param {string}      message  – nội dung hiển thị ngay
 * @param {string}      [errKey] – key translation để tự cập nhật khi đổi ngôn ngữ
 */
function showError(inputEl, message, errKey = '') {
  clearError(inputEl, true);
  inputEl.classList.add('input-error');

  const wrap = _getErrorWrap(inputEl);
  if (!wrap) return;

  const msg = document.createElement('div');
  msg.className = 'field-error-msg';
  if (errKey) msg.setAttribute('data-error-key', errKey);
  msg.innerHTML = `<i class="field-error-icon">!</i><span>${message}</span>`;
  wrap.appendChild(msg);
}

/** Xóa thông báo lỗi */
function clearError(inputEl, immediate = false) {
  inputEl.classList.remove('input-error');
  inputEl.style.removeProperty('border-color');
  inputEl.style.removeProperty('box-shadow');
  inputEl.style.removeProperty('background-color');

  const wrap = _getErrorWrap(inputEl);
  if (!wrap) return;

  const existing = wrap.querySelector('.field-error-msg');
  if (!existing) return;

  if (immediate) {
    existing.remove();
  } else {
    existing.classList.add('removing');
    existing.addEventListener('animationend', () => existing.remove(), { once: true });
  }
}

/** Tìm .field-error-wrap từ input */
function _getErrorWrap(inputEl) {
  const box = inputEl.closest('.login-box');
  const fieldWrap = box ? box.closest('.login-field-wrap') : null;
  return fieldWrap ? fieldWrap.querySelector('.field-error-wrap') : null;
}

/**
 * Cập nhật nội dung TẤT CẢ thông báo lỗi đang hiển thị theo ngôn ngữ mới.
 * Được gọi mỗi khi người dùng chuyển ngôn ngữ.
 */
function refreshErrorMessages() {
  document.querySelectorAll('.field-error-msg[data-error-key]').forEach(msg => {
    const key = msg.getAttribute('data-error-key');
    const translated = t(key);
    if (translated) {
      const span = msg.querySelector('span');
      if (span) span.textContent = translated;
    }
  });
}

/* ============================================================
   VALIDATE LOGIN FORM — validate TẤT CẢ ô cùng lúc
   ============================================================ */
function validateLoginForm(emailVal, passwordVal) {
  const emailInput    = document.querySelector("input[name='email']");
  const passwordInput = document.getElementById('LoginPassword');
  let valid = true;

  if (!emailVal.trim()) {
    showError(emailInput, t('err.email.required'), 'err.email.required');
    valid = false;
  } else if (!isValidEmail(emailVal) && !isValidPhone(emailVal)) {
    showError(emailInput, t('err.email.invalid'), 'err.email.invalid');
    valid = false;
  } else {
    clearError(emailInput);
  }

  if (!passwordVal.trim()) {
    showError(passwordInput, t('err.password.required'), 'err.password.required');
    valid = false;
  } else {
    clearError(passwordInput);
  }

  return valid;
}

/* ============================================================
   REAL-TIME BLUR VALIDATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const emailInput    = document.querySelector("input[name='email']");
  const passwordInput = document.getElementById('LoginPassword');

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const v = emailInput.value.trim();
      if (!v)                                    showError(emailInput, t('err.email.required'), 'err.email.required');
      else if (!isValidEmail(v) && !isValidPhone(v)) showError(emailInput, t('err.email.invalid'), 'err.email.invalid');
      else                                       clearError(emailInput);
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) clearError(emailInput);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('blur', () => {
      if (!passwordInput.value.trim()) showError(passwordInput, t('err.password.required'), 'err.password.required');
      else clearError(passwordInput);
    });
    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('input-error')) clearError(passwordInput);
    });
  }
});

/* ============================================================
   MAIN DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const userProfileBtn   = document.getElementById('user-profile-btn');
  const userDropdown     = document.getElementById('user-dropdown');
  const themeToggle      = document.getElementById('theme-toggle-dropdown');
  const langButtons      = document.querySelectorAll('.lang-btn');
  const menuOptions      = document.querySelectorAll('.menu-option');

  const overlay = document.createElement('div');
  overlay.className = 'dropdown-overlay';
  document.body.appendChild(overlay);

  /* --- Cart Modal --- */
  const cartBtn          = document.getElementById('cart-btn');
  const cartModalOverlay = document.getElementById('cart-modal-overlay');
  const cartModalClose   = document.getElementById('cart-modal-close');

  function openCartModal()  { cartModalOverlay.classList.add('active');    document.body.style.overflow = 'hidden'; }
  function closeCartModal() { cartModalOverlay.classList.remove('active'); document.body.style.overflow = '';       }

  if (cartBtn)          cartBtn.addEventListener('click', e => { e.stopPropagation(); openCartModal(); });
  if (cartModalClose)   cartModalClose.addEventListener('click', closeCartModal);
  if (cartModalOverlay) cartModalOverlay.addEventListener('click', e => { if (e.target === cartModalOverlay) closeCartModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartModalOverlay?.classList.contains('active')) closeCartModal();
  });

  /* --- User Dropdown --- */
  if (userProfileBtn) {
    userProfileBtn.addEventListener('click', e => {
      e.stopPropagation();
      userDropdown.classList.contains('active') ? closeUserDropdown() : openUserDropdown();
    });
  }

  function openUserDropdown()  { if (userDropdown) { userDropdown.classList.add('active');    overlay.classList.add('active');    document.body.style.overflow = 'hidden'; } }
  function closeUserDropdown() { if (userDropdown) { userDropdown.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = '';       } }

  overlay.addEventListener('click', closeUserDropdown);
  document.addEventListener('click', e => {
    if (userDropdown && !userDropdown.contains(e.target) && userProfileBtn && !userProfileBtn.contains(e.target)) closeUserDropdown();
  });
  if (userDropdown) userDropdown.addEventListener('click', e => e.stopPropagation());

  menuOptions.forEach(opt => opt.addEventListener('click', function () {
    const h = this.getAttribute('href'); if (h) window.location.href = h;
  }));

  /* --- Theme --- */
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.classList.add(savedTheme);
  if (themeToggle) {
    if (savedTheme === 'dark') themeToggle.classList.add('active');
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      html.classList.toggle('dark', !isDark);
      html.classList.toggle('light', isDark);
      themeToggle.classList.toggle('active', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  /* --- Language --- */
  setLanguage(currentLang);

  langButtons.forEach(btn => btn.addEventListener('click', function () {
    setLanguage(this.getAttribute('data-lang'));
  }));

  function setLanguage(lang) {
    currentLang = lang;                    // cập nhật biến module-level
    langButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    refreshErrorMessages();                // ← dịch lại các thông báo lỗi đang hiện
    localStorage.setItem('language', lang);
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang]?.[key]) {
        const span = el.querySelector('span');
        if (span) span.textContent = translations[lang][key];
        else el.textContent = translations[lang][key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang]?.[key]) el.setAttribute('placeholder', translations[lang][key]);
    });
  }

  /* --- Dropdown action buttons --- */
  const loginBtn    = document.querySelector('.btn-login');
  const registerBtn = document.querySelector('.btn-register');
  if (loginBtn)    loginBtn.addEventListener('click',    () => { window.location.href = '../HTML-INTERFACE/Login.HTML';    closeUserDropdown(); });
  if (registerBtn) registerBtn.addEventListener('click', () => { window.location.href = '../HTML-INTERFACE/Register.HTML'; closeUserDropdown(); });

  /* --- Remember Me --- */
  const rememberCheckbox = document.getElementById('RememberMe');
  const emailInputEl     = document.querySelector('input[name="email"]');
  if (rememberCheckbox && emailInputEl) {
    if (localStorage.getItem('rememberMe') === 'true' && localStorage.getItem('savedEmail')) {
      rememberCheckbox.checked = true;
      emailInputEl.value = localStorage.getItem('savedEmail');
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && userDropdown?.classList.contains('active')) closeUserDropdown();
  });
});

/* ============================================================
   SHOW / HIDE PASSWORD
   ============================================================ */
const showHiddenPass = (passwordId, eyeId) => {
  const input   = document.getElementById(passwordId);
  const iconEye = document.getElementById(eyeId);
  if (iconEye) {
    iconEye.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
      iconEye.classList.toggle('ri-eye-off-line');
      iconEye.classList.toggle('ri-eye-line');
    });
  }
};
showHiddenPass('LoginPassword', 'LoginEye');

/* ============================================================
   IMAGE SWIPER
   ============================================================ */
class ImageSwiper {
  constructor() {
    this.slides = document.querySelectorAll('.login-swiper-slide');
    this.currentSlide = 0; this.autoPlayInterval = null;
    this.touchStartX = 0;  this.touchEndX = 0;
    this.init();
  }
  init() {
    if (!this.slides.length) return;
    this.createPagination(); this.addNavigationListeners(); this.addSwipeListeners(); this.startAutoPlay();
  }
  createPagination() {
    const c = document.querySelector('.swiper-pagination'); if (!c) return;
    this.slides.forEach((_, i) => {
      const b = document.createElement('div');
      b.classList.add('swiper-pagination-bullet');
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => { this.goToSlide(i); this.resetAutoPlay(); });
      c.appendChild(b);
    });
  }
  addNavigationListeners() {
    document.querySelector('.swiper-button-prev')?.addEventListener('click', () => { this.previousSlide(); this.resetAutoPlay(); });
    document.querySelector('.swiper-button-next')?.addEventListener('click', () => { this.nextSlide();     this.resetAutoPlay(); });
  }
  addSwipeListeners() {
    const w = document.querySelector('.login-swiper-wrapper'); if (!w) return;
    let md = false;
    w.addEventListener('touchstart', e => { this.touchStartX = e.changedTouches[0].screenX; });
    w.addEventListener('touchend',   e => { this.touchEndX   = e.changedTouches[0].screenX; this.handleSwipe(); });
    w.addEventListener('mousedown',  e => { md = true;  this.touchStartX = e.screenX; w.style.cursor = 'grabbing'; });
    w.addEventListener('mouseup',    e => { if (md) { this.touchEndX = e.screenX; this.handleSwipe(); md = false; w.style.cursor = 'grab'; } });
    w.addEventListener('mouseleave', () => { md = false; w.style.cursor = 'grab'; });
    w.style.cursor = 'grab';
  }
  handleSwipe() {
    const d = this.touchStartX - this.touchEndX;
    if (Math.abs(d) > 50) { d > 0 ? this.nextSlide() : this.previousSlide(); this.resetAutoPlay(); }
  }
  goToSlide(i) {
    this.slides[this.currentSlide].classList.remove('active');
    document.querySelectorAll('.swiper-pagination-bullet')[this.currentSlide]?.classList.remove('active');
    this.currentSlide = i;
    this.slides[i].classList.add('active');
    document.querySelectorAll('.swiper-pagination-bullet')[i]?.classList.add('active');
  }
  nextSlide()     { this.goToSlide((this.currentSlide + 1) % this.slides.length); }
  previousSlide() { this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length); }
  startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }
  stopAutoPlay()  { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; }
  resetAutoPlay() { this.stopAutoPlay(); this.startAutoPlay(); }
}

let swiperInstance = null;
document.addEventListener('DOMContentLoaded', () => { swiperInstance = new ImageSwiper(); });
document.addEventListener('visibilitychange', () => {
  if (swiperInstance) document.hidden ? swiperInstance.stopAutoPlay() : swiperInstance.startAutoPlay();
});

/* ============================================================
   SUBMIT LOGIN FORM — hiện TẤT CẢ lỗi cùng lúc khi submit
   ============================================================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailVal    = document.querySelector("input[name='email']").value.trim();
    const passwordVal = document.getElementById('LoginPassword').value;

    if (!validateLoginForm(emailVal, passwordVal)) return;

    const rememberCheckbox = document.getElementById('RememberMe');
    if (rememberCheckbox?.checked) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', emailVal);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }


    // contact api -----
    try {
      const res  = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
           email: emailVal, password: passwordVal 
          })
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.message || t('err.credentials');
        showError(document.querySelector("input[name='email']"), msg, 'err.credentials');
        return;
      }

      window.location.href = "../HTML-INTERFACE/Homepage.html";
    } catch (err) {
      console.error(err);
      showError(document.querySelector("input[name='email']"), t('err.server'), 'err.server');
    }
  });
}