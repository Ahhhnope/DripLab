// Data Mock
const banners = [
    {
        id: "1",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeledX1EaCIP-RpGsZ9cQccV2yaSj1ZJ9h7-1emZlywlpTSaqud6rXORNx5YTsgvnG57mnMI_JXAs-1My8OZGhB2RQS6N1vxWntRn_ZqmAo1CPz-xDZHg0nE_gGWdu8WEMHmkMtvG7nqBPmjh-n20VXJOxNXd3SLI7K9S39JmqnDOm1RFM3omajV_tfv6hFQyc447uOSG6FnjRWtKRVrqhbrmg91Ei6VAAZDqrd9pWE_9pIlMxKPwWa3NZItXnWw9Qjkmgcto_M-TJ",
        link: "/collections/summer-2024"
    },
    {
        id: "2",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq2Dx69jyJibb8VgM0S9gcRq9-gaCqOqG1E7fCZwvFwBUarcRVEwPmApNucq772RP4fStx5SKV5gBQnt_RwSaUZ7RbyB9erP5jjKBv-3fv0D4iXh167Bvx0z1TQ30RLUWhTfs7sRjNOl8-uN56LWK5kENl1ZbNLMkJqQxI7OFrxQZpuvs6FqoaoBxtUm7emh8E4n9qfoa4dhTwhAKfz6pZVDBD2gCb_18CN4sHCJ2jJK2D2osza9S-2Y6hPGQEhgMH-MPc-uyvLOBc",
        link: "/blog/sustainability-at-drip-lab"
    }
];

const news = [
    {
        id: "1",
        title: "Summer Collection Drop 2024",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeledX1EaCIP-RpGsZ9cQccV2yaSj1ZJ9h7-1emZlywlpTSaqud6rXORNx5YTsgvnG57mnMI_JXAs-1My8OZGhB2RQS6N1vxWntRn_ZqmAo1CPz-xDZHg0nE_gGWdu8WEMHmkMtvG7nqBPmjh-n20VXJOxNXd3SLI7K9S39JmqnDOm1RFM3omajV_tfv6hFQyc447uOSG6FnjRWtKRVrqhbrmg91Ei6VAAZDqrd9pWE_9pIlMxKPwWa3NZItXnWw9Qjkmgcto_M-TJ",
        date: "Oct 12, 2023",
        author: "Alex Rivera",
        status: "Published",
        tags: ["Collection", "Trends"],
        isFeatured: true
    },
    {
        id: "2",
        title: "Sustainability at Drip Lab",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq2Dx69jyJibb8VgM0S9gcRq9-gaCqOqG1E7fCZwvFwBUarcRVEwPmApNucq772RP4fStx5SKV5gBQnt_RwSaUZ7RbyB9erP5jjKBv-3fv0D4iXh167Bvx0z1TQ30RLUWhTfs7sRjNOl8-uN56LWK5kENl1ZbNLMkJqQxI7OFrxQZpuvs6FqoaoBxtUm7emh8E4n9qfoa4dhTwhAKfz6pZVDBD2gCb_18CN4sHCJ2jJK2D2osza9S-2Y6hPGQEhgMH-MPc-uyvLOBc",
        date: "Oct 05, 2023",
        author: "Jordan Smith",
        status: "Published",
        tags: ["Eco", "Brand News"],
        isFeatured: true
    }
];

// DOM Elements
const bannerListEl = document.getElementById('banner-list');
const newsListEl = document.getElementById('news-list');
const publishBtn = document.getElementById('publish-btn');
const postTitleInput = document.getElementById('post-title');
const toastEl = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMessage = document.getElementById('toast-message');

// Upload Elements
const dropZone = document.getElementById('drop-zone');
const fileUpload = document.getElementById('file-upload');
const imagePreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const removeImageBtn = document.getElementById('remove-image');

// Functions
function renderBanners() {
    if (!bannerListEl) return;
    bannerListEl.innerHTML = banners.map((banner, index) => `
        <div class="bg-card rounded-xl border border-border overflow-hidden group shadow-sm">
            <div class="aspect-[21/9] bg-cover bg-center relative transition-transform hover:scale-[1.02] duration-500" style="background-image: url('${banner.image}')">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button class="bg-white text-black p-2 rounded-full hover:bg-primary transition-colors shadow-lg transform hover:scale-110">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button class="bg-white text-black p-2 rounded-full hover:bg-destructive hover:text-white transition-colors shadow-lg transform hover:scale-110" onclick="deleteBanner('${banner.id}')">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
                <div class="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[10px] font-black uppercase rounded text-white shadow-sm">Slide ${index + 1}</div>
            </div>
            <div class="p-3 flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Link Destination</span>
                    <div class="flex gap-1">
                        <button class="p-1 text-muted-foreground hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">arrow_upward</span></button>
                        <button class="p-1 text-muted-foreground hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">arrow_downward</span></button>
                    </div>
                </div>
                <div class="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded text-xs font-medium border border-border">
                    <span class="material-symbols-outlined text-sm text-muted-foreground">link</span>
                    <span class="truncate">${banner.link}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderNews() {
    if (!newsListEl) return;
    newsListEl.innerHTML = news.map(post => `
        <tr class="hover:bg-secondary/30 transition-colors group">
            <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded bg-secondary bg-cover bg-center shrink-0 border border-border" style="background-image: url('${post.image}')"></div>
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-semibold text-foreground">${post.title}</span>
                            ${post.isFeatured ? '<span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: \'FILL\' 1">star</span>' : ''}
                        </div>
                        <span class="text-xs text-muted-foreground">${post.tags.join(", ")}</span>
                    </div>
                </div>
            </td>
            <td class="px-6 py-5 text-sm text-muted-foreground">${post.date}</td>
            <td class="px-6 py-5 text-sm font-medium">${post.author}</td>
            <td class="px-6 py-5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    <span class="size-1.5 rounded-full bg-green-500"></span>
                    ${post.status}
                </span>
            </td>
            <td class="px-6 py-5 text-right">
                <button class="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
                    <span class="material-symbols-outlined text-[20px]">edit_note</span>
                </button>
            </td>
        </tr>
    `).join('');
}

function showToast(title, message, type = 'success') {
    if (!toastEl) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toastEl.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    
    setTimeout(() => {
        toastEl.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 3000);
}

// === UPLOAD LOGIC ===

// Click to open file dialog
if (dropZone && fileUpload) {
    dropZone.addEventListener('click', () => {
        fileUpload.click();
    });
}

// Handle file selection
if (fileUpload) {
    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });
}

// Handle Drag & Drop
if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-primary');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-primary');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-primary');
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    });
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Error', 'Please upload an image file', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
        uploadPlaceholder.classList.add('hidden');
        removeImageBtn.classList.remove('hidden');
        
        // Stop click propagation on remove button
        removeImageBtn.onclick = (event) => {
            event.stopPropagation(); // Prevent opening file dialog
            clearImage();
        };
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    imagePreview.src = '';
    imagePreview.classList.add('hidden');
    uploadPlaceholder.classList.remove('hidden');
    removeImageBtn.classList.add('hidden');
    fileUpload.value = ''; // Reset input
}


// === PUBLISH LOGIC (Đã sửa) ===
if (publishBtn) {
    publishBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // 1. Lấy giá trị từ các ô Input
        const titleInput = document.getElementById('post-title');
        const contentInput = document.querySelector('textarea'); // Lấy textarea nội dung
        const imgPreview = document.getElementById('image-preview'); // Lấy ảnh đã upload
        
        const title = titleInput ? titleInput.value.trim() : '';
        const desc = contentInput ? contentInput.value.trim() : '';
        
        // 2. Validate (Kiểm tra dữ liệu)
        if (!title) {
            showToast('Lỗi', 'Vui lòng nhập tiêu đề bài viết', 'error');
            return;
        }

        // 3. Tạo đối tượng bài viết mới
        const newPost = {
            id: Date.now().toString(), // Tạo ID duy nhất dựa trên thời gian
            title: title,
            // Nếu có ảnh upload thì lấy, nếu không thì dùng ảnh mặc định
            image: (imgPreview && !imgPreview.classList.contains('hidden')) 
                   ? imgPreview.src 
                   : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
            date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }),
            author: "Admin User", // Hoặc lấy từ input nếu có
            badge: "Tin mới", // Mặc định
            desc: desc || "Chưa có mô tả tóm tắt...",
            dataPage: "1" // Mặc định hiện ở trang 1
        };

        // 4. LƯU VÀO LOCAL STORAGE (Bước quan trọng bị thiếu)
        // Lấy danh sách cũ ra, nếu chưa có thì tạo mảng rỗng
        const existingPosts = JSON.parse(localStorage.getItem('dripLabPosts')) || [];
        
        // Thêm bài mới vào đầu danh sách (unshift)
        existingPosts.unshift(newPost);
        
        // Lưu ngược lại vào LocalStorage
        localStorage.setItem('dripLabPosts', JSON.stringify(existingPosts));
        
        // 5. Thông báo thành công
        showToast('Thành công', 'Bài viết đã được xuất bản!');
        
        // 6. Chuyển hướng về trang News để xem kết quả
        setTimeout(() => {
            // Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn
            window.location.href = 'News.html'; 
        }, 1000);
    });
}

// Initial Render
renderBanners();
renderNews();

// Global functions for inline events
window.deleteBanner = (id) => {
    const index = banners.findIndex(b => b.id === id);
    if (index > -1) {
        banners.splice(index, 1);
        renderBanners();
        showToast('Deleted', 'Slide deleted successfully');
    }
};