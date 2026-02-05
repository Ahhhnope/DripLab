document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const total = slider.children.length;
    let index = 0;

    function update() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.onclick = () => {
        index = (index + 1) % total;
        update();
    };

    prevBtn.onclick = () => {
        index = (index - 1 + total) % total;
        update();
    };
});

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


