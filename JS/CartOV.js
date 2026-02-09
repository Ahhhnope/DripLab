const volume = document.getElementById('cart-number');
const btn_add = document.getElementById('cart-increment');
const btn_remove = document.getElementById('cart-deincrement');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[maxlength]').forEach(input => {
        input.addEventListener('input', e => {
            let val = e.target.value, len = +e.target.getAttribute('maxlength');
            e.target.value = val.slice(0, len);
        })
    })
})

const btns_add = document.querySelectorAll('cart-increment');
const btns_remove = document.querySelectorAll('cart-deincrement');
const items_volume = document.querySelectorAll('cart-number');

for (let i = 0; i < btns_add.length; i++) {
    console.log(i);
    btns_add[i].addEventListener("click", function () {
        if (items_volume[i].value < items_volume[i].max) {
            items_volume[i].value = Number(items_volume[i].value) + 1;
        }
    });
}


// btn_add.addEventListener("click", function () {
//     if (volume.value < volume.max) {
//         volume.value = Number(volume.value) + 1;
//     }
// });

// btn_remove.addEventListener("click", function () {
//     if (volume.value > volume.min) {
//         volume.value = Number(volume.value) - 1;
//     }
// });
