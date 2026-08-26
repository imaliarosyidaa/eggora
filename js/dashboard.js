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
  { icon: '🌱', label: 'Total Jejak Karbon', value: totalCarbon.toFixed(1), unit: 'kg CO₂e' },
  { icon: '⚡', label: 'Total Energi', value: totalEnergy, unit: 'kWh' },
  { icon: '💧', label: 'Total Pemakaian Air', value: totalWater, unit: 'L' },
  { icon: '♻️', label: 'Total Limbah', value: totalWaste.toFixed(1), unit: 'kg' },
  { icon: '🏅', label: 'Rata-rata Skor ESG', value: avgEsg, unit: '/100' },
  { icon: '🚚', label: 'Emisi Terhindar', value: totalEmissionSaved.toFixed(1), unit: 'kg CO₂e' },
  { icon: '📄', label: 'Dokumen Paperless', value: totalPaperless, unit: 'dokumen' },
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
  <div class="iot-card"><div class="iot-label">🌡️ Suhu Kandang</div><div class="iot-value" id="iotSuhu">${iotBase.suhu.toFixed(1)} °C</div></div>
  <div class="iot-card"><div class="iot-label">💧 Kelembapan</div><div class="iot-value" id="iotLembap">${iotBase.lembap} %</div></div>
  <div class="iot-card"><div class="iot-label">🏭 Emisi CO₂</div><div class="iot-value" id="iotCo2">${iotBase.co2} ppm</div></div>
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
    <div class="bar-line"><span class="bar-tag">Karbon</span><div class="mini-bar"><div class="mini-fill c" style="width:${(p.carbonFootprint/maxC*100)}%"></div></div><span class="bar-val">${p.carbonFootprint} kg</span></div>
    <div class="bar-line"><span class="bar-tag">Energi</span><div class="mini-bar"><div class="mini-fill e" style="width:${(p.energyUse/maxE*100)}%"></div></div><span class="bar-val">${p.energyUse} kWh</span></div>
    <div class="bar-line"><span class="bar-tag">Air</span><div class="mini-bar"><div class="mini-fill w" style="width:${(p.waterUse/maxW*100)}%"></div></div><span class="bar-val">${p.waterUse} L</span></div>
    <div class="bar-line"><span class="bar-tag">Limbah</span><div class="mini-bar"><div class="mini-fill l" style="width:${(p.waste/maxL*100)}%"></div></div><span class="bar-val">${p.waste} kg</span></div>
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
  { icon: '🧾', label: 'Faktur Digital', val: faktur },
  { icon: '📝', label: 'Kontrak Digital', val: kontrak },
  { icon: '📑', label: 'Laporan Audit Digital', val: audit },
].map(s => `<div class="stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div></div>`).join('');

// ---------- 5. Optimasi Logistik ----------
const eff = Math.round(totalEmissionSaved / totalDistance * 100);
document.getElementById('logisticsBox').innerHTML = [
  { icon: '🛣️', label: 'Total Jarak Kirim', val: totalDistance + ' km' },
  { icon: '🌍', label: 'Emisi Terhindar', val: totalEmissionSaved.toFixed(1) + ' kg CO₂e' },
  { icon: '📈', label: 'Efisiensi Rute', val: eff + ' g CO₂e/km' },
].map(s => `<div class="stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-val">${s.val}</div><div class="stat-label">${s.label}</div></div>`).join('');

// ---------- Traceability ----------
const traceGrid = document.getElementById('traceGrid');
traceGrid.innerHTML = products.map(p => `
  <div class="product-card">
    <div class="product-image">
      <img class="product-img" src="${p.image}" alt="${p.name}" />
      <span class="carbon-badge">🌱 ${p.carbonFootprint} kg CO₂e</span>
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
              <span>🌱 ${s.carbon} kg</span><span>⚡ ${s.energy} kWh</span><span>💧 ${s.water} L</span><span>♻️ ${s.waste} kg</span>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
  traceModal.style.display = 'block';
});
