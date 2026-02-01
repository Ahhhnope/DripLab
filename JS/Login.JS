/*=============== HIDE & SHOW PASSWORD ===============*/
const showHiddenPass = (password, eye) => {
    const input = document.getElementById(password),
          iconEye = document.getElementById(eye)

    if(iconEye) {
        iconEye.addEventListener('click', () => {
            input.type === 'password' ? input.type = 'text'
                                      : input.type = 'password'
                                      
            iconEye.classList.toggle('ri-eye-off-line')
            iconEye.classList.toggle('ri-eye-line')
        })
    }
}

showHiddenPass('LoginPassword','LoginEye')

/*=============== IMAGE SWIPER ===============*/
class ImageSwiper {
    constructor() {
        this.slides = document.querySelectorAll('.login-swiper-slide');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        if(this.slides.length === 0) return;
        
        this.createPagination();
        
        this.addNavigationListeners();
        
        this.addSwipeListeners();
        
        this.startAutoPlay();
    }

    createPagination() {
        const paginationContainer = document.querySelector('.swiper-pagination');
        if(!paginationContainer) return;
        
        this.slides.forEach((_, index) => {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            if(index === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
            paginationContainer.appendChild(bullet);
        });
    }

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

    addSwipeListeners() {
        const swiperWrapper = document.querySelector('.login-swiper-wrapper');
        if(!swiperWrapper) return;

        swiperWrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        swiperWrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        let isMouseDown = false;
        
        swiperWrapper.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            this.touchStartX = e.screenX;
            swiperWrapper.style.cursor = 'grabbing';
        });

        swiperWrapper.addEventListener('mouseup', (e) => {
            if(isMouseDown) {
                this.touchEndX = e.screenX;
                this.handleSwipe();
                isMouseDown = false;
                swiperWrapper.style.cursor = 'grab';
            }
        });

        swiperWrapper.addEventListener('mouseleave', () => {
            isMouseDown = false;
            swiperWrapper.style.cursor = 'grab';
        });

        swiperWrapper.style.cursor = 'grab';
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if(Math.abs(diff) > swipeThreshold) {
            if(diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
            this.resetAutoPlay();
        }
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.remove('active');
        }

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        
        if(bullets.length > 0) {
            bullets[this.currentSlide].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Auto change every 5 seconds
    }

    stopAutoPlay() {
        if(this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

let swiperInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    swiperInstance = new ImageSwiper();
});

document.addEventListener('visibilitychange', () => {
    if(swiperInstance) {
        if(document.hidden) {
            swiperInstance.stopAutoPlay();
        } else {
            swiperInstance.startAutoPlay();
        }
    }
});