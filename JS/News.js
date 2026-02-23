// ====== News.js (MERGED) ======
// Gộp toàn bộ logic từ Test.js vào News.js để:
// - i18n áp dụng cho cả header/footer + body
// - theme toggle, dropdown, language toggle
// - render bài viết từ localStorage + pagination

// -------------------------------
// I18N (global)
// -------------------------------
window.translations = {
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

    // News body (từ News page)
    "title": "Tin tức & Blog Drip Lab",
    "meta.description": "Tin tức, câu chuyện, hướng dẫn pha chế và cập nhật cộng đồng từ xưởng rang cà phê Drip Lab.",
    "hero.badge": "Câu chuyện nổi bật",
    "hero.title": "Hành trình hướng tới nguồn cung bền vững",
    "hero.desc": "Khám phá cách chúng tôi hợp tác với các nông hộ địa phương trên vành đai cà phê để mang đến những hạt cà phê chất lượng cao nhất với nguồn cung đạo đức, đồng thời gìn giữ hệ sinh thái.",
    "hero.cta": "Đọc thêm",
    "posts.title": "Bài viết mới",
    "posts.filter.all": "Tất cả",
    "posts.filter.opinion": "Góc nhìn",
    "posts.filter.culture": "Văn hóa",
    "post1.badge": "Sự kiện",
    "post1.title": "Phiên nếm thử: Thứ Sáu này tại Brooklyn",
    "post1.desc": "Tham gia sự kiện nếm thử độc quyền cùng trưởng nhóm rang, khám phá các mùa vụ đơn nguồn từ Ethiopia ở vùng cao.",
    "post2.badge": "Mẹo pha cà phê",
    "post2.title": "Thuần thục V60 tại nhà",
    "post2.desc": "Mẹo chuyên nghiệp cho pour-over hoàn hảo. Tìm hiểu kích thước xay và nhiệt độ nước chuẩn để đạt chất lượng như quán.",
    "post3.badge": "Đồ uống mới",
    "post3.title": "Ra mắt: Latte mật ong sữa yến mạch",
    "post3.desc": "Món ưa thích theo mùa đã trở lại trong thực đơn. Mật ong thu hoạch thủ công hòa cùng sữa yến mạch và espresso đặc trưng của chúng tôi.",
    "post.readmore": "Đọc toàn bộ bài viết",

    // A11y
    "aria.pagination": "Phân trang",
    "aria.prevPage": "Trang trước",
    "aria.nextPage": "Trang sau",

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

    // News body
    "title": "Drip Lab News & Blog",
    "meta.description": "News, stories, brew guides, and community updates from Drip Lab roastery.",
    "hero.badge": "Featured story",
    "hero.title": "Journey toward sustainable sourcing",
    "hero.desc": "Discover how we partner with local farmers along the coffee belt to deliver high-quality beans with ethical sourcing while preserving ecosystems.",
    "hero.cta": "Read more",
    "posts.title": "Latest posts",
    "posts.filter.all": "All",
    "posts.filter.opinion": "Opinion",
    "posts.filter.culture": "Culture",
    "post1.badge": "Event",
    "post1.title": "Cupping session: This Friday in Brooklyn",
    "post1.desc": "Join an exclusive cupping with our head roaster to explore single-origin seasonal lots from the Ethiopian highlands.",
    "post2.badge": "Brewing tips",
    "post2.title": "Master V60 at home",
    "post2.desc": "Pro tips for the perfect pour-over. Learn the right grind size and water temperature to achieve café-level quality.",
    "post3.badge": "New drink",
    "post3.title": "Introducing: Honey oat milk latte",
    "post3.desc": "A seasonal favorite is back on the menu. Hand-harvested honey blended with oat milk and our signature espresso.",
    "post.readmore": "Read full article",

    // A11y
    "aria.pagination": "Pagination",
    "aria.prevPage": "Previous page",
    "aria.nextPage": "Next page",

    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  }
};

window.applyTranslations = function applyTranslations(lang) {
  // text
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = window.translations?.[lang]?.[key];
    if (!value) return;

    // nếu element có span con (hay dùng cho icon + text)
    const span = el.querySelector('span');
    if (span && span.childElementCount === 0) span.textContent = value;
    else el.textContent = value;
  });

  // attributes: data-i18n-attr="attr:key, attr2:key2"
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;

    spec.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const value = window.translations?.[lang]?.[key];
      if (attr && key && value) el.setAttribute(attr, value);
    });
  });

  document.documentElement.setAttribute('lang', lang);

  // Đồng bộ 2 key để trang nào cũng đọc được
  localStorage.setItem('language', lang);
  localStorage.setItem('lang', lang);
};

// -------------------------------
// Render posts from localStorage
// -------------------------------
function renderLocalPosts() {
  const postsGrid = document.getElementById('posts-grid');
  if (!postsGrid) return;

  const storedPosts = JSON.parse(localStorage.getItem('dripLabPosts')) || [];

  storedPosts.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'flex flex-col group cursor-pointer';
    article.setAttribute('data-page', post.dataPage || '1');

    // i18n cho bài viết động: ưu tiên field có hậu tố _vi/_en
    const lang = localStorage.getItem('language') || localStorage.getItem('lang') || 'vi';
    const badge = post[`badge_${lang}`] ?? post.badge;
    const title = post[`title_${lang}`] ?? post.title;
    const desc = post[`desc_${lang}`] ?? post.desc;

    article.innerHTML = `
      <div class="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
        <div class="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
          style="background-image: url('${post.image}');" aria-hidden="true"></div>
        <div class="absolute top-4 left-4">
          <span class="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            ${badge || ''}
          </span>
        </div>
      </div>
      <div class="flex flex-col flex-grow">
        <span class="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] mb-2">${post.date || ''}</span>
        <h3 class="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors font-display">
          ${title || ''}
        </h3>
        <p class="text-sm text-dark-brown/60 dark:text-white/60 mb-4 line-clamp-2 leading-relaxed">
          ${desc || ''}
        </p>
      </div>
    `;

    postsGrid.prepend(article);
  });

  // Apply i18n lại để dịch các phần mới render
  const lang = localStorage.getItem('language') || localStorage.getItem('lang') || 'vi';
  if (typeof window.applyTranslations === 'function') window.applyTranslations(lang);
}

// -------------------------------
// Pagination
// -------------------------------
function initPagination() {
  const grid = document.getElementById('posts-grid');
  const pager = document.getElementById('pagination');
  if (!grid || !pager) return;

  const pageButtons = Array.from(pager.querySelectorAll('[data-page-btn]'));
  const prevBtn = pager.querySelector('[data-action="prev"]');
  const nextBtn = pager.querySelector('[data-action="next"]');
  const articles = Array.from(grid.querySelectorAll('article[data-page]'));

  const maxPage = Math.max(1, ...articles.map((a) => parseInt(a.getAttribute('data-page') || '1', 10)));

  function setActiveBtn(page) {
    pageButtons.forEach((btn) => {
      const p = parseInt(btn.getAttribute('data-page-btn') || '0', 10);
      if (p === page) {
        btn.className = 'size-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-xs';
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.className = 'size-10 flex items-center justify-center rounded-full bg-transparent text-dark-brown/40 dark:text-white/40 font-bold text-xs hover:text-primary';
        btn.removeAttribute('aria-current');
      }
    });

    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= maxPage;
    if (prevBtn) prevBtn.classList.toggle('opacity-40', page <= 1);
    if (nextBtn) nextBtn.classList.toggle('opacity-40', page >= maxPage);
  }

  function showPage(page) {
    const p = Math.min(Math.max(1, page), maxPage);
    articles.forEach((a) => {
      const ap = parseInt(a.getAttribute('data-page') || '1', 10);
      a.style.display = ap === p ? '' : 'none';
    });
    setActiveBtn(p);
  }

  pageButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.getAttribute('data-page-btn') || '1', 10);
      showPage(p);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const current = pager.querySelector('[aria-current="page"]');
      const p = current ? parseInt(current.getAttribute('data-page-btn') || '1', 10) : 1;
      showPage(p - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const current = pager.querySelector('[aria-current="page"]');
      const p = current ? parseInt(current.getAttribute('data-page-btn') || '1', 10) : 1;
      showPage(p + 1);
    });
  }

  showPage(1);
}

// -------------------------------
// Header/Footer interactions (from Test.js)
// -------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const themeToggle = document.getElementById('theme-toggle-dropdown');
  const langButtons = document.querySelectorAll('.lang-btn');

  const menuOptions = document.querySelectorAll('.menu-option');

  // overlay
  const overlay = document.createElement('div');
  overlay.className = 'dropdown-overlay';
  document.body.appendChild(overlay);

  // user dropdown
  if (userProfileBtn && userDropdown) {
    userProfileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = userDropdown.classList.contains('active');
      if (isActive) closeUserDropdown();
      else openUserDropdown();
    });
  }

  function openUserDropdown() {
    if (!userDropdown) return;
    userDropdown.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeUserDropdown() {
    if (!userDropdown) return;
    userDropdown.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', closeUserDropdown);

  document.addEventListener('click', function (e) {
    if (!userDropdown || !userProfileBtn) return;
    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeUserDropdown();
    }
  });

  if (userDropdown) userDropdown.addEventListener('click', (e) => e.stopPropagation());

  // menu option click
  menuOptions.forEach((option) => {
      option.addEventListener('click', function() {
      const href = this.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    });
  });

  // theme
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.classList.remove('light', 'dark');
  html.classList.add(currentTheme);

  if (themeToggle && currentTheme === 'dark') themeToggle.classList.add('active');

  if (themeToggle) {
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
  }

  // language
  let currentLang = localStorage.getItem('language') || localStorage.getItem('lang') || 'vi';
  window.applyTranslations(currentLang);

  langButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      if (!lang) return;

      currentLang = lang;

      langButtons.forEach((b) => {
        if (b.getAttribute('data-lang') === lang) b.classList.add('active');
        else b.classList.remove('active');
      });

      window.applyTranslations(lang);

      // Sau khi đổi ngôn ngữ, nếu posts động có field _vi/_en thì re-render để lấy đúng content
      // (Nếu bạn không lưu 2 bản, vẫn ok - vì applyTranslations sẽ đổi phần có data-i18n)
      // renderLocalPosts không clear bài cũ -> tránh gọi lại.
    });
  });

  // action buttons
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      console.log('Login clicked');
      alert('Chức năng đăng nhập / Login function');
      closeUserDropdown();
    });
  }

  const signoutBtn = document.querySelector('.btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function () {
      console.log('Sign out clicked');
      const confirmSignout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to sign out?');
      if (confirmSignout) {
        alert('Đã đăng xuất / Signed out');
        closeUserDropdown();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && userDropdown && userDropdown.classList.contains('active')) {
      closeUserDropdown();
    }
  });

  // Init body features
  renderLocalPosts();
  initPagination();
});