import products from '../assets/data/products.json' with { type: 'json' }
import filter from '../assets/data/filter.json' with {type: 'json'}

const grid = document.getElementById('productGrid');

function appendFilters() {
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
            <span class="carbon-badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout-icon lucide-sprout"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg> ${p.carbonFootprint} kg CO₂e</span>
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
              <span class="metric"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg> ${p.energyUse} kWh</span>
              <span class="metric"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet-icon lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg> ${p.waterUse} L</span>
              <span class="metric"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-recycle-icon lucide-recycle"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg> ${p.waste} kg</span>
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