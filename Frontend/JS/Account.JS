
document.addEventListener('DOMContentLoaded', function () {
  /*========== SIDEBAR NAVIGATION ==========*/
  const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /*========== SIDEBAR LOGOUT BUTTON - CLICK ĐƯỢC ==========*/
  const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const confirmLogout = confirm('Bạn có chắc muốn đăng xuất? / Are you sure you want to logout?');
      if (confirmLogout) {
        alert('Đã đăng xuất / Logged out');
        window.location.href = '../HTML-INTERFACE/Homepage.html';
      }
    });
  }

  /*========== ĐỔI ẢNH ĐẠI DIỆN ==========*/
  const editPicBtn = document.querySelector('.edit-pic-btn');

  if (editPicBtn) {
    editPicBtn.addEventListener('click', function () {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/png, image/jpeg, image/gif';

      fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
          alert('File quá lớn! Vui lòng chọn ảnh dưới 2MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const profilePicImg = document.querySelector('.profile-pic-img img');
          if (profilePicImg) profilePicImg.src = e.target.result;

          const sidebarAvatarImg = document.querySelector('.sidebar-avatar img');
          if (sidebarAvatarImg) sidebarAvatarImg.src = e.target.result;

          const headerAvatarImg = document.getElementById('user-avatar-img');
          if (headerAvatarImg) headerAvatarImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });

      fileInput.click();
    });
  }

  /*========== NÚT SAVE CHANGES ==========*/
  const saveBtn = document.querySelector('.save-btn');

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const fullName = document.querySelector('.form-input[type="text"]')?.value.trim();
      const email = document.querySelector('.form-input[type="email"]')?.value.trim();

      if (!fullName || !email) {
        alert('Vui lòng điền đầy đủ Họ tên và Email!');
        return;
      }

      const sidebarName = document.querySelector('.sidebar-name');
      if (sidebarName) sidebarName.textContent = fullName;

      const headerName = document.querySelector('.user-name');
      if (headerName) headerName.textContent = fullName;

      const headerEmail = document.querySelector('.user-email');
      if (headerEmail) headerEmail.textContent = email;

      const originalText = this.textContent;
      this.textContent = '✓ Saved!';
      this.style.background = '#3b5e4a';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
        this.disabled = false;
      }, 2000);
    });
  }

});