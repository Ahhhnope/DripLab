/* ============================================================
   TRANSLATIONS — bao gồm cả thông báo lỗi validate
   ============================================================ */
const translations = {
  vi: {
    /* NAV */
    "nav.menu": "MENU",
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
    "profile.signout": "Đăng xuất",
    /* FOOTER */
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",
    /* ===== THÔNG BÁO LỖI VALIDATE ===== */
    "err.name.required":     "Vui lòng nhập họ và tên.",
    "err.email.required":    "Vui lòng nhập địa chỉ email.",
    "err.email.invalid":     "Email không hợp lệ. Ví dụ: abc@gmail.com",
    "err.phone.required":    "Vui lòng nhập số điện thoại.",
    "err.phone.digits":      "Số điện thoại chỉ được chứa chữ số (0–9).",
    "err.phone.length":      "Số điện thoại phải từ 9 đến 11 chữ số.",
    "err.password.required": "Vui lòng nhập mật khẩu.",
    "err.password.short":    "Mật khẩu phải có ít nhất 8 ký tự (hiện tại: {n}).",
    "err.email.taken":       "Đăng ký thất bại. Email có thể đã được sử dụng.",
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
    "profile.signout": "Sign out",
    /* FOOTER */
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",
    /* ===== VALIDATION ERROR MESSAGES ===== */
    "err.name.required":     "Please enter your full name.",
    "err.email.required":    "Please enter your email address.",
    "err.email.invalid":     "Invalid email. Example: abc@gmail.com",
    "err.phone.required":    "Please enter your phone number.",
    "err.phone.digits":      "Phone number must contain only digits (0–9).",
    "err.phone.length":      "Phone number must be 9 to 11 digits.",
    "err.password.required": "Please enter your password.",
    "err.password.short":    "Password must be at least 8 characters (current: {n}).",
    "err.email.taken":       "Registration failed. This email may already be in use.",
    "err.server":            "Cannot connect to server. Please try again later."
  }
};

/* Ngôn ngữ hiện tại — đồng bộ với localStorage */
let currentLang = localStorage.getItem('language') || 'vi';

/** Lấy chuỗi đã dịch, hỗ trợ placeholder {n} */
function t(key, vars = {}) {
  let str = translations[currentLang]?.[key] || translations['vi']?.[key] || key;
  Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
  return str;
}

/* ============================================================
   VALIDATION HELPERS
   ============================================================ */
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v) { return /^[0-9]{9,11}$/.test(v); }

/**
 * Hiện thông báo lỗi pill bên dưới ô input.
 * @param {HTMLElement} inputEl
 * @param {string}      message   – nội dung hiển thị ngay
 * @param {string}      [errKey]  – key để tự cập nhật khi đổi ngôn ngữ
 * @param {Object}      [vars]    – biến thay thế trong chuỗi, vd {n: 5}
 */
function showError(inputEl, message, errKey = '', vars = {}) {
  clearError(inputEl, true);
  inputEl.classList.add('input-error');

  const wrap = _getErrorWrap(inputEl);
  if (!wrap) return;

  const msg = document.createElement('div');
  msg.className = 'field-error-msg';
  if (errKey) msg.setAttribute('data-error-key', errKey);
  if (Object.keys(vars).length) msg.setAttribute('data-error-vars', JSON.stringify(vars));
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
    const key  = msg.getAttribute('data-error-key');
    const raw  = msg.getAttribute('data-error-vars');
    const vars = raw ? JSON.parse(raw) : {};
    const translated = t(key, vars);
    if (translated) {
      const span = msg.querySelector('span');
      if (span) span.textContent = translated;
    }
  });
}

/* ============================================================
   VALIDATE REGISTER FORM — validate TẤT CẢ ô cùng lúc
   ============================================================ */
function validateRegisterForm(fullName, email, phone, password) {
  const nameInput     = document.querySelector("input[name='full_name']");
  const emailInput    = document.querySelector("input[name='email']");
  const phoneInput    = document.querySelector("input[name='phone']");
  const passwordInput = document.getElementById('LoginPassword');
  let valid = true;

  /* Họ tên */
  if (!fullName.trim()) {
    showError(nameInput, t('err.name.required'), 'err.name.required');
    valid = false;
  } else { clearError(nameInput); }

  /* Email */
  if (!email.trim()) {
    showError(emailInput, t('err.email.required'), 'err.email.required');
    valid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, t('err.email.invalid'), 'err.email.invalid');
    valid = false;
  } else { clearError(emailInput); }

  /* Số điện thoại */
  if (!phone.trim()) {
    showError(phoneInput, t('err.phone.required'), 'err.phone.required');
    valid = false;
  } else if (!/^[0-9]+$/.test(phone)) {
    showError(phoneInput, t('err.phone.digits'), 'err.phone.digits');
    valid = false;
  } else if (!isValidPhone(phone)) {
    showError(phoneInput, t('err.phone.length'), 'err.phone.length');
    valid = false;
  } else { clearError(phoneInput); }

  /* Mật khẩu */
  if (!password) {
    showError(passwordInput, t('err.password.required'), 'err.password.required');
    valid = false;
  } else if (password.length < 8) {
    const vars = { n: password.length };
    showError(passwordInput, t('err.password.short', vars), 'err.password.short', vars);
    valid = false;
  } else { clearError(passwordInput); }

  return valid;
}

/* ============================================================
   REAL-TIME BLUR VALIDATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* Họ tên */
  const nameInput = document.querySelector("input[name='full_name']");
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim()) showError(nameInput, t('err.name.required'), 'err.name.required');
      else clearError(nameInput);
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('input-error')) clearError(nameInput);
    });
  }

  /* Email */
  const emailInput = document.querySelector("input[name='email']");
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const v = emailInput.value.trim();
      if (!v)                  showError(emailInput, t('err.email.required'), 'err.email.required');
      else if (!isValidEmail(v)) showError(emailInput, t('err.email.invalid'), 'err.email.invalid');
      else                     clearError(emailInput);
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) clearError(emailInput);
    });
  }

  /* Số điện thoại — chặn nhập chữ ngay khi gõ */
  const phoneInput = document.querySelector("input[name='phone']");
  if (phoneInput) {
    phoneInput.addEventListener('keypress', (e) => {
      if (!/[0-9]/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
        e.preventDefault();
      }
    });
    phoneInput.addEventListener('input', () => {
      const cleaned = phoneInput.value.replace(/[^0-9]/g, '');
      if (phoneInput.value !== cleaned) phoneInput.value = cleaned;
      if (phoneInput.classList.contains('input-error')) clearError(phoneInput);
    });
    phoneInput.addEventListener('blur', () => {
      const v = phoneInput.value.trim();
      if (!v)              showError(phoneInput, t('err.phone.required'), 'err.phone.required');
      else if (!isValidPhone(v)) showError(phoneInput, t('err.phone.length'), 'err.phone.length');
      else                 clearError(phoneInput);
    });
  }

  /* Mật khẩu — realtime đếm ký tự khi đang sai */
  const passwordInput = document.getElementById('LoginPassword');
  if (passwordInput) {
    passwordInput.addEventListener('blur', () => {
      const v = passwordInput.value;
      if (!v) showError(passwordInput, t('err.password.required'), 'err.password.required');
      else if (v.length < 8) {
        const vars = { n: v.length };
        showError(passwordInput, t('err.password.short', vars), 'err.password.short', vars);
      } else clearError(passwordInput);
    });
    passwordInput.addEventListener('input', () => {
      const v = passwordInput.value;
      if (passwordInput.classList.contains('input-error')) {
        if (!v) showError(passwordInput, t('err.password.required'), 'err.password.required');
        else if (v.length < 8) {
          const vars = { n: v.length };
          showError(passwordInput, t('err.password.short', vars), 'err.password.short', vars);
        } else clearError(passwordInput);
      }
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
    refreshErrorMessages();                // ← dịch lại thông báo lỗi đang hiển thị
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
  }

  /* --- Sign out --- */
  const signoutBtn = document.querySelector('.btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn đăng xuất?')) closeUserDropdown();
    });
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
    this.createPagination(); this.addNavigationListeners();
    this.addSwipeListeners(); this.startAutoPlay();
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
   SUBMIT REGISTER FORM — hiện TẤT CẢ lỗi cùng lúc khi submit
   ============================================================ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.querySelector("input[name='full_name']").value.trim();
    const email    = document.querySelector("input[name='email']").value.trim();
    const phone    = document.querySelector("input[name='phone']").value.trim();
    const password = document.getElementById('LoginPassword').value;

    if (!validateRegisterForm(fullName, email, phone, password)) return;

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ fullName, email, phone, password })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        showError(
          document.querySelector("input[name='email']"),
          errorData.message || t('err.email.taken'),
          'err.email.taken'
        );
        return;
      }

      // Đăng ký thành công — redirect thẳng không dùng alert
      registerForm.reset();
      window.location.href = "../HTML-INTERFACE/Login.HTML";

    } catch (err) {
      console.error(err);
      // Nếu không có backend (dev mode) — redirect thẳng sang Login
      if (err instanceof TypeError && err.message.includes('fetch')) {
        registerForm.reset();
        window.location.href = "../HTML-INTERFACE/Login.HTML";
        return;
      }
      showError(
        document.querySelector("input[name='email']"),
        t('err.server'),
        'err.server'
      );
    }
  });
}