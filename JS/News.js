// Hàm này phải có trong News.js
function renderLocalPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;

    // Đọc dữ liệu từ key 'dripLabPosts' mà ta vừa lưu bên Admin
    const storedPosts = JSON.parse(localStorage.getItem('dripLabPosts')) || [];

    storedPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'flex flex-col group cursor-pointer';
        article.setAttribute('data-page', post.dataPage || '1');

        article.innerHTML = `
            <div class="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <div class="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style="background-image: url('${post.image}');" aria-hidden="true"></div>
                <div class="absolute top-4 left-4">
                    <span class="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        ${post.badge}
                    </span>
                </div>
            </div>
            <div class="flex flex-col flex-grow">
                <span class="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em] mb-2">${post.date}</span>
                <h3 class="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors font-display">
                    ${post.title}
                </h3>
                <p class="text-sm text-dark-brown/60 dark:text-white/60 mb-4 line-clamp-2 leading-relaxed">
                    ${post.desc}
                </p>
                <a href="#" class="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-transparent hover:border-primary w-fit pb-1 transition-all">
                    Đọc toàn bộ bài viết 
                    <span class="material-symbols-outlined text-xs" aria-hidden="true">north_east</span>
                </a>
            </div>
        `;
        
        // Dùng prepend để bài mới nhất lên đầu, hoặc append để xuống cuối
        postsGrid.prepend(article);
    });
}

// Chạy hàm khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderLocalPosts();
});

// Simple i18n engine
const I18N = (function () {
  const storageKey = 'lang';
  const dictionaries = {
    vi: {
      'title': 'Tin tức & Blog Drip Lab',
      'meta.description': 'Tin tức, câu chuyện, hướng dẫn pha chế và cập nhật cộng đồng từ xưởng rang cà phê Drip Lab.',
      'aria.home': 'Trang chủ Drip Lab',
      'aria.logo': 'Logo Drip Lab',
      'aria.logoSmall': 'Logo Drip Lab (nhỏ)',
      'aria.mainnav': 'Điều hướng chính',
      'aria.account': 'Tài khoản',
      'aria.cart': 'Giỏ hàng',
      'aria.themeToggle': 'Chuyển chế độ Sáng/Tối',
      'aria.langToggle': 'Chuyển ngôn ngữ',
      'aria.openMenu': 'Mở menu',
      'nav.menu': 'Thực đơn',
      'nav.about': 'Về chúng tôi',
      'nav.news': 'Tin tức',
      'nav.shop': 'Cửa hàng',
      'theme.light': 'Chế độ Sáng',
      'theme.dark': 'Chế độ Tối',
      'hero.badge': 'Câu chuyện nổi bật',
      'hero.title': 'Hành trình hướng tới nguồn cung bền vững',
      'hero.desc': 'Khám phá cách chúng tôi hợp tác với các nông hộ địa phương trên vành đai cà phê để mang đến những hạt cà phê chất lượng cao nhất với nguồn cung đạo đức, đồng thời gìn giữ hệ sinh thái.',
      'hero.cta': 'Đọc thêm',
      'posts.title': 'Bài viết mới',
      'posts.filter.all': 'Tất cả',
      'posts.filter.opinion': 'Góc nhìn',
      'posts.filter.culture': 'Văn hóa',
      'post1.badge': 'Sự kiện',
      'post1.title': 'Phiên nếm thử: Thứ Sáu này tại Brooklyn',
      'post1.desc': 'Tham gia sự kiện nếm thử độc quyền cùng trưởng nhóm rang, khám phá các mùa vụ đơn nguồn từ Ethiopia ở vùng cao.',
      'post2.badge': 'Mẹo pha cà phê',
      'post2.title': 'Thuần thục V60 tại nhà',
      'post2.desc': 'Mẹo chuyên nghiệp cho pour-over hoàn hảo. Tìm hiểu kích thước xay và nhiệt độ nước chuẩn để đạt chất lượng như quán.',
      'post3.badge': 'Đồ uống mới',
      'post3.title': 'Ra mắt: Latte mật ong sữa yến mạch',
      'post3.desc': 'Món ưa thích theo mùa đã trở lại trong thực đơn. Mật ong thu hoạch thủ công hòa cùng sữa yến mạch và espresso đặc trưng của chúng tôi.',
      'post.readmore': 'Đọc toàn bộ bài viết',
      'aria.pagination': 'Phân trang',
      'aria.prevPage': 'Trang trước',
      'aria.nextPage': 'Trang sau',
      'footer.tagline': 'Elevating the everyday coffee experience through artisanal roasting and sustainable community partnerships.',
      'footer.stores': 'Cửa hàng',
      'footer.hours.daily': 'Hàng ngày: 7:00 — 19:00',
      'footer.hours.daily2': 'Hàng ngày: 8:00 — 20:00',
      'footer.links': 'Liên kết nhanh',
      'footer.link.buyBeans': 'Đặt mua hạt',
      'footer.link.wholesale': 'Bán sỉ',
      'footer.link.brewGuides': 'Hướng dẫn pha chế',
      'footer.link.privacy': 'Chính sách quyền riêng tư',
      'footer.newsletter': 'Bản tin',
      'footer.newsDesc': 'Nhận mẹo pha chế và tin tức từ xưởng rang ngay trong hộp thư của bạn.',
      'footer.emailLabel': 'Địa chỉ email',
      'footer.emailPlaceholder': 'Địa chỉ email',
      'aria.footerNav': 'Footer',
      'aria.subscribe': 'Đăng ký nhận bản tin',
      'aria.share': 'Chia sẻ',
      'aria.email': 'Email',
      'aria.send': 'Gửi',
      'footer.copy1': '© 2023 Drip Lab Coffee Roasters. Bảo lưu mọi quyền.',
      'footer.copy2': 'Được tạo nên cho người tiêu dùng quan tâm bền vững.'
    },
    en: {
      'title': 'Drip Lab News & Blog',
      'meta.description': 'News, stories, brew guides, and community updates from Drip Lab roastery.',
      'aria.home': 'Drip Lab Home',
      'aria.logo': 'Drip Lab Logo',
      'aria.logoSmall': 'Drip Lab Logo (small)',
      'aria.mainnav': 'Main navigation',
      'aria.account': 'Account',
      'aria.cart': 'Cart',
      'aria.themeToggle': 'Toggle Light/Dark mode',
      'aria.langToggle': 'Switch language',
      'aria.openMenu': 'Open menu',
      'nav.menu': 'Menu',
      'nav.about': 'About us',
      'nav.news': 'News',
      'nav.shop': 'Shop',
      'theme.light': 'Light mode',
      'theme.dark': 'Dark mode',
      'hero.badge': 'Featured story',
      'hero.title': 'Journey toward sustainable sourcing',
      'hero.desc': 'Discover how we partner with local farmers along the coffee belt to deliver high-quality beans with ethical sourcing while preserving ecosystems.',
      'hero.cta': 'Read more',
      'posts.title': 'Latest posts',
      'posts.filter.all': 'All',
      'posts.filter.opinion': 'Opinion',
      'posts.filter.culture': 'Culture',
      'post1.badge': 'Event',
      'post1.title': 'Cupping session: This Friday in Brooklyn',
      'post1.desc': 'Join an exclusive cupping with our head roaster to explore single-origin seasonal lots from the Ethiopian highlands.',
      'post2.badge': 'Brewing tips',
      'post2.title': 'Master V60 at home',
      'post2.desc': 'Pro tips for the perfect pour-over. Learn the right grind size and water temperature to achieve café-level quality.',
      'post3.badge': 'New drink',
      'post3.title': 'Introducing: Honey oat milk latte',
      'post3.desc': 'A seasonal favorite is back on the menu. Hand-harvested honey blended with oat milk and our signature espresso.',
      'post.readmore': 'Read full article',
      'aria.pagination': 'Pagination',
      'aria.prevPage': 'Previous page',
      'aria.nextPage': 'Next page',
      'footer.tagline': 'Elevating the everyday coffee experience through artisanal roasting and sustainable community partnerships.',
      'footer.stores': 'Stores',
      'footer.hours.daily': 'Daily: 7:00 — 19:00',
      'footer.hours.daily2': 'Daily: 8:00 — 20:00',
      'footer.links': 'Quick links',
      'footer.link.buyBeans': 'Buy beans',
      'footer.link.wholesale': 'Wholesale',
      'footer.link.brewGuides': 'Brew guides',
      'footer.link.privacy': 'Privacy policy',
      'footer.newsletter': 'Newsletter',
      'footer.newsDesc': 'Get brew tips and roastery news straight to your inbox.',
      'footer.emailLabel': 'Email address',
      'footer.emailPlaceholder': 'Email address',
      'aria.footerNav': 'Footer',
      'aria.subscribe': 'Subscribe to newsletter',
      'aria.share': 'Share',
      'aria.email': 'Email',
      'aria.send': 'Send',
      'footer.copy1': '© 2023 Drip Lab Coffee Roasters. All rights reserved.',
      'footer.copy2': 'Crafted for sustainability-minded consumers.'
    }
  };

  let currentLang = localStorage.getItem(storageKey) || (document.documentElement.lang || 'vi');

  function translateElement(el) {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = dictionaries[currentLang][key] || el.textContent;
    }

    const attrSpec = el.getAttribute('data-i18n-attr');
    if (attrSpec) {
      // format: "attr:key" or multiple pairs separated by comma
      attrSpec.split(',').forEach(pair => {
        const [attr, k] = pair.split(':').map(s => s.trim());
        if (attr && k && dictionaries[currentLang][k]) {
          el.setAttribute(attr, dictionaries[currentLang][k]);
        }
      });
    }
  }

  function applyAll() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n], [data-i18n-attr]').forEach(translateElement);

    const toggleLabel = document.getElementById('lang-toggle-label');
    if (toggleLabel) {
      toggleLabel.textContent = currentLang === 'vi' ? 'EN' : 'VI';
    }
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(storageKey, lang);
    applyAll();
  }

  function current(key) {
    return dictionaries[currentLang][key] || key;
  }

  function init() {
    applyAll();

    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setLang(currentLang === 'vi' ? 'en' : 'vi');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return { setLang, current };
})();

// Theme toggle (with i18n hook for label)
(function () {
  const storageKey = 'theme';
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(storageKey);

  function setTheme(t) {
    if (t === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');

    localStorage.setItem(storageKey, t);

    const icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.textContent = t === 'dark' ? 'light_mode' : 'dark_mode';

    const label = document.getElementById('theme-toggle-label');
    if (label) label.textContent = t === 'dark' ? I18N.current('theme.dark') : I18N.current('theme.light');
  }

  function init() {
    const initial = saved ? saved : (prefersDark ? 'dark' : 'light');
    setTheme(initial);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setTheme(html.classList.contains('dark') ? 'light' : 'dark');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();

// Pagination (client-side: show/hide articles by data-page)
//
// CHÚ THÍCH TRANG 1 vs TRANG 2:
// - Trong HTML, mỗi bài viết là 1 <article data-page="X">
//   * data-page="1" => thuộc Trang 1
//   * data-page="2" => thuộc Trang 2
//   * data-page="3" => thuộc Trang 3
// - Nút phân trang là <button data-page-btn="X">.
// - Khi người dùng bấm nút X, hàm showPage(X) sẽ:
//   * hiện các article có data-page == X
//   * ẩn các article còn lại
//
// Cách tự thêm bài mới cho Trang 2:
// 1) Copy 1 block <article>
// 2) Đổi data-page="2"
// 3) Sửa nội dung/ảnh
//
(function () {
  function initPagination() {
    const grid = document.getElementById('posts-grid');
    const pager = document.getElementById('pagination');
    if (!grid || !pager) return;

    const pageButtons = Array.from(pager.querySelectorAll('[data-page-btn]'));
    const prevBtn = pager.querySelector('[data-action="prev"]');
    const nextBtn = pager.querySelector('[data-action="next"]');
    const articles = Array.from(grid.querySelectorAll('article[data-page]'));

    const maxPage = Math.max(1, ...articles.map(a => parseInt(a.getAttribute('data-page') || '1', 10)));

    function setActiveBtn(page) {
      pageButtons.forEach(btn => {
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
      articles.forEach(a => {
        const ap = parseInt(a.getAttribute('data-page') || '1', 10);
        a.style.display = ap === p ? '' : 'none';
      });
      setActiveBtn(p);
      // optional: scroll về phần bài viết
      // document.getElementById('posts-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // click number buttons
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page-btn') || '1', 10);
        showPage(p);
      });
    });

    // prev/next
    if (prevBtn) prevBtn.addEventListener('click', () => {
      const current = pager.querySelector('[aria-current="page"]');
      const p = current ? parseInt(current.getAttribute('data-page-btn') || '1', 10) : 1;
      showPage(p - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const current = pager.querySelector('[aria-current="page"]');
      const p = current ? parseInt(current.getAttribute('data-page-btn') || '1', 10) : 1;
      showPage(p + 1);
    });

    // init default page = 1
    showPage(1);
  }

  document.addEventListener('DOMContentLoaded', initPagination);
})();