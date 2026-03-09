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
        "profile.signout": "Đăng xuất",

        // Footer
        "footer.description": "Drip Lab - Coffee for your fresh start every day.",
        "footer.connect": "Kết nối",
        "footer.contact": "Liên hệ",
        "footer.location": "Địa điểm: Việt Nam",
        "footer.follow": "Theo dõi chúng tôi",
        "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

        // Sidebar
        "sidebar.account": "Tài Khoản",
        "sidebar.changePassword": "Đổi Mật Khẩu",
        "sidebar.address": "Địa Chỉ",
        "sidebar.orders": "Đơn Hàng",
        "sidebar.favorites": "Yêu Thích",
        "sidebar.logout": "Đăng Xuất",
        "sidebar.badge": "Thành Viên Premium",

        // Address Page
        "address.title": "Quản Lý Địa Chỉ",
        "address.street": "Địa Chỉ Đường",
        "address.apt": "Căn Hộ, Phòng, v.v. (Tùy chọn)",
        "address.city": "Thành Phố",
        "address.save": "Lưu Địa Chỉ",
        "address.success": "Địa chỉ đã được lưu thành công!",

        // Placeholders
        "placeholder.street": "123 Đường Artisanal",
        "placeholder.apt": "Phòng 4B",
        "placeholder.city": "Hà Nội"
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

        // Footer
        "footer.description": "Drip Lab - Coffee for your fresh start every day.",
        "footer.connect": "Connect",
        "footer.contact": "Contact Us",
        "footer.location": "Place at: Vietnam",
        "footer.follow": "Follow Us On",
        "footer.copyright": "© 2025 Drip Lab. Space for coffee heads.",

        // Sidebar
        "sidebar.account": "Account",
        "sidebar.changePassword": "Change Password",
        "sidebar.address": "Address",
        "sidebar.orders": "Orders",
        "sidebar.favorites": "Favorites",
        "sidebar.logout": "Logout",
        "sidebar.badge": "Premium Member",

        // Address Page
        "address.title": "Address Management",
        "address.street": "Street Address",
        "address.apt": "Apartment, Suite, etc. (Optional)",
        "address.city": "City",
        "address.save": "Save Address",
        "address.success": "Address saved successfully!",

        // Placeholders
        "placeholder.street": "123 Artisanal Street",
        "placeholder.apt": "Apt 4B",
        "placeholder.city": "Hanoi"
    }
};

/* ================================================================
   SMOOTH PAGE NAVIGATION — fade out trước khi chuyển trang
   ================================================================ */
function goTo(href) {
    if (!href || href === '#') return;
    if (/^(https?:|mailto:|tel:)/.test(href)) { window.location.href = href; return; }
    document.body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = href; }, 200);
}

document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    if (a.target === '_blank') return;
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    goTo(href);
}, true); // capture phase

/* ================================================================
   MAIN DOM READY
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {

    // ── Core elements ──
    const userProfileBtn  = document.getElementById('user-profile-btn');
    const userDropdown    = document.getElementById('user-dropdown');
    const themeToggle     = document.getElementById('theme-toggle-dropdown');
    const langButtons     = document.querySelectorAll('.lang-btn');
    const menuOptions     = document.querySelectorAll('.menu-option');

    // ── Overlay ──
    const overlay = document.createElement('div');
    overlay.className = 'dropdown-overlay';
    document.body.appendChild(overlay);

    /* ========== User Profile Dropdown ========== */
    userProfileBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown.classList.contains('active') ? closeUserDropdown() : openUserDropdown();
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

    overlay.addEventListener('click', closeUserDropdown);

    document.addEventListener('click', function (e) {
        if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
            closeUserDropdown();
        }
    });

    userDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    /* ========== Menu Options ========== */
    menuOptions.forEach(option => {
        option.addEventListener('click', function () {
            const href = this.getAttribute('href');
            if (href) window.location.href = href;
        });
    });

    /* ========== Theme Toggle ========== */
    const html = document.documentElement;

    if (html.classList.contains('dark')) {
        themeToggle.classList.add('active');
    }

    themeToggle.addEventListener('click', function () {
        const isDark = html.classList.contains('dark');
        if (isDark) {
            html.className = 'light';
            html.style.background = '#f5f5f0';
            themeToggle.classList.remove('active');
            localStorage.setItem('theme', 'light');
        } else {
            html.className = 'dark';
            html.style.background = '#1a1714';
            themeToggle.classList.add('active');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ========== Language Toggle ========== */
    let currentLang = localStorage.getItem('language') || 'vi';
    setLanguage(currentLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;

        // Update active button
        langButtons.forEach(btn => {
            btn.getAttribute('data-lang') === lang
                ? btn.classList.add('active')
                : btn.classList.remove('active');
        });

        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
        applyPlaceholders(lang);
        localStorage.setItem('language', lang);
    }

    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Handle panel-title with icon (has child nodes)
                if (el.classList.contains('panel-title')) {
                    // Keep the icon, update text node
                    const icon = el.querySelector('.address-title-icon');
                    el.textContent = translations[lang][key];
                    if (icon) el.prepend(icon);
                    return;
                }
                const span = el.querySelector('span');
                if (span) {
                    span.textContent = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    function applyPlaceholders(lang) {
        const t = translations[lang];
        if (!t) return;
        const street = document.getElementById('addr-street');
        const apt    = document.getElementById('addr-apt');
        const city   = document.getElementById('addr-city');
        if (street) street.placeholder = t['placeholder.street'] || '';
        if (apt)    apt.placeholder    = t['placeholder.apt']    || '';
        if (city)   city.placeholder   = t['placeholder.city']   || '';
    }

    /* ========== Sign Out (header dropdown) ========== */
    const signoutBtn = document.querySelector('.btn-signout');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function () {
            const msg = currentLang === 'vi'
                ? 'Bạn có chắc muốn đăng xuất?'
                : 'Are you sure you want to sign out?';
            if (confirm(msg)) {
                closeUserDropdown();
                goTo('../HTML-INTERFACE/Homepage.html');
            }
        });
    }

    /* ========== Escape key ========== */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
            closeUserDropdown();
        }
    });

    /* ========== Sidebar Navigation ========== */
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* ========== Sidebar Logout ========== */
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            const msg = currentLang === 'vi'
                ? 'Bạn có chắc muốn đăng xuất?'
                : 'Are you sure you want to logout?';
            if (confirm(msg)) goTo('../HTML-INTERFACE/Homepage.html');
        });
    }

    /* ================================================================
       SAVE ADDRESS BUTTON
       ================================================================ */
    const saveBtn     = document.getElementById('save-address-btn');
    const successToast = document.getElementById('success-toast');

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const street = document.getElementById('addr-street').value.trim();
            const city   = document.getElementById('addr-city').value.trim();

            // Basic validation – street & city required
            if (!street || !city) {
                const msg = currentLang === 'vi'
                    ? 'Vui lòng điền Địa Chỉ Đường và Thành Phố!'
                    : 'Please fill in Street Address and City!';
                alert(msg);
                return;
            }

            // Simulate save — show success state
            saveBtn.classList.add('saved');
            saveBtn.textContent = currentLang === 'vi' ? '✓ Đã Lưu!' : '✓ Saved!';

            // Show toast
            successToast.classList.add('show');

            // Reset after 2.5s
            setTimeout(function () {
                saveBtn.classList.remove('saved');
                saveBtn.textContent = translations[currentLang]['address.save'];
                successToast.classList.remove('show');
            }, 2500);
        });
    }

    /* ================================================================
       ANTI-FLASH: Apply saved theme immediately
       ================================================================ */
    (function () {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.className = 'dark';
            document.documentElement.style.background = '#1a1714';
        } else {
            document.documentElement.className = 'light';
        }
    })();

});