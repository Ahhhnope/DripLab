const receipts = [
  { id: "DL-8821", date: "MARCH 24, 2024", total: 24.5 },
  { id: "DL-8794", date: "MARCH 12, 2024", total: 42.0 },
  { id: "DL-8651", date: "FEB 28, 2024", total: 12.75 },
  { id: "DL-8422", date: "FEB 15, 2024", total: 88.3 },
  { id: "DL-8309", date: "FEB 02, 2024", total: 17.2 },
  { id: "DL-8201", date: "JAN 25, 2024", total: 9.9 },
  { id: "DL-8144", date: "JAN 11, 2024", total: 35.0 },
  { id: "DL-8088", date: "JAN 03, 2024", total: 21.25 },
];

const PAGE_SIZE = 4;
let page = 1;
let sortMode = "all"; // all | latest | price

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function money(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function iconSvg(kind) {
  // 2 simple icons to mimic screenshot variety
  if (kind === 0) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 22h10a2 2 0 0 0 2-2V7.83a2 2 0 0 0-.59-1.41l-2.83-2.83A2 2 0 0 0 14.17 3H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2m0-2V5h7v3a2 2 0 0 0 2 2h3v10Zm2-6h6v2H9zm0 4h6v2H9zm0-8h4v2H9z"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a6 6 0 0 0-6 6c0 4.42 6 12 6 12s6-7.58 6-12a6 6 0 0 0-6-6m0 8.5A2.5 2.5 0 1 1 14.5 8A2.5 2.5 0 0 1 12 10.5"/></svg>`;
}

function downloadSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 20h14v-2H5zm7-18v10.17l3.59-3.58L17 10l-5 5l-5-5l1.41-1.41L11 12.17V2z"/></svg>`;
}

function getSortedData() {
  const data = [...receipts];
  if (sortMode === "latest") {
    // dates are already newest -> oldest in demo, keep as-is
    return data;
  }
  if (sortMode === "price") {
    return data.sort((a, b) => b.total - a.total);
  }
  return data;
}

function render() {
  const data = getSortedData();
  const total = data.length;
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  page = Math.min(page, maxPage);

  const start = (page - 1) * PAGE_SIZE;
  const slice = data.slice(start, start + PAGE_SIZE);

  $("#receiptList").innerHTML = slice
    .map((r, idx) => {
      return `
        <div class="receipt-row" data-id="${r.id}">
          <div class="left">
            <div class="pict" aria-hidden="true">${iconSvg((start + idx) % 2)}</div>
            <div class="meta">
              <div class="date">${r.date}</div>
              <div class="code">#${r.id}</div>
            </div>
          </div>

          <div class="mid">
            <div class="price-block">
              <div class="label">TOTAL PRICE</div>
              <div class="value">${money(r.total)}</div>
            </div>

            <button class="small-icon" type="button" aria-label="Download receipt" data-download="${r.id}">
              ${downloadSvg()}
            </button>

            <button class="details" type="button" data-details="${r.id}">View Details</button>
          </div>
        </div>
      `;
    })
    .join("");

  $("#countText").textContent = `Showing ${Math.min(start + PAGE_SIZE, total)} of ${total} transactions`;

  // page buttons
  const pagesEl = $("#pageButtons");
  pagesEl.innerHTML = "";
  const pagesToShow = Math.min(3, maxPage);
  const first = Math.max(1, Math.min(page - 1, maxPage - pagesToShow + 1));

  for (let p = first; p < first + pagesToShow; p++) {
    const btn = document.createElement("button");
    btn.className = "pager__page" + (p === page ? " is-active" : "");
    btn.type = "button";
    btn.textContent = String(p);
    btn.addEventListener("click", () => {
      page = p;
      render();
    });
    pagesEl.appendChild(btn);
  }

  $("#prevPage").disabled = page === 1;
  $("#nextPage").disabled = page === maxPage;
}

function openModal(receiptId) {
  const r = receipts.find((x) => x.id === receiptId);
  if (!r) return;
  $("#modalTitle").textContent = `#${r.id}`;
  $("#mDate").textContent = r.date;
  $("#mPrice").textContent = money(r.total);

  const modal = $("#modal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  $("#downloadBtn").onclick = () => fakeDownload(r.id);
}

function closeModal() {
  const modal = $("#modal");
  modal.hidden = true;
  document.body.style.overflow = "";
}

function fakeDownload(receiptId) {
  const blob = new Blob([
    `Receipt: #${receiptId}\nGenerated: ${new Date().toISOString()}\n\n(This is a demo file.)`,
  ], { type: "text/plain;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${receiptId}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function setupFilterMenu() {
  const btn = $("#filterBtn");
  const menu = $("#filterMenu");

  function setOpen(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });

  menu.addEventListener("click", (e) => {
    const item = e.target.closest("[data-filter]");
    if (!item) return;
    sortMode = item.getAttribute("data-filter");
    page = 1;
    setOpen(false);
    render();
  });

  document.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function setupEvents() {
  // pagination arrows
  $("#prevPage").addEventListener("click", () => {
    page = Math.max(1, page - 1);
    render();
  });
  $("#nextPage").addEventListener("click", () => {
    page = page + 1;
    render();
  });

  // delegated events for list buttons
  $("#receiptList").addEventListener("click", (e) => {
    const details = e.target.closest("[data-details]");
    if (details) {
      openModal(details.getAttribute("data-details"));
      return;
    }

    const dl = e.target.closest("[data-download]");
    if (dl) {
      fakeDownload(dl.getAttribute("data-download"));
    }
  });

  // modal close
  $("#modal").addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

setupFilterMenu();
setupEvents();
render();