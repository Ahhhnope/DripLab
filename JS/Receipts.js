const receipts = [
  { id: "DL-8821", date: "MARCH 24, 2024", total: 24.5 },
  { id: "DL-8794", date: "MARCH 12, 2024", total: 42.0 },
  { id: "DL-8651", date: "FEB 28, 2024", total: 12.75 },
  { id: "DL-8422", date: "FEB 15, 2024", total: 88.3 },
  { id: "DL-8309", date: "FEB 02, 2024", total: 17.2 },
  { id: "DL-8201", date: "JAN 25, 2024", total: 9.9 },
  { id: "DL-8144", date: "JAN 11, 2024", total: 35.0 },
  { id: "DL-8088", date: "JAN 03, 2024", total: 21.25 },
];

const PAGE_SIZE = 4;
let page = 1;
let sortMode = "all"; // all | latest | price

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function money(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function iconSvg(kind) {
  // 2 simple icons to mimic screenshot variety
  if (kind === 0) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 22h10a2 2 0 0 0 2-2V7.83a2 2 0 0 0-.59-1.41l-2.83-2.83A2 2 0 0 0 14.17 3H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2m0-2V5h7v3a2 2 0 0 0 2 2h3v10Zm2-6h6v2H9zm0 4h6v2H9zm0-8h4v2H9z"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a6 6 0 0 0-6 6c0 4.42 6 12 6 12s6-7.58 6-12a6 6 0 0 0-6-6m0 8.5A2.5 2.5 0 1 1 14.5 8A2.5 2.5 0 0 1 12 10.5"/></svg>`;
}

function downloadSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 20h14v-2H5zm7-18v10.17l3.59-3.58L17 10l-5 5l-5-5l1.41-1.41L11 12.17V2z"/></svg>`;
}

function getSortedData() {
  const data = [...receipts];
  if (sortMode === "latest") {
    // dates are already newest -> oldest in demo, keep as-is
    return data;
  }
  if (sortMode === "price") {
    return data.sort((a, b) => b.total - a.total);
  }
  return data;
}

function render() {
  const data = getSortedData();
  const total = data.length;
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  page = Math.min(page, maxPage);

  const start = (page - 1) * PAGE_SIZE;
  const slice = data.slice(start, start + PAGE_SIZE);

  $("#receiptList").innerHTML = slice
    .map((r, idx) => {
      return `
        <div class="receipt-row" data-id="${r.id}">
          <div class="left">
            <div class="pict" aria-hidden="true">${iconSvg((start + idx) % 2)}</div>
            <div class="meta">
              <div class="date">${r.date}</div>
              <div class="code">#${r.id}</div>
            </div>
          </div>

          <div class="mid">
            <div class="price-block">
              <div class="label">TOTAL PRICE</div>
              <div class="value">${money(r.total)}</div>
            </div>

            <button class="small-icon" type="button" aria-label="Download receipt" data-download="${r.id}">
              ${downloadSvg()}
            </button>

            <button class="details" type="button" data-details="${r.id}">View Details</button>
          </div>
        </div>
      `;
    })
    .join("");

  $("#countText").textContent = `Showing ${Math.min(start + PAGE_SIZE, total)} of ${total} transactions`;

  // page buttons
  const pagesEl = $("#pageButtons");
  pagesEl.innerHTML = "";
  const pagesToShow = Math.min(3, maxPage);
  const first = Math.max(1, Math.min(page - 1, maxPage - pagesToShow + 1));

  for (let p = first; p < first + pagesToShow; p++) {
    const btn = document.createElement("button");
    btn.className = "pager__page" + (p === page ? " is-active" : "");
    btn.type = "button";
    btn.textContent = String(p);
    btn.addEventListener("click", () => {
      page = p;
      render();
    });
    pagesEl.appendChild(btn);
  }

  $("#prevPage").disabled = page === 1;
  $("#nextPage").disabled = page === maxPage;
}

function openModal(receiptId) {
  const r = receipts.find((x) => x.id === receiptId);
  if (!r) return;
  $("#modalTitle").textContent = `#${r.id}`;
  $("#mDate").textContent = r.date;
  $("#mPrice").textContent = money(r.total);

  const modal = $("#modal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  $("#downloadBtn").onclick = () => fakeDownload(r.id);
}

function closeModal() {
  const modal = $("#modal");
  modal.hidden = true;
  document.body.style.overflow = "";
}

function fakeDownload(receiptId) {
  const blob = new Blob([
    `Receipt: #${receiptId}\nGenerated: ${new Date().toISOString()}\n\n(This is a demo file.)`,
  ], { type: "text/plain;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${receiptId}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function setupFilterMenu() {
  const btn = $("#filterBtn");
  const menu = $("#filterMenu");

  function setOpen(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });

  menu.addEventListener("click", (e) => {
    const item = e.target.closest("[data-filter]");
    if (!item) return;
    sortMode = item.getAttribute("data-filter");
    page = 1;
    setOpen(false);
    render();
  });

  document.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function setupEvents() {
  // pagination arrows
  $("#prevPage").addEventListener("click", () => {
    page = Math.max(1, page - 1);
    render();
  });
  $("#nextPage").addEventListener("click", () => {
    page = page + 1;
    render();
  });

  // delegated events for list buttons
  $("#receiptList").addEventListener("click", (e) => {
    const details = e.target.closest("[data-details]");
    if (details) {
      openModal(details.getAttribute("data-details"));
      return;
    }

    const dl = e.target.closest("[data-download]");
    if (dl) {
      fakeDownload(dl.getAttribute("data-download"));
    }
  });

  // modal close
  $("#modal").addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

setupFilterMenu();
setupEvents();
render();

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
    "profile.register": "Đăng ký",

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
    "profile.register": "Register",

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
