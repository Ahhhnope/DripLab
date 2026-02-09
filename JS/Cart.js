var volume = document.getElementById('cart-number');
var btn_add = document.getElementById('cart-increment');
var btn_remove = document.getElementById('cart-deincrement');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[maxlength]').forEach(input => {
    input.addEventListener('input', e => {
    let val = e.target.value, len = +e.target.getAttribute('maxlength');
      e.target.value = val.slice(0,len);
    })
  })
})

btn_add.addEventListener("click", function() {
    if (volume.value < volume.max) {
        volume.value = Number(volume.value) + 1;
    }
});

btn_remove.addEventListener("click", function() {
    if (volume.value > volume.min) {
        volume.value = Number(volume.value) - 1;
    }
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 49 || charCode > 57))
        return false;

    return true;
}