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
        "form.save": "Lưu Thay Đổi",

        // Change Password
        "change.title": "Đổi Mật Khẩu",
        "change.current": "Mật Khẩu Hiện Tại",
        "change.new": "Mật Khẩu Mới",
        "change.confirm": "Xác Nhận Mật Khẩu",
        "change.update": "Cập Nhật Mật Khẩu"
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
        "form.save": "Save Changes",

        // Change Password
        "change.title": "Change Password",
        "change.current": "Current Password",
        "change.new": "New Password",
        "change.confirm": "Confirm New Password",
        "change.update": "Update Password",
    }
};

/* ================================================================
   SMOOTH PAGE NAVIGATION — fade out trước khi chuyển trang
   Intercept tất cả <a> nội bộ qua capture phase
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
    // Get elements
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const themeToggle = document.getElementById('theme-toggle-dropdown');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Menu dropdown elements
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

    userDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    /*========== Menu Options Click Handlers ==========*/
    menuOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });

    /*========== Theme Toggle Functionality ==========*/
    const html = document.documentElement;

    // Sync toggle button với theme đã được set bởi anti-flash script
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

    /*========== Language Toggle Functionality ==========*/
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
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
        localStorage.setItem('language', lang);
    }

    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    /*========== Sign Out ==========*/
    const signoutBtn = document.querySelector('.btn-signout');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function () {
            const confirmSignout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to sign out?');
            if (confirmSignout) {
                closeUserDropdown();
                goTo('../HTML-INTERFACE/Homepage.html');
            }
        });
    }

    /*========== Escape key ==========*/
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
            closeUserDropdown();
        }
    });

    /*========== SIDEBAR NAVIGATION ==========*/
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /*========== SIDEBAR LOGOUT ==========*/
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation(); // ngăn capture goTo chạy
            const confirmLogout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to logout?');
            if (confirmLogout) {
                goTo('../HTML-INTERFACE/Homepage.html');
            }
        });
    }

    /*========== EYE TOGGLE ==========*/
    document.querySelectorAll('.pw-eye').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const input = document.getElementById(this.getAttribute('data-pw'));
            const icon  = this.querySelector('i');
            if (!input) return;
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            icon.className = show ? 'ri-eye-off-line' : 'ri-eye-line';
        });
    });

    /*========== UPDATE PASSWORD BUTTON ==========*/
    const updateBtn = document.querySelector('.change-password-form .save-btn');
    if (updateBtn) {
        updateBtn.addEventListener('click', function () {
            const current     = document.getElementById('pw-current').value.trim();
            const newPass     = document.getElementById('pw-new').value.trim();
            const confirmPass = document.getElementById('pw-confirm').value.trim();

            if (!current || !newPass || !confirmPass) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }
            if (newPass !== confirmPass) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }

            this.textContent = '✓ Updated!';
            this.style.background = '#3b5e4a';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = translations[localStorage.getItem('language') || 'vi']['change.update'];
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        });
    }

});