const translations = {
  vi: {
    "nav.menu": "MENU",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.news": "TIN TỨC",
    "nav.stores": "CỬA HÀNG",
    "menu.buyNow": "Mua ngay",
    "menu.customize": "Tự pha chế",
    "profile.title": "Thông Tin Tài Khoản",
    "profile.userName": "Nguyễn Văn A",
    "profile.theme": "Chế độ tối",
    "profile.language": "Ngôn ngữ",
    "profile.login": "Đăng nhập",
    "profile.signout": "Đăng xuất",
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  },
  en: {
    "nav.menu": "MENU",
    "nav.about": "ABOUT US",
    "nav.news": "NEWS",
    "nav.stores": "STORES",
    "menu.buyNow": "Buy Now",
    "menu.customize": "Customize",
    "profile.title": "Account Information",
    "profile.userName": "Nguyen Van A",
    "profile.theme": "Dark mode",
    "profile.language": "Language",
    "profile.login": "Login",
    "profile.signout": "Sign out",
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  }
};

/* ============================================================
   VALIDATION HELPERS  –  giống hệt Login.JS
   ============================================================ */
function showError(inputEl, message) {
  clearError(inputEl);
  inputEl.classList.add('input-error');
  const errorEl = document.createElement('p');
  errorEl.className = 'field-error-msg';
  errorEl.textContent = message;
  const box = inputEl.closest('.login-box');
  if (box) box.insertAdjacentElement('afterend', errorEl);
  else inputEl.parentElement.insertAdjacentElement('afterend', errorEl);
}

function clearError(inputEl) {
  inputEl.classList.remove('input-error');
  const box = inputEl.closest('.login-box');
  const sib = box ? box.nextElementSibling : inputEl.parentElement.nextElementSibling;
  if (sib && sib.classList.contains('field-error-msg')) sib.remove();
}

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v) { return /^[0-9]{9,11}$/.test(v); }

/* ============================================================
   VALIDATE REGISTER FORM
   ============================================================ */
function validateRegisterForm(fullName, email, phone, password) {
  const nameInput     = document.querySelector("input[name='full_name']");
  const emailInput    = document.querySelector("input[name='email']");
  const phoneInput    = document.querySelector("input[name='phone']");
  const passwordInput = document.getElementById('LoginPassword');
  let valid = true;

  // Họ tên
  if (!fullName.trim()) {
    showError(nameInput, 'Vui lòng nhập họ và tên.');
    valid = false;
  } else {
    clearError(nameInput);
  }

  // Email
  if (!email.trim()) {
    showError(emailInput, 'Vui lòng nhập địa chỉ email.');
    valid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, 'Email không hợp lệ. Ví dụ: abc@gmail.com');
    valid = false;
  } else {
    clearError(emailInput);
  }

  // Số điện thoại
  if (!phone.trim()) {
    showError(phoneInput, 'Vui lòng nhập số điện thoại.');
    valid = false;
  } else if (!/^[0-9]+$/.test(phone)) {
    showError(phoneInput, 'Số điện thoại chỉ được chứa chữ số (0–9).');
    valid = false;
  } else if (!isValidPhone(phone)) {
    showError(phoneInput, 'Số điện thoại phải từ 9 đến 11 chữ số.');
    valid = false;
  } else {
    clearError(phoneInput);
  }

  // Mật khẩu
  if (!password) {
    showError(passwordInput, 'Vui lòng nhập mật khẩu.');
    valid = false;
  } else if (password.length < 8) {
    showError(passwordInput, `Mật khẩu phải có ít nhất 8 ký tự (hiện tại: ${password.length}).`);
    valid = false;
  } else {
    clearError(passwordInput);
  }

  return valid;
}

/* ============================================================
   REAL-TIME BLUR VALIDATION  –  giống Login
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // Họ tên
  const nameInput = document.querySelector("input[name='full_name']");
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim()) showError(nameInput, 'Vui lòng nhập họ và tên.');
      else clearError(nameInput);
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('input-error')) clearError(nameInput);
    });
  }

  // Email
  const emailInput = document.querySelector("input[name='email']");
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const v = emailInput.value.trim();
      if (!v) showError(emailInput, 'Vui lòng nhập địa chỉ email.');
      else if (!isValidEmail(v)) showError(emailInput, 'Email không hợp lệ. Ví dụ: abc@gmail.com');
      else clearError(emailInput);
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) clearError(emailInput);
    });
  }

  // Số điện thoại – chặn nhập chữ ngay khi gõ
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
      if (!v) showError(phoneInput, 'Vui lòng nhập số điện thoại.');
      else if (!isValidPhone(v)) showError(phoneInput, 'Số điện thoại phải từ 9 đến 11 chữ số.');
      else clearError(phoneInput);
    });
  }

  // Mật khẩu – realtime đếm ký tự khi đang sai
  const passwordInput = document.getElementById('LoginPassword');
  if (passwordInput) {
    passwordInput.addEventListener('blur', () => {
      const v = passwordInput.value;
      if (!v) showError(passwordInput, 'Vui lòng nhập mật khẩu.');
      else if (v.length < 8) showError(passwordInput, `Mật khẩu phải có ít nhất 8 ký tự (hiện tại: ${v.length}).`);
      else clearError(passwordInput);
    });
    passwordInput.addEventListener('input', () => {
      const v = passwordInput.value;
      if (passwordInput.classList.contains('input-error')) {
        if (!v) showError(passwordInput, 'Vui lòng nhập mật khẩu.');
        else if (v.length < 8) showError(passwordInput, `Mật khẩu phải có ít nhất 8 ký tự (hiện tại: ${v.length}).`);
        else clearError(passwordInput);
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

  // Cart modal
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

  // User dropdown
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

  // Theme
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.classList.add(currentTheme);
  if (themeToggle) {
    if (currentTheme === 'dark') themeToggle.classList.add('active');
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      html.classList.toggle('dark', !isDark);
      html.classList.toggle('light', isDark);
      themeToggle.classList.toggle('active', !isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  // Language
  let currentLang = localStorage.getItem('language') || 'vi';
  setLanguage(currentLang);
  langButtons.forEach(btn => btn.addEventListener('click', function () { setLanguage(this.getAttribute('data-lang')); }));

  function setLanguage(lang) {
    currentLang = lang;
    langButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
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

  // Sign out
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
   SUBMIT REGISTER FORM
   ============================================================ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.querySelector("input[name='full_name']").value.trim();
    const email    = document.querySelector("input[name='email']").value.trim();
    const phone    = document.querySelector("input[name='phone']").value.trim();
    const password = document.getElementById('LoginPassword').value;

    // Dừng nếu có lỗi
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
          errorData.message || 'Đăng ký thất bại. Email có thể đã được sử dụng.'
        );
        return;
      }

      alert("Đăng ký thành công! Chào mừng bạn đến với Drip Lab ☕");
      registerForm.reset();
      window.location.href = "../HTML-INTERFACE/Login.HTML";

    } catch (err) {
      console.error(err);
      showError(
        document.querySelector("input[name='email']"),
        'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
      );
    }
  });
}