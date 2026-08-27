import products from '../assets/data/products.json' with { type: 'json' };

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10);
const product = products.find((p) => p.id === id);

const $ = (sel) => document.querySelector(sel);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

if (!product) {
  $('#detailContainer').innerHTML =
    '<div class="history-empty"><p>Produk tidak ditemukan. <a href="products.html">Kembali ke katalog</a></p></div>';
} else {
  // ---- Header / breadcrumb ----
  $('#breadcrumbName').textContent = product.name;
  document.title = product.name + ' - Eggora';

  // ---- Gambar utama + thumbnail ----
  const gallery = Array.isArray(product.gallery) && product.gallery.length
    ? product.gallery
    : [product.image];

  const mainImage = $('#mainImage');
  mainImage.src = product.image;
  mainImage.alt = product.name;

  const thumbs = $('#thumbs');
  thumbs.innerHTML = gallery
    .map(
      (src, i) =>
        `<div class="detail-thumb${i === 0 ? ' active' : ''}" data-src="${src}">
           <img src="${src}" alt="${escapeHtml(product.name)}" />
         </div>`
    )
    .join('');

  thumbs.querySelectorAll('.detail-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.src;
      thumbs
        .querySelectorAll('.detail-thumb')
        .forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // ---- Info produk ----
  $('#pName').textContent = product.name;
  $('#pStars').textContent = renderStars(product.rating);
  $('#pRating').textContent = product.rating.toFixed(1);
  $('#pSold').textContent = product.sold;
  $('#pPrice').innerHTML = `${product.price} <span>/ kg</span>`;
  $('#pDesc').textContent = product.description;

  // ---- Stok ----
  const stockEl = $('#pStock');
  let maxQty = product.stock;
  if (!product.stock || product.stock <= 0) {
    stockEl.textContent = 'Stok Habis';
    stockEl.classList.add('out');
    maxQty = 0;
  } else {
    stockEl.textContent = `Tersedia • Stok: ${product.stock}`;
    stockEl.classList.remove('out');
  }

  // ---- Varian ----
  let selectedVariant = null;
  const variantsEl = $('#pVariants');
  if (Array.isArray(product.variants) && product.variants.length) {
    selectedVariant = product.variants[0];
    variantsEl.innerHTML = product.variants
      .map(
        (v, i) =>
          `<span class="detail-variant${i === 0 ? ' active' : ''}" data-variant="${escapeHtml(v)}">${escapeHtml(v)}</span>`
      )
      .join('');
    variantsEl.querySelectorAll('.detail-variant').forEach((pill) => {
      pill.addEventListener('click', () => {
        selectedVariant = pill.dataset.variant;
        variantsEl
          .querySelectorAll('.detail-variant')
          .forEach((x) => x.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  } else {
    variantsEl.innerHTML = '<span class="detail-variant active">Default</span>';
    selectedVariant = 'Default';
  }

  // ---- Quantity ----
  const qtyInput = $('#qtyInput');
  const qtyMinus = $('#qtyMinus');
  const qtyPlus = $('#qtyPlus');

  function clampQty(val) {
    let q = parseInt(val, 10);
    if (isNaN(q) || q < 1) q = 1;
    if (maxQty > 0 && q > maxQty) q = maxQty;
    return q;
  }

  function setQty(q) {
    qtyInput.value = q;
    qtyMinus.disabled = q <= 1 || maxQty <= 0;
    qtyPlus.disabled = maxQty <= 0 || q >= maxQty;
  }

  if (maxQty <= 0) {
    qtyInput.value = 0;
    qtyInput.disabled = true;
    qtyMinus.disabled = true;
    qtyPlus.disabled = true;
  } else {
    setQty(1);
  }

  qtyMinus.addEventListener('click', () => setQty(clampQty(qtyInput.value) - 1));
  qtyPlus.addEventListener('click', () => setQty(clampQty(qtyInput.value) + 1));
  qtyInput.addEventListener('change', () => setQty(clampQty(qtyInput.value)));

  // ---- Cart action ----
  function buildItem() {
    const qty = maxQty <= 0 ? 0 : clampQty(qtyInput.value);
    return {
      name: product.name,
      price: product.price,
      img: product.image,
      qty: qty,
      variant: selectedVariant || 'Default',
    };
  }

  function addToCart() {
    if (maxQty <= 0) return;
    const item = buildItem();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (typeof renderCart === 'function') renderCart();
    if (typeof cartSidebar !== 'undefined') cartSidebar.classList.add('open');
    const label = item.variant ? `${item.qty} × ${item.variant}` : `${item.qty}`;
    $('#feedback').textContent = `Ditambahkan ke keranjang (${label}).`;
    setTimeout(() => ($('#feedback').textContent = ''), 2500);
  }

  function buyNow() {
    if (maxQty <= 0) return;
    const item = buildItem();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
  }

  $('#addCartBtn').addEventListener('click', addToCart);
  $('#buyNowBtn').addEventListener('click', buyNow);
  $('#addCartBtnMobile').addEventListener('click', addToCart);
  $('#buyNowBtnMobile').addEventListener('click', buyNow);

  if (maxQty <= 0) {
    $('#addCartBtn').disabled = true;
    $('#buyNowBtn').disabled = true;
    $('#addCartBtnMobile').disabled = true;
    $('#buyNowBtnMobile').disabled = true;
  }

  // ---- Tabs ----
  const tabHead = $('#tabHead');
  tabHead.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const target = btn.dataset.tab;
    tabHead
      .querySelectorAll('.tab-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document
      .querySelectorAll('.tab-panel')
      .forEach((p) => p.classList.remove('active'));
    $('#tab-' + target).classList.add('active');
  });

  // ---- Tab content ----
  $('#tab-desc').innerHTML = `
    <p>${escapeHtml(product.description)}</p>
    <p>Produk ini berasal dari peternak mitra Eggora yang menjalankan praktik
    <strong>Green Supply Chain</strong>: pakan lokal rendah emisi, energi terbarukan,
    dan dokumentasi paperless sepanjang rantai pasok.</p>
  `;

  $('#tab-detail').innerHTML = `
    <table class="detail-table">
      <tr><td>Kategori</td><td>${escapeHtml(product.category)}</td></tr>
      <tr><td>Sertifikasi</td><td>${product.certifications.map((c) => `<span class="cert">${escapeHtml(c)}</span>`).join(' ')}</td></tr>
      <tr><td>Jejak Karbon</td><td>${product.carbonFootprint} kg CO₂e</td></tr>
      <tr><td>Penggunaan Energi</td><td>${product.energyUse} kWh</td></tr>
      <tr><td>Penggunaan Air</td><td>${product.waterUse} L</td></tr>
      <tr><td>Limbah</td><td>${product.waste} kg</td></tr>
      <tr><td>Skor ESG</td><td>${product.esgScore}</td></tr>
      <tr><td>Rating</td><td>${product.rating.toFixed(1)} ★ (${escapeHtml(product.sold)} terjual)</td></tr>
      <tr><td>Stok</td><td>${maxQty > 0 ? product.stock : 'Habis'}</td></tr>
    </table>
  `;

  $('#tab-supplier').innerHTML = `
    <div class="detail-supplier">
      <h3>${escapeHtml(product.seller)}</h3>
      <p>${escapeHtml(product.location)} ${
        product.verified
          ? '<span class="cert" style="background:#174D22;color:#fff;">Terverifikasi</span>'
          : '<span class="cert" style="background:#9e9e9e;color:#fff;">Belum Terverifikasi</span>'
      }</p>
      <div class="cert-badges">${product.certifications.map((c) => `<span class="cert">${escapeHtml(c)}</span>`).join('')}</div>
      <div class="esg">
        <span class="esg-label">ESG ${product.esgScore}</span>
        <div class="esg-bar"><div class="esg-fill" style="width:${product.esgScore}%"></div></div>
      </div>
      <table class="detail-table">
        <tr><td>Jarak Rantai Pasok</td><td>${product.routeDistance} km</td></tr>
        <tr><td>Emisi Terhindar</td><td>${product.emissionsSaved} kg CO₂e</td></tr>
        <tr><td>Dokumen Paperless</td><td>${product.paperlessDocs} dokumen</td></tr>
      </table>
    </div>
  `;

  $('#tab-ship').innerHTML = `
    <p>Dikirim dari <strong>${escapeHtml(product.location)}</strong>.</p>
    <ul class="detail-list">
      <li>Estimasi tiba 2–4 hari kerja (di luar hari libur).</li>
      <li>Gratis ongkir untuk pembelian di atas Rp100.000.</li>
      <li>Kemasan ramah lingkungan: paperless & biodegradable.</li>
      <li>Setiap pengiriman teroptimasi rute terpendek (${product.routeDistance} km) untuk menekan emisi.</li>
    </ul>
  `;

  const trace = (product.traceability || [])
    .map(
      (t) => `
      <div class="tl-step">
        <div class="tl-dot">✓</div>
        <div class="tl-body">
          <h4>${escapeHtml(t.stage)}</h4>
          <p>${escapeHtml(t.note)}</p>
          <div class="tl-metrics">
            <span>Karbon ${t.carbon} kg</span>
            <span>Energi ${t.energy} kWh</span>
            <span>Air ${t.water} L</span>
            <span>Limbah ${t.waste} kg</span>
          </div>
        </div>
      </div>`
    )
    .join('');

  $('#tab-quality').innerHTML = `
    <p>Skor ESG peternak mitra: <strong>${product.esgScore}</strong>.
    Jejak karbon keseluruhan: <strong>${product.carbonFootprint} kg CO₂e</strong>.</p>
    <div class="timeline">${trace}</div>
  `;
}
