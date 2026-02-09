// const volume = document.getElementById('cart-number');
// const btn_add = document.getElementById('cart-increment');
// const btn_remove = document.getElementById('cart-deincrement');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[maxlength]').forEach(input => {
        input.addEventListener('input', e => {
            let val = e.target.value, len = +e.target.getAttribute('maxlength');
            e.target.value = val.slice(0, len);
        })
    })
})

const cart_items = document.querySelectorAll('[id^="cart-item"]');
// console.log(cart_items);

cart_items.forEach(item => {
    let btn_add = item.querySelector('#cart-increment');
    let btn_remove = item.querySelector('#cart-deincrement');
    let item_volume = item.querySelector('#cart-number');

    btn_add.addEventListener("click", function() {
        if (item_volume.value < item_volume.max) {
        item_volume.value = Number(item_volume.value) + 1;
    }})

    btn_remove.addEventListener("click", function() {
        if (item_volume.value > item_volume.min) {
        item_volume.value = Number(item_volume.value) - 1;
    }})
});

