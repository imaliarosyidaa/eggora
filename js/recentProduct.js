import products from '../assets/data/products.json' with { type: 'json' };

function appendCard() {
  const productList = $("#product-list");

  if (!productList.length) {
    console.error('#product-list tidak ditemukan');
    return;
  }

  products.forEach((p) => {
    productList.append(
      `<div class="product-card">
        <div class="product-image">
          <img class="product-img" src="${p.image}" alt="${p.name}" />
          <span class="carbon-badge">🌱 ${p.carbonFootprint} kg CO₂e</span>
          <div class="icons">
            <span class="add-to-cart" data-name="${p.name}" data-price="${p.price}" data-img="${p.image}">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </span>
            <span class="favorite-btn" data-name="${p.name}" data-price="${p.price}" data-img="${p.image}">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </span>
            <span class="visibility-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
          </div>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="seller">
            <span class="seller-name">${p.seller}</span>
            <span class="seller-role">Peternak Mitra</span>
          </p>
          <div class="cert-badges">${p.certifications.map(c => `<span class="cert">${c}</span>`).join('')}</div>
          <div class="metrics-row">
            <span class="metric">⚡ ${p.energyUse} kWh</span>
            <span class="metric">💧 ${p.waterUse} L</span>
            <span class="metric">♻️ ${p.waste} kg</span>
          </div>
          <p class="product-price">
            <strong>${p.price}</strong>
            <span>/ Kg</span>
          </p>
        </div>
      </div>`
    );
  });
}

appendCard();
