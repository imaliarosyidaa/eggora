import products from '../assets/data/products.json' with { type: 'json' };

const sum = (arr, f) => arr.reduce((a, p) => a + f(p), 0);

// ---------- Agregat ----------
const totalCarbon = sum(products, p => p.carbonFootprint);
const totalEnergy = sum(products, p => p.energyUse);
const totalWater = sum(products, p => p.waterUse);
const totalWaste = sum(products, p => p.waste);
const avgEsg = Math.round(sum(products, p => p.esgScore) / products.length);
const totalEmissionSaved = sum(products, p => p.emissionsSaved);
const totalPaperless = sum(products, p => p.paperlessDocs);
const totalDistance = sum(products, p => p.routeDistance);
const verifiedCount = products.filter(p => p.verified).length;

// ---------- KPI Big Data ----------
const kpis = [
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout-icon lucide-sprout"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>', label: 'Total Jejak Karbon', value: totalCarbon.toFixed(1), unit: 'kg CO₂e' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg>', label: 'Total Energi', value: totalEnergy, unit: 'kWh' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet-icon lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>', label: 'Total Pemakaian Air', value: totalWater, unit: 'L' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-recycle-icon lucide-recycle"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg>', label: 'Total Limbah', value: totalWaste.toFixed(1), unit: 'kg' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-medal-icon lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>', label: 'Rata-rata Skor ESG', value: avgEsg, unit: '/100' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck-icon lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>', label: 'Emisi Terhindar', value: totalEmissionSaved.toFixed(1), unit: 'kg CO₂e' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text-icon lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>', label: 'Dokumen Paperless', value: totalPaperless, unit: 'dokumen' },
];

const kpiGrid = document.getElementById('kpiGrid');
kpiGrid.innerHTML = kpis.map(k => `
  <div class="kpi-card">
    <div class="kpi-icon">${k.icon}</div>
    <div class="kpi-value">${k.value} <small>${k.unit}</small></div>
    <div class="kpi-label">${k.label}</div>
  </div>`).join('');

// ---------- IoT Monitor (simulasi real-time) ----------
const iotBase = { suhu: 28.5, lembap: 68, co2: 415 };
const iotGrid = document.getElementById('iotGrid');
iotGrid.innerHTML = `
  <div class="iot-card"><div class="iot-label"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-sun-icon lucide-thermometer-sun"><path d="M12 2v2"/><path d="M12 8a4 4 0 0 0-1.645 7.647"/><path d="M2 12h2"/><path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="m4.93 4.93 1.41 1.41"/><path d="m6.34 17.66-1.41 1.41"/></svg> Suhu Kandang</div><div class="iot-value" id="iotSuhu">${iotBase.suhu.toFixed(1)} °C</div></div>
  <div class="iot-card"><div class="iot-label"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bubbles-icon lucide-bubbles"><path d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5"/><circle cx="18.5" cy="8.5" r="3.5"/><circle cx="7.5" cy="16.5" r="5.5"/><circle cx="7.5" cy="4.5" r="2.5"/></svg> Kelembapan</div><div class="iot-value" id="iotLembap">${iotBase.lembap} %</div></div>
  <div class="iot-card"><div class="iot-label"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-factory-icon lucide-factory"><path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/></svg> Emisi CO₂</div><div class="iot-value" id="iotCo2">${iotBase.co2} ppm</div></div>
`;
setInterval(() => {
  const d = (v, s) => (v + (Math.random() - 0.5) * s).toFixed(1);
  document.getElementById('iotSuhu').textContent = d(iotBase.suhu, 0.6) + ' °C';
  document.getElementById('iotLembap').textContent = Math.round(iotBase.lembap + (Math.random() - 0.5) * 4) + ' %';
  document.getElementById('iotCo2').textContent = Math.round(iotBase.co2 + (Math.random() - 0.5) * 12) + ' ppm';
}, 2000);

// ---------- 5 Fungsi Portal ----------
const funcs = [
  { num: '1', title: 'Seleksi Pemasok Hijau', desc: 'Verifikasi sertifikasi & praktik ramah lingkungan peternak mitra.', metric: `${verifiedCount}/${products.length} terverifikasi` },
  { num: '2', title: 'Transparansi & Pelacakan', desc: 'Jejak karbon, energi, air, dan limbah dipantau sepanjang rantai pasok.', metric: `${totalCarbon.toFixed(1)} kg CO₂e tercatat` },
  { num: '3', title: 'Kepatuhan Regulasi (ESG)', desc: 'Memastikan regulasi lingkungan lokal & internasional terpenuhi.', metric: `Rata-rata ESG ${avgEsg}` },
  { num: '4', title: 'Kolaborasi Digital', desc: 'Paperless: faktur, kontrak, dan audit secara elektronik.', metric: `${totalPaperless} dokumen digital` },
  { num: '5', title: 'Optimasi Logistik', desc: 'Koordinasi rute efisien menekan emisi gas rumah kaca.', metric: `${totalEmissionSaved.toFixed(1)} kg CO₂e terhindar` },
];
document.getElementById('funcGrid').innerHTML = funcs.map(f => `
  <div class="func-card">
    <div class="func-badge">${f.num}</div>
    <h3>${f.title}</h3>
    <p>${f.desc}</p>
    <div class="func-metric">${f.metric}</div>
  </div>`).join('');

// ---------- 1. Seleksi Pemasok Hijau (tabel) ----------
document.querySelector('#supplierTable tbody').innerHTML = products.map(p => `
  <tr>
    <td><strong>${p.seller}</strong></td>
    <td>${p.location}</td>
    <td>${p.certifications.map(c => `<span class="cert">${c}</span>`).join(' ')}</td>
    <td>
      <div class="esg"><div class="esg-bar"><div class="esg-fill" style="width:${p.esgScore}%"></div></div><span>${p.esgScore}</span></div>
    </td>
    <td><span class="status ${p.verified ? 'ok' : 'warn'}">${p.verified ? '✓ Terverifikasi' : '⚠ Dalam Proses'}</span></td>
  </tr>`).join('');

// ---------- 2. Transparansi & Pelacakan ----------
const maxC = Math.max(...products.map(p => p.carbonFootprint));
const maxE = Math.max(...products.map(p => p.energyUse));
const maxW = Math.max(...products.map(p => p.waterUse));
const maxL = Math.max(...products.map(p => p.waste));
document.getElementById('transparencyList').innerHTML = products.map(p => `
  <div class="trace-row">
    <div class="trace-row-head"><strong>${p.name}</strong> <span class="seller-name">${p.seller}</span></div>
    <div class="bar-line"><span class="bar-tag">Karbon</span><div class="mini-bar"><div class="mini-fill c" style="width:${(p.carbonFootprint / maxC * 100)}%"></div></div><span class="bar-val">${p.carbonFootprint} kg</span></div>
    <div class="bar-line"><span class="bar-tag">Energi</span><div class="mini-bar"><div class="mini-fill e" style="width:${(p.energyUse / maxE * 100)}%"></div></div><span class="bar-val">${p.energyUse} kWh</span></div>
    <div class="bar-line"><span class="bar-tag">Air</span><div class="mini-bar"><div class="mini-fill w" style="width:${(p.waterUse / maxW * 100)}%"></div></div><span class="bar-val">${p.waterUse} L</span></div>
    <div class="bar-line"><span class="bar-tag">Limbah</span><div class="mini-bar"><div class="mini-fill l" style="width:${(p.waste / maxL * 100)}%"></div></div><span class="bar-val">${p.waste} kg</span></div>
  </div>`).join('');

// ---------- 3. Kepatuhan ESG ----------
const certPct = Math.round(products.filter(p => p.certifications.length).length / products.length * 100);
const comp = [
  { label: 'Sertifikasi lingkungan (ISO 14001 / Organik)', pct: certPct },
  { label: 'Audit ESG digital terselesaikan', pct: Math.round(verifiedCount / products.length * 100) },
  { label: 'Pelaporan emisi (Scope 1 & 2)', pct: 100 },
  { label: 'Kepatuhan regulasi lokal (PP 98/2021)', pct: Math.round(verifiedCount / products.length * 100) },
];
document.getElementById('complianceBox').innerHTML = comp.map(c => `
  <div class="comp-card">
    <div class="comp-top"><span>${c.label}</span><strong>${c.pct}%</strong></div>
    <div class="esg-bar"><div class="esg-fill" style="width:${c.pct}%"></div></div>
  </div>`).join('');

// ---------- 4. Kolaborasi Digital ----------
const faktur = Math.round(totalPaperless * 0.5);
const kontrak = Math.round(totalPaperless * 0.3);
const audit = totalPaperless - faktur - kontrak;
document.getElementById('collabBox').innerHTML = [
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>', label: 'Faktur Digital', val: faktur },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-signature-icon lucide-signature"><path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"/><path d="M3 21h18"/></svg>', label: 'Kontrak Digital', val: kontrak },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text-icon lucide-book-open-text"><path d="M12 5v16"/><path d="M16 13h2"/><path d="M16 9h2"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/><path d="M6 13h2"/><path d="M6 9h2"/></svg>', label: 'Laporan Audit Digital', val: audit },
].map(s => `<div class="stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div></div>`).join('');

// ---------- 5. Optimasi Logistik ----------
const eff = Math.round(totalEmissionSaved / totalDistance * 100);
document.getElementById('logisticsBox').innerHTML = [
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-road-icon lucide-road"><path d="M12 17v4"/><path d="M12 5V3"/><path d="M12 9v3"/><path d="M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z"/></svg>', label: 'Total Jarak Kirim', val: totalDistance + ' km' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>', label: 'Emisi Terhindar', val: totalEmissionSaved.toFixed(1) + ' kg CO₂e' },
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-spline-icon lucide-chart-spline"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/></svg>', label: 'Efisiensi Rute', val: eff + ' g CO₂e/km' },
].map(s => `<div class="stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div></div>`).join('');

// ---------- Traceability ----------
const traceGrid = document.getElementById('traceGrid');
traceGrid.innerHTML = products.map(p => `
  <div class="product-card">
    <div class="product-image">
      <img class="product-img" src="${p.image}" alt="${p.name}" />
      <span class="carbon-badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout-icon lucide-sprout"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg> ${p.carbonFootprint} kg CO₂e</span>
    </div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <span class="seller-name">${p.seller} • ${p.location}</span>
      <button class="trace-btn" data-id="${p.id}">Lihat Jejak Rantai Pasok</button>
    </div>
  </div>`).join('');

const traceModal = document.getElementById('traceModal');
const traceBody = document.getElementById('traceBody');
document.getElementById('traceClose').addEventListener('click', () => (traceModal.style.display = 'none'));
window.addEventListener('click', (e) => { if (e.target === traceModal) traceModal.style.display = 'none'; });

traceGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.trace-btn');
  if (!btn) return;
  const p = products.find(x => x.id == btn.dataset.id);
  if (!p) return;
  traceBody.innerHTML = `
    <h2>${p.name}</h2>
    <p class="seller-name">${p.seller} • ${p.location} • Skor ESG ${p.esgScore}</p>
    <div class="cert-badges">${p.certifications.map(c => `<span class="cert">${c}</span>`).join(' ')}</div>
    <div class="timeline">
      ${p.traceability.map((s, i) => `
        <div class="tl-step">
          <div class="tl-dot">${i + 1}</div>
          <div class="tl-body">
            <h4>${s.stage}</h4>
            <p>${s.note}</p>
            <div class="tl-metrics">
              <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout-icon lucide-sprout"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg> ${s.carbon} kg</span><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg> ${s.energy} kWh</span><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet-icon lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg> ${s.water} L</span><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-recycle-icon lucide-recycle"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg> ${s.waste} kg</span>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
  traceModal.style.display = 'block';
});
