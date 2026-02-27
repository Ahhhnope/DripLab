tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#a15912",
                "brand-dark": "#3d2e1f",
                "background-light": "#f8f7f6",
                "background-dark": "#211911",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            },
            borderRadius: { 
                "DEFAULT": "0.25rem", 
                "lg": "0.5rem", 
                "xl": "0.75rem", 
                "full": "9999px" 
            },
        },
    },
};


function checkEmpty() {
    if (tbody.children.length === 0) {
        const newEmptyRow = document.createElement("tr");
        newEmptyRow.innerHTML = `
            <td colspan="4" class="text-center text-gray-400 h-[64px]">
                No orders yet ☕
            </td>
        `;
        tbody.appendChild(newEmptyRow);
    }
}

newBar.style.height = "0%";

setTimeout(() => {
    newBar.style.height = "62%";
}, 50);