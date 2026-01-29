/*=============== ẨN & HIỆN MẬT KHẨU ===============*/
/**
 * Hàm show/hide password khi click vào icon mắt
 * @param {string} password - ID của ô input password
 * @param {string} eye - ID của icon mắt
 */
const showHiddenPass = (password, eye) => {
    // Lấy element input và icon
    const input = document.getElementById(password),
          iconEye = document.getElementById(eye)

    // Kiểm tra xem icon có tồn tại không
    if(iconEye) {
        // Thêm sự kiện click vào icon
        iconEye.addEventListener('click', () => {
            // Nếu đang là type password thì đổi sang text (hiện password)
            // Ngược lại đổi lại thành password (ẩn password)
            input.type === 'password' ? input.type = 'text'
                                      : input.type = 'password'
                                      
            // Toggle class để đổi icon giữa mắt mở và mắt đóng
            iconEye.classList.toggle('ri-eye-off-line')  // Mắt đóng
            iconEye.classList.toggle('ri-eye-line')       // Mắt mở
        })
    }
}

// Gọi hàm cho ô password trong form
showHiddenPass('LoginPassword','LoginEye')

/*=============== CHẶN NHẬP CHỮ VÀO Ô SỐ ĐIỆN THOẠI ===============*/
/**
 * Chỉ cho phép nhập số vào ô phone number
 * Chặn tất cả ký tự không phải số
 */
document.addEventListener('DOMContentLoaded', () => {
    // Lấy ô input phone number
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if(phoneInput) {
        // Sự kiện khi người dùng gõ phím
        phoneInput.addEventListener('keypress', (e) => {
            // Lấy mã phím được nhấn
            const charCode = e.which ? e.which : e.keyCode;
            
            // Chỉ cho phép số (0-9), mã từ 48 đến 57
            // Không cho phép các ký tự khác
            if(charCode < 48 || charCode > 57) {
                e.preventDefault(); // Chặn ký tự không hợp lệ
                return false;
            }
        });
        
        // Sự kiện khi paste (dán) text vào ô
        phoneInput.addEventListener('paste', (e) => {
            e.preventDefault(); // Chặn paste mặc định
            
            // Lấy text được paste
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            
            // Chỉ lấy các ký tự số, bỏ hết ký tự khác
            const numbersOnly = pastedText.replace(/\D/g, '');
            
            // Chèn chỉ số vào ô input
            phoneInput.value = numbersOnly;
        });
        
        // Sự kiện khi người dùng nhập (bắt cả trường hợp autocomplete)
        phoneInput.addEventListener('input', (e) => {
            // Lọc bỏ tất cả ký tự không phải số
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});

/*=============== SLIDESHOW HÌNH ẢNH ===============*/
/**
 * Class quản lý slideshow hình ảnh
 * Tự động chuyển slide, hỗ trợ click nút, vuốt, và pagination
 */
class ImageSwiper {
    constructor() {
        // Lấy tất cả các slide
        this.slides = document.querySelectorAll('.login-swiper-slide');
        // Slide hiện tại (bắt đầu từ 0)
        this.currentSlide = 0;
        // Biến lưu interval cho auto play
        this.autoPlayInterval = null;
        // Vị trí bắt đầu chạm/kéo
        this.touchStartX = 0;
        // Vị trí kết thúc chạm/kéo
        this.touchEndX = 0;
        
        // Khởi tạo slideshow
        this.init();
    }

    /**
     * Khởi tạo tất cả các tính năng của slideshow
     */
    init() {
        // Nếu không có slide nào thì dừng
        if(this.slides.length === 0) return;
        
        // Tạo các chấm tròn pagination
        this.createPagination();
        
        // Thêm sự kiện cho nút prev/next
        this.addNavigationListeners();
        
        // Thêm sự kiện vuốt (swipe)
        this.addSwipeListeners();
        
        // Bật tự động chuyển slide
        this.startAutoPlay();
    }

    /**
     * Tạo các chấm tròn pagination ở dưới slideshow
     */
    createPagination() {
        const paginationContainer = document.querySelector('.swiper-pagination');
        if(!paginationContainer) return;
        
        // Tạo một chấm cho mỗi slide
        this.slides.forEach((_, index) => {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            // Chấm đầu tiên active
            if(index === 0) bullet.classList.add('active');
            // Khi click vào chấm thì chuyển đến slide tương ứng
            bullet.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();  // Reset timer tự động
            });
            paginationContainer.appendChild(bullet);
        });
    }

    /**
     * Thêm sự kiện click cho nút Previous và Next
     */
    addNavigationListeners() {
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoPlay();
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
    }

    /**
     * Thêm sự kiện vuốt (swipe) cho mobile và desktop
     */
    addSwipeListeners() {
        const swiperWrapper = document.querySelector('.login-swiper-wrapper');
        if(!swiperWrapper) return;

        // === SỰ KIỆN CHO MOBILE (Touch) ===
        // Khi bắt đầu chạm
        swiperWrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        // Khi nhả tay ra
        swiperWrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // === SỰ KIỆN CHO DESKTOP (Mouse) ===
        let isMouseDown = false;
        
        // Khi nhấn chuột xuống
        swiperWrapper.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            this.touchStartX = e.screenX;
            swiperWrapper.style.cursor = 'grabbing';  // Đổi con trỏ thành nắm
        });

        // Khi nhả chuột
        swiperWrapper.addEventListener('mouseup', (e) => {
            if(isMouseDown) {
                this.touchEndX = e.screenX;
                this.handleSwipe();
                isMouseDown = false;
                swiperWrapper.style.cursor = 'grab';  // Đổi con trỏ về bàn tay
            }
        });

        // Khi chuột ra ngoài vùng slideshow
        swiperWrapper.addEventListener('mouseleave', () => {
            isMouseDown = false;
            swiperWrapper.style.cursor = 'grab';
        });

        // Đặt con trỏ ban đầu là bàn tay
        swiperWrapper.style.cursor = 'grab';
    }

    /**
     * Xử lý hành động vuốt
     * Vuốt sang trái -> slide tiếp theo
     * Vuốt sang phải -> slide trước đó
     */
    handleSwipe() {
        const swipeThreshold = 50;  // Ngưỡng tối thiểu để tính là vuốt (50px)
        const diff = this.touchStartX - this.touchEndX;

        // Nếu khoảng cách vuốt đủ lớn
        if(Math.abs(diff) > swipeThreshold) {
            if(diff > 0) {
                // Vuốt sang trái -> next slide
                this.nextSlide();
            } else {
                // Vuốt sang phải -> previous slide
                this.previousSlide();
            }
            this.resetAutoPlay();
        }
    }

    /**
     * Chuyển đến slide cụ thể
     * @param {number} index - Vị trí slide muốn chuyển đến
     */
    goToSlide(index) {
        // Xóa class active khỏi slide hiện tại
        this.slides[this.currentSlide].classList.remove('active');
        
        // Xóa class active khỏi chấm pagination hiện tại
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.remove('active');
        }

        // Cập nhật slide hiện tại
        this.currentSlide = index;

        // Thêm class active vào slide mới
        this.slides[this.currentSlide].classList.add('active');
        
        // Thêm class active vào chấm pagination mới
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.add('active');
        }
    }

    /**
     * Chuyển sang slide tiếp theo
     * Nếu đang ở slide cuối thì quay về slide đầu
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    /**
     * Chuyển về slide trước đó
     * Nếu đang ở slide đầu thì quay về slide cuối
     */
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    /**
     * Bắt đầu tự động chuyển slide
     * Mỗi 5 giây đổi sang slide tiếp theo
     */
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Tự động chuyển mỗi 5 giây
    }

    /**
     * Dừng tự động chuyển slide
     */
    stopAutoPlay() {
        if(this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    /**
     * Reset timer tự động chuyển slide
     * Dùng khi người dùng thao tác thủ công (click, vuốt)
     */
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Biến lưu instance của ImageSwiper
let swiperInstance = null;

/**
 * Khi trang web load xong thì khởi tạo slideshow
 */
document.addEventListener('DOMContentLoaded', () => {
    swiperInstance = new ImageSwiper();
});

/**
 * Khi người dùng chuyển tab hoặc minimize trình duyệt
 * thì dừng auto play để tiết kiệm tài nguyên
 * Khi quay lại thì bật lại auto play
 */
document.addEventListener('visibilitychange', () => {
    if(swiperInstance) {
        if(document.hidden) {
            // Tab bị ẩn -> dừng auto play
            swiperInstance.stopAutoPlay();
        } else {
            // Tab hiển thị lại -> bật auto play
            swiperInstance.startAutoPlay();
        }
    }
});