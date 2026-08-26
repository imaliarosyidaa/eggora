import products from '../assets/data/products.json' with { type: 'json' }
import filter from '../assets/data/filter.json' with {type: 'json'}

const grid = document.getElementById('productGrid');

function appendFilters(){
  const html = filter.map(p => `
    <label
      ><input
        type="checkbox"
        class="filter-checkbox"
        value="${p.value}"
        checked
      />
    ${p.label}</label
    >`).join('');
  $("#filter-content").append(html);
}
appendFilters();

function renderProducts(filtered) {
  grid.innerHTML = '';

  const listToRender = filtered.length ? filtered : [];

  if (listToRender.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1 / -1;">Tidak ada produk ditemukan.</p>';
    return;
  }

  listToRender.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <div class="product-image">
            <img
              class="product-img"
              src="${p.image}"
              alt="${p.name}"
            />
            <span class="carbon-badge">🌱 ${p.carbonFootprint} kg CO₂e</span>
            <div class="icons">
              <span class="material-icons add-to-cart"
                data-name="${p.name}"
                data-price="${p.price}"
                data-img="${p.image}"
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9aa4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
              <span
                class="material-icons favorite-btn"
                data-name="${p.name}"
                data-price="${p.price}"
                data-img="${p.image}"
                ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span
              >
              <span class="material-icons visibility-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg></span>
            </div>
          </div>
          <div class="product-info">
            <p>${p.name}</p>
            <span class="seller-name">${p.seller} • ${p.location}</span>
            <div class="cert-badges">${p.certifications.map(c => `<span class="cert">${c}</span>`).join('')}</div>
            <div class="metrics-row">
              <span class="metric">⚡ ${p.energyUse} kWh</span>
              <span class="metric">💧 ${p.waterUse} L</span>
              <span class="metric">♻️ ${p.waste} kg</span>
            </div>
            <div class="esg">
              <span class="esg-label">ESG ${p.esgScore}</span>
              <div class="esg-bar"><div class="esg-fill" style="width:${p.esgScore}%"></div></div>
            </div>
            <strong>${p.price}</strong>
          </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const activeCats = Array.from(checkboxes)
    .filter(chk => chk.checked)
    .map(chk => chk.value.trim());

  const filtered = products.filter(p => activeCats.includes(p.category));
  renderProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.filter-checkbox').forEach(chk =>
    chk.addEventListener('change', applyFilters)
  );

  applyFilters();
});

document.addEventListener("change", function (e) {
  if (e.target.classList.contains("filter-checkbox")) {
    applyFilters();
  }
});