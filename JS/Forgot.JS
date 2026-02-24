// ============================================================
// BẢNG DỊCH NGÔN NGỮ - Hỗ trợ Tiếng Việt và Tiếng Anh
// ============================================================
const translations = {
  vi: {
    // Điều hướng header
    "nav.menu": "MENU",
    "nav.about": "VỀ CHÚNG TÔI",
    "nav.news": "TIN TỨC",
    "nav.stores": "CỬA HÀNG",
    
    // Dropdown menu
    "menu.buyNow": "Mua ngay",
    "menu.customize": "Tự pha chế",
    
    // Dropdown hồ sơ người dùng
    "profile.title": "Thông Tin Tài Khoản",
    "profile.userName": "Nguyễn Văn A",
    "profile.theme": "Chế độ tối",
    "profile.language": "Ngôn ngữ",
    "profile.login": "Đăng nhập",
    "profile.signout": "Đăng xuất",
    
    // Trang quên mật khẩu
    "forgot.title": "Quên Mật Khẩu?",
    "forgot.subtitle": "Nhập email của bạn và chúng tôi sẽ gửi một đường link để đặt lại mật khẩu.",
    "forgot.emailLabel": "Địa chỉ Email",
    "forgot.sendBtn": "Gửi Link Đặt Lại",
    "forgot.successTitle": "Đã gửi thành công!",
    "forgot.successDesc": "Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn trong email.",
    "forgot.backToLogin": "Quay lại Đăng Nhập",
    
    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Kết nối",
    "footer.contact": "Liên hệ",
    "footer.location": "Địa điểm: Việt Nam",
    "footer.follow": "Theo dõi chúng tôi",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  },
  en: {
    // Điều hướng header
    "nav.menu": "MENU",
    "nav.about": "ABOUT US",
    "nav.news": "NEWS",
    "nav.stores": "STORES",
    
    // Dropdown menu
    "menu.buyNow": "Buy Now",
    "menu.customize": "Customize",
    
    // Dropdown hồ sơ người dùng
    "profile.title": "Account Information",
    "profile.userName": "Nguyen Van A",
    "profile.theme": "Dark mode",
    "profile.language": "Language",
    "profile.login": "Login",
    "profile.signout": "Sign out",
    
    // Trang quên mật khẩu
    "forgot.title": "Forgot Password?",
    "forgot.subtitle": "Enter your email address and we will send you a link to reset your password.",
    "forgot.emailLabel": "Email Address",
    "forgot.sendBtn": "Send Reset Link",
    "forgot.successTitle": "Email sent successfully!",
    "forgot.successDesc": "Please check your inbox and follow the instructions in the email.",
    "forgot.backToLogin": "Back to Sign In",
    
    // Footer
    "footer.description": "Drip Lab - Coffee for your fresh start every day.",
    "footer.connect": "Connect",
    "footer.contact": "Contact Us",
    "footer.location": "Place at: Vietnam",
    "footer.follow": "Follow Us On",
    "footer.copyright": "© 2025 Drip Lab. Space for coffee heads."
  }
};

// ============================================================
// KHỞI ĐỘNG SAU KHI DOM ĐÃ TẢI XONG
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

  // Lấy các phần tử cần thiết từ DOM
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const themeToggle = document.getElementById('theme-toggle-dropdown');
  const langButtons = document.querySelectorAll('.lang-btn');
  
  // Phần tử liên quan đến menu dropdown
  const menuDropdownWrapper = document.querySelector('.menu-dropdown-wrapper');
  const menuDropdown = document.getElementById('menu-dropdown');
  const menuOptions = document.querySelectorAll('.menu-option');

  // Phần tử liên quan đến form quên mật khẩu
  const forgotForm = document.getElementById('forgot-form');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('success-message');
  
  // Tạo lớp phủ tối (để đóng dropdown khi click bên ngoài)
  const overlay = document.createElement('div');
  overlay.className = 'dropdown-overlay';
  document.body.appendChild(overlay);
  
  // ============================================================
  // DROPDOWN HỒ SƠ NGƯỜI DÙNG - Mở/Đóng bằng click
  // ============================================================
  userProfileBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    const isActive = userDropdown.classList.contains('active');
    
    if (isActive) {
      closeUserDropdown(); // Đang mở → đóng lại
    } else {
      openUserDropdown(); // Đang đóng → mở ra
    }
  });
  
  // Hàm mở dropdown người dùng
  function openUserDropdown() {
    userDropdown.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi dropdown mở
  }
  
  // Hàm đóng dropdown người dùng
  function closeUserDropdown() {
    userDropdown.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Cho phép cuộn trang trở lại
  }
  
  // Đóng dropdown khi click vào lớp phủ tối
  overlay.addEventListener('click', closeUserDropdown);
  
  // Đóng dropdown khi click ra ngoài khu vực dropdown
  document.addEventListener('click', function(e) {
    if (!userDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeUserDropdown();
    }
  });
  
  // Ngăn dropdown đóng khi click bên trong chính nó
  userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // ============================================================
  // MENU DROPDOWN - Xử lý click từng lựa chọn (hover CSS tự lo)
  // ============================================================
  menuOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const optionText = this.querySelector('span').textContent;
      console.log('Menu option clicked:', optionText);
      
      // Điều hướng dựa trên loại lựa chọn
      if (this.classList.contains('option-buy')) {
        // TODO: Chuyển đến trang mua hàng
        // window.location.href = '/buy-now';
        alert(`Chuyển đến trang: ${optionText}`);
      } else if (this.classList.contains('option-custom')) {
        // TODO: Chuyển đến trang tự pha chế
        // window.location.href = '/customize';
        alert(`Chuyển đến trang: ${optionText}`);
      }
    });
  });
  
  // ============================================================
  // CHẾ ĐỘ TỐI / SÁNG - Lưu vào localStorage
  // ============================================================
  const html = document.documentElement;
  
  // Đọc theme đã lưu từ lần trước, mặc định là 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.classList.add(currentTheme);
  
  // Đồng bộ trạng thái nút gạt theo theme hiện tại
  if (currentTheme === 'dark') {
    themeToggle.classList.add('active');
  }
  
  // Xử lý sự kiện nhấn nút gạt theme
  themeToggle.addEventListener('click', function() {
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
      // Chuyển sang chế độ sáng
      html.classList.remove('dark');
      html.classList.add('light');
      themeToggle.classList.remove('active');
      localStorage.setItem('theme', 'light');
    } else {
      // Chuyển sang chế độ tối
      html.classList.remove('light');
      html.classList.add('dark');
      themeToggle.classList.add('active');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // ============================================================
  // NGÔN NGỮ - Chuyển đổi VI / EN, lưu vào localStorage
  // ============================================================
  
  // Đọc ngôn ngữ đã lưu, mặc định là tiếng Việt
  let currentLang = localStorage.getItem('language') || 'vi';
  
  // Áp dụng ngôn ngữ ngay khi tải trang
  setLanguage(currentLang);
  
  // Gắn sự kiện click cho từng nút ngôn ngữ
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
  
  // Hàm đặt ngôn ngữ và cập nhật giao diện
  function setLanguage(lang) {
    currentLang = lang;
    
    // Cập nhật trạng thái active cho nút ngôn ngữ
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Cập nhật thuộc tính lang của thẻ HTML
    document.documentElement.setAttribute('lang', lang);
    
    // Áp dụng bản dịch cho toàn bộ trang
    applyTranslations(lang);
    
    // Lưu lựa chọn ngôn ngữ vào localStorage
    localStorage.setItem('language', lang);
  }
  
  // Hàm duyệt và áp dụng bản dịch cho tất cả phần tử có data-i18n
  function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Nếu element có icon bên trong (menu options), chỉ đổi text trong <span>
        const span = element.querySelector('span');
        if (span) {
          span.textContent = translations[lang][key];
        } else {
          // Phần tử thông thường không chứa icon
          element.textContent = translations[lang][key];
        }
      }
    });
  }
  
  // ============================================================
  // NÚT HÀNH ĐỘNG - Đăng nhập và Đăng xuất
  // ============================================================
  
  // Nút đăng nhập
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      console.log('Đăng nhập được nhấn');
      // TODO: Chuyển hướng đến trang đăng nhập
      alert('Chức năng đăng nhập / Login function');
      closeUserDropdown();
    });
  }
  
  // Nút đăng xuất
  const signoutBtn = document.querySelector('.btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function() {
      console.log('Đăng xuất được nhấn');
      // Xác nhận trước khi đăng xuất
      const confirmSignout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to sign out?');
      if (confirmSignout) {
        alert('Đã đăng xuất / Signed out');
        closeUserDropdown();
      }
    });
  }
  
  // ============================================================
  // FORM QUÊN MẬT KHẨU - Xử lý submit và hiển thị kết quả
  // ============================================================
  if (forgotForm) {
    forgotForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Ngăn form reload trang
      
      const email = emailInput.value.trim();
      
      // Kiểm tra email có hợp lệ không
      if (!email || !isValidEmail(email)) {
        // Hiệu ứng rung khi nhập sai
        emailInput.style.borderColor = '#f44336';
        emailInput.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.2)';
        emailInput.focus();
        
        // Xóa hiệu ứng lỗi sau 2 giây
        setTimeout(() => {
          emailInput.style.borderColor = '';
          emailInput.style.boxShadow = '';
        }, 2000);
        return;
      }
      
      // Bắt đầu trạng thái loading
      submitBtn.classList.add('loading');
      
      // Giả lập gọi API gửi email (thay bằng fetch() thật sau)
      setTimeout(function() {
        // Kết thúc loading
        submitBtn.classList.remove('loading');
        
        // Ẩn form nhập liệu
        forgotForm.style.display = 'none';
        
        // Hiện thông báo thành công
        successMessage.classList.add('show');
        
        console.log('Đã gửi email reset đến:', email);
        
        
      }, 1800); // Giả lập thời gian chờ 1.8 giây
    });
    
    // Xóa viền đỏ khi người dùng bắt đầu nhập lại
    emailInput.addEventListener('input', function() {
      emailInput.style.borderColor = '';
      emailInput.style.boxShadow = '';
    });
  }
  
  // Hàm kiểm tra định dạng email hợp lệ
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  // PHÍM TẮT - Nhấn Escape để đóng dropdown
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
      closeUserDropdown();
    }
  });

}); // Kết thúc DOMContentLoaded