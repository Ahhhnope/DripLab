(function () {
  const modal = document.getElementById('orderDetailsModal');
  if (!modal) return;

  const modalContent = modal.querySelector('[data-modal-content]');
  const closeBtn = document.getElementById('closeModalBtn');
  const closeTop = document.getElementById('closeModalTop');

  const elOrderId = document.getElementById('modalOrderID');
  const elOrderDate = document.getElementById('modalOrderDate');
  const elTotal = document.getElementById('modalTotalPrice');

  function openModal(id, date, total) {
    if (elOrderId) elOrderId.textContent = id;
    if (elOrderDate) elOrderDate.textContent = date;
    if (elTotal) elTotal.textContent = total;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // animation
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modalContent?.classList.remove('scale-95');
      modalContent?.classList.add('scale-100');
    });
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modalContent?.classList.remove('scale-100');
    modalContent?.classList.add('scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 250);
  }

  // Event delegation: click "View Details" in table
  const table = document.querySelector('table');
  table?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const label = (btn.textContent || '').trim();
    if (label !== 'View Details') return;

    const row = btn.closest('tr');
    if (!row) return;

    const id = row.querySelector('p.text-sm.font-bold')?.textContent?.trim() || '#';
    const date = row.cells?.[1]?.textContent?.trim() || '';
    const total = row.cells?.[2]?.textContent?.trim() || '';

    openModal(id, date, total);
  });

  closeBtn?.addEventListener('click', closeModal);
  closeTop?.addEventListener('click', closeModal);

  // click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
})();