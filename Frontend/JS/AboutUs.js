const translations = {
  vi: {
    // Navigation
    "nav.menu": "Thực Đơn",
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
    "profile.register": "Đăng ký",

    // Content
    "content.title": "Thông Tin Về Chúng Tôi",

    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

    // Cart Modal
    "cart.title": "Drip Lab",
    "cart.desc": "Vui lòng đăng nhập tài khoản Drip Lab để xem ưu đãi và thanh toán dễ dàng hơn.",
    "cart.register": "Đăng ký",
    "cart.login": "Đăng nhập",

    //Graphs
    "graph.title": "Triết lý của Drip Lab",
    "graph.description": "Drip Lab là nơi cà phê gặp gỡ sự sáng tạo và một chút “chất” riêng của bạn. Tại đây, bạn có thể tự tay pha chế đồ uống của mình, mix hương vị theo ý thích và tạo ra một ly nước đúng gu, đúng vibe. Không menu nhàm chán, không giới hạn. Chỉ có gu của bạn và ly nước mang đậm dấu ấn riêng. ☕✨",
    "graph.aboutusgraph": "Drip Lab là không gian cà phê trực tuyến dành cho những người trẻ yêu thích sự sáng tạo và phong cách. Không chỉ đơn thuần là một trang web đặt đồ uống, Drip Lab mang đến trải nghiệm mới mẻ, nơi mỗi ly cà phê không chỉ để thưởng thức mà còn thể hiện cá tính riêng. Từ hương vị cà phê đậm đà đến các loại topping độc đáo, mọi lựa chọn đều được thiết kế để phù hợp với nhịp sống năng động và gu thưởng thức hiện đại của giới trẻ. ☕✨ Điểm đặc biệt nhất của Drip Lab chính là tính năng tự pha chế đồ uống độc quyền. Đây là trang web hiếm hoi, và cũng là nền tảng duy nhất trong hệ thống của Drip Lab, cho phép người dùng tự tay lựa chọn nguyên liệu, điều chỉnh tỷ lệ và sáng tạo công thức đồ uống của riêng mình ngay trên website. Thay vì chỉ chọn từ menu có sẵn, bạn có thể biến mỗi ly nước thành một “công thức cá nhân”, đúng với khẩu vị và phong cách của mình. Với Drip Lab, việc thưởng thức cà phê không còn bị giới hạn trong khuôn khổ truyền thống. Mỗi người dùng đều có thể trở thành “barista của chính mình”, khám phá, kết hợp và tạo ra những ly đồ uống mang dấu ấn cá nhân. Chính sự tự do sáng tạo này đã biến Drip Lab thành một điểm đến độc đáo cho cộng đồng yêu cà phê và đam mê trải nghiệm mới. 🌿☕",
    "graph.button": "Đọc thêm"
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
    "profile.register": "Register",

    // Content
    "content.title": "Information about us",

    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

    // Cart Modal
    "cart.title": "Drip Lab",
    "cart.desc": "Please log in to your Drip Lab account to view offers and check out more easily.",
    "cart.register": "Register",
    "cart.login": "Login",

    // Graphs
    "graph.title": "The Drip Lab Philosophy",
    "graph.description": "Drip Lab is where coffee meets creativity and attitude. We’re the only platform where you can build your own drink, mix flavors your way, and create something that’s 100% your vibe. No basic menus. Just your drip, your rules. ☕🔥",
    "graph.aboutusgraph": "Drip Lab is a modern coffee platform created for young people who love creativity, style, and unique experiences. More than just a place to order drinks online, Drip Lab offers a space where every cup of coffee becomes a reflection of personal taste and individuality. From rich coffee flavors to a variety of exciting toppings and ingredients, everything is designed to match the dynamic lifestyle and modern preferences of the younger generation. ☕✨ What truly sets Drip Lab apart is its exclusive custom drink feature. Drip Lab is the only website that allows users to create and customize their own drinks directly on the platform. Instead of choosing from a fixed menu, users can select ingredients, adjust proportions, and experiment with different combinations to craft a drink that perfectly matches their personal taste. With Drip Lab, enjoying coffee goes beyond simply ordering a beverage. Every user can become their own barista, exploring flavors, mixing ingredients, and creating a drink that carries their unique signature. This freedom of creativity makes Drip Lab a truly distinctive destination for coffee lovers who want more than just an ordinary café experience. 🌿☕",
    "graph.button": "Read more"

  }
};

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

  // Cart modal elements
  const cartBtn = document.getElementById('cart-btn');
  const cartModalOverlay = document.getElementById('cart-modal-overlay');
  const cartModalClose = document.getElementById('cart-modal-close');

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
      window.location.href = '../HTML-INTERFACE/Login.HTML';
      closeUserDropdown();
    });
  }

  // Register button
  const registerBtn = document.querySelector('.btn-register');
  if (registerBtn) {
    registerBtn.addEventListener('click', function () {
      window.location.href = '../HTML-INTERFACE/Register.HTML';
      closeUserDropdown();
    });
  }

  /*========== Cart Modal ==========*/
  function openCartModal() {
    cartModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartModal() {
    cartModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      openCartModal();
    });
  }

  if (cartModalClose) {
    cartModalClose.addEventListener('click', closeCartModal);
  }

  if (cartModalOverlay) {
    cartModalOverlay.addEventListener('click', function (e) {
      if (e.target === cartModalOverlay) {
        closeCartModal();
      }
    });
  }

  /*========== Escape key to close dropdown & modal ==========*/
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (userDropdown.classList.contains('active')) {
        closeUserDropdown();
      }
      if (cartModalOverlay && cartModalOverlay.classList.contains('active')) {
        closeCartModal();
      }
    }
  });
});



const btn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

btn.addEventListener("click", () => {
  moreText.classList.toggle("hidden");

  if (moreText.classList.contains("hidden")) {
    btn.textContent = "Read more";
  } else {
    btn.textContent = "Read less";
  }
});
