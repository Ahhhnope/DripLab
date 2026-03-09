document.addEventListener('DOMContentLoaded', function () {
    function renderLocalPosts() {
        const postsGrid = document.getElementById('posts-grid');
        if (!postsGrid) return;

        let storedPosts = [];
        try {
            storedPosts = JSON.parse(localStorage.getItem('dripLabPosts')) || [];
        } catch (e) {
            console.error("Lỗi đọc dữ liệu bài viết:", e);
        }

        storedPosts.reverse().forEach((post) => {
            const article = document.createElement('article');
            article.className = 'flex flex-col group cursor-pointer';

            const lang = localStorage.getItem('language') || 'vi';
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
    }

    // =========================================================
    // 2. CHỨC NĂNG PHÂN TRANG (PAGINATION)
    // =========================================================
    function initPagination() {
        const grid = document.getElementById('posts-grid');
        const pager = document.getElementById('pagination');
        if (!grid || !pager) return;

        const articles = Array.from(grid.querySelectorAll('article'));
        const postsPerPage = 3; // Số lượng bài viết hiển thị trên 1 trang
        const totalPages = Math.ceil(articles.length / postsPerPage) || 1;
        let currentPage = 1;

        function showPage(page) {
            currentPage = page;
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;

            articles.forEach((article, index) => {
                article.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
            });
            renderPaginationButtons();
        }

        function renderPaginationButtons() {
            pager.innerHTML = '';

            // Nút Prev
            const prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = `size-10 flex items-center justify-center rounded-full transition-colors ${currentPage === 1 ? 'bg-transparent text-dark-brown/40 dark:text-white/40 cursor-not-allowed opacity-50' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`;
            prevBtn.innerHTML = `<span class="material-symbols-outlined text-sm">chevron_left</span>`;
            prevBtn.disabled = currentPage === 1;
            prevBtn.onclick = () => showPage(currentPage - 1);
            pager.appendChild(prevBtn);

            // Nút Số trang
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = (i === currentPage) 
                    ? 'size-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-xs shadow-md'
                    : 'size-10 flex items-center justify-center rounded-full bg-transparent text-dark-brown/40 dark:text-white/40 font-bold text-xs hover:text-primary transition-colors';
                btn.innerText = i;
                btn.onclick = () => showPage(i);
                pager.appendChild(btn);
            }

            // Nút Next
            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = `size-10 flex items-center justify-center rounded-full transition-colors ${currentPage === totalPages ? 'bg-transparent text-dark-brown/40 dark:text-white/40 cursor-not-allowed opacity-50' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`;
            nextBtn.innerHTML = `<span class="material-symbols-outlined text-sm">chevron_right</span>`;
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.onclick = () => showPage(currentPage + 1);
            pager.appendChild(nextBtn);
        }

        showPage(1); // Mặc định hiển thị trang 1
    }

    // KHỞI CHẠY 2 HÀM TRÊN NGAY KHI TRANG TẢI XONG
    renderLocalPosts();
    initPagination();


    // =========================================================
    // 3. LOGIC HIỂN THỊ MODAL BÀI VIẾT (Giao diện Instagram)
    // =========================================================
    const articleModal = document.getElementById('article-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const postsGridElement = document.getElementById('posts-grid');

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalDate = document.getElementById('modal-date');
    const modalBadge = document.getElementById('modal-badge');

    if (postsGridElement) {
        postsGridElement.addEventListener('click', function(e) {
            const article = e.target.closest('article');
            if (!article) return;
            e.preventDefault(); 

            // Lấy dữ liệu ảnh
            const imgTag = article.querySelector('img'); 
            const bgDiv = article.querySelector('.bg-cover');

            if (imgTag && imgTag.src) {
                modalImage.style.backgroundImage = `url('${imgTag.src}')`;
            } else if (bgDiv) {
                const currentBgImage = window.getComputedStyle(bgDiv).backgroundImage;
                modalImage.style.backgroundImage = currentBgImage !== 'none' ? currentBgImage : bgDiv.style.backgroundImage;
            }

            // Lấy dữ liệu Text
            const badgeEl = article.querySelector('.absolute.top-4.left-4 span');
            const dateEl = article.querySelector('.text-accent-gold.tracking-\\[0\\.2em\\]');
            const titleEl = article.querySelector('h3');
            const descEl = article.querySelector('p.line-clamp-2');

            if (badgeEl) modalBadge.textContent = badgeEl.textContent;
            if (dateEl) modalDate.textContent = dateEl.textContent;
            if (titleEl) modalTitle.textContent = titleEl.textContent;
            if (descEl) modalDesc.textContent = descEl.textContent; 

            // Bật Modal
            articleModal.classList.remove('hidden');
            articleModal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        });
    }

    function closeArticleModal() {
        if (!articleModal) return;
        articleModal.classList.add('hidden');
        articleModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeArticleModal);
    if (articleModal) {
        articleModal.addEventListener('click', function(e) {
            if (e.target === articleModal) closeArticleModal();
        });
    }


    // =========================================================
    // 4. BỘ TỪ ĐIỂN RIÊNG CỦA TRANG TIN TỨC (News Dictionary)
    // Dành riêng cho các thẻ <... data-i18n="Tên_nhãn">
    // =========================================================
    const newsTranslations = {
        vi: {
            "title": "Tin tức & Blog Drip Lab",
            "meta.description": "Tin tức, câu chuyện, hướng dẫn pha chế và cập nhật cộng đồng từ xưởng rang cà phê Drip Lab.",
            "hero.badge": "Câu chuyện nổi bật",
            "hero.title": "Hành trình hướng tới nguồn cung bền vững",
            "hero.desc": "Khám phá cách chúng tôi hợp tác với các nông hộ địa phương trên vành đai cà phê để mang đến những hạt cà phê chất lượng cao nhất với nguồn cung đạo đức, đồng thời gìn giữ hệ sinh thái.",
            "posts.title": "Bài viết mới",
            "posts.filter.all": "Tất cả",
            "posts.filter.opinion": "Góc nhìn",
            "posts.filter.culture": "Văn hóa",
            "post1.badge": "Sự kiện",
            "post1.title": "Phiên nếm thử: Thứ Sáu này tại Brooklyn",
            "post1.desc": "Tham gia sự kiện nếm thử độc quyền cùng trưởng nhóm rang, khám phá các mùa vụ đơn nguồn từ Ethiopia ở vùng cao.",
            "post2.badge": "Mẹo pha cà phê",
            "post2.title": "Thuần Thục V60: Khi Việc Pha Cà Phê Trở Thành Một \"Buổi Trình Diễn\" Tại Gia",
            "post2.desc": "Mẹo chuyên nghiệp cho pour-over hoàn hảo. Tìm hiểu kích thước xay và nhiệt độ nước chuẩn để đạt chất lượng như quán.",
            "post3.badge": "Đồ uống mới",
            "post3.title": "Ra mắt: Latte mật ong sữa yến mạch",
            "post3.desc": "Món ưa thích theo mùa đã trở lại trong thực đơn. Mật ong thu hoạch thủ công hòa cùng sữa yến mạch và espresso đặc trưng của chúng tôi.",
            "post4.badge": "Văn hóa",
            "post4.date": "28 Tháng 10, 2023",
            "post4.title": "Nghệ thuật Cold Brew: Chắt lọc tinh hoa từ thời gian",
            "post4.desc": "Không giống như cà phê pha máy thông thường, Cold Brew tại Drip Lab được ngâm ủ lạnh kiên nhẫn trong suốt 18 giờ. Quá trình chậm rãi này giúp giảm độ chua, tôn lên vị ngọt tự nhiên của hạt Arabica và tạo ra một thức uống mượt mà, sảng khoái tuyệt đối cho những ngày oi bức.",
            "post5.badge": "Đồ uống mới",
            "post5.date": "05 Tháng 11, 2023",
            "post5.title": "Khởi đầu thanh tịnh cùng Trà Thảo Mộc",
            "post5.desc": "Bên cạnh những ly cà phê đậm đà, Drip Lab mang đến cho bạn một nốt trầm tĩnh lặng với dòng trà thảo mộc trứ danh. Từng búp trà thượng hạng hòa quyện cùng chút mật ong nguyên chất, tỏa hương thơm ngát giúp xoa dịu tâm hồn và làm ấm cơ thể trong những ngày giao mùa."
        },
        en: {
            "title": "Drip Lab News & Blog",
            "meta.description": "News, stories, brew guides, and community updates from Drip Lab roastery.",
            "hero.badge": "Featured story",
            "hero.title": "Journey toward sustainable sourcing",
            "hero.desc": "Discover how we partner with local farmers along the coffee belt to deliver high-quality beans with ethical sourcing while preserving ecosystems.",
            "posts.title": "Latest posts",
            "posts.filter.all": "All",
            "posts.filter.opinion": "Opinion",
            "posts.filter.culture": "Culture",
            "post1.badge": "Event",
            "post1.title": "Cupping session: This Friday in Brooklyn",
            "post1.desc": "Join an exclusive cupping with our head roaster to explore single-origin seasonal lots from the Ethiopian highlands.",
            "post2.badge": "Brewing tips",
            "post2.title": "Master V60: When Coffee Brewing Becomes an At-Home \"Performance\"",
            "post2.desc": "Pro tips for the perfect pour-over. Learn the right grind size and water temperature to achieve café-level quality.",
            "post3.badge": "New drink",
            "post3.title": "Introducing: Honey oat milk latte",
            "post3.desc": "A seasonal favorite is back on the menu. Hand-harvested honey blended with oat milk and our signature espresso.",
            "post4.badge": "Culture",
            "post4.date": "October 28, 2023",
            "post4.title": "The Art of Cold Brew: Extracting essence through time",
            "post4.desc": "Unlike regular espresso-based coffee, Drip Lab's Cold Brew is patiently steeped in cold water for 18 hours. This slow process reduces acidity, enhances the natural sweetness of Arabica beans, and creates a perfectly smooth, refreshing drink for hot days.",
            "post5.badge": "New drink",
            "post5.date": "November 05, 2023",
            "post5.title": "A peaceful start with our Herbal Tea",
            "post5.desc": "Alongside our bold coffees, Drip Lab offers a tranquil escape with our signature herbal tea collection. Premium tea leaves blended with a touch of pure honey release a fragrant aroma that soothes the soul and warms the body during the changing seasons."
        }
    };

    function translateNews(lang) {
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            const text = newsTranslations[lang]?.[key];
            if (text) {
                const span = el.querySelector('span');
                if (span && span.childElementCount === 0) span.textContent = text;
                else el.textContent = text;
            }
        });
    }

    // Kết nối với nút bấm chuyển ngôn ngữ từ Header (TranslationAndHeaderFooter.js)
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            translateNews(btn.getAttribute('data-lang'));
        });
    });

    // Cập nhật ngôn ngữ ngay khi tải lại trang
    const currentLang = localStorage.getItem('language') || 'vi';
    translateNews(currentLang);
});