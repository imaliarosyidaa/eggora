function parsePrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  return parseInt(String(priceStr).replace(/[^0-9]/g, ""), 10) || 0;
}

function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("historyContainer");
  const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  if (history.length === 0) {
    container.innerHTML =
      '<div class="history-empty"><p>Belum ada pesanan. <a href="products.html">Mulai belanja &rarr;</a></p></div>';
    return;
  }

  container.innerHTML = history
    .map((order) => {
      const items = (order.items || [])
        .map(
          (it) => `
        <div class="history-item">
          <img src="${it.img}" alt="${it.name}" />
          <div class="history-item-info">
            <strong>${it.name}</strong>
            <small>Rp ${parsePrice(it.price).toLocaleString("id-ID")} × ${it.qty}</small>
          </div>
          <strong>Rp ${(
            parsePrice(it.price) * (it.qty || 1)
          ).toLocaleString("id-ID")}</strong>
        </div>`
        )
        .join("");

      const statusClass =
        order.status === "Menunggu Verifikasi" ? "pending" : "done";

      const proof = order.proof
        ? `<div class="history-proof"><span>Bukti Transfer:</span><img src="${order.proof}" alt="Bukti transfer" /></div>`
        : "";

      return `
      <div class="history-card">
        <div class="history-head">
          <div>
            <h3>${order.id}</h3>
            <small>${order.invoice}</small>
          </div>
          <span class="history-status ${statusClass}">${order.status}</span>
        </div>
        <div class="history-meta">
          <span><strong>Tanggal:</strong> ${formatDate(order.date)}</span>
          <span><strong>Metode:</strong> ${order.method}</span>
          <span><strong>No. Akun:</strong> ${order.account}</span>
        </div>
        <div class="history-items">${items}</div>
        <div class="history-total">
          <strong>Total: Rp ${parsePrice(order.total).toLocaleString(
            "id-ID"
          )}</strong>
        </div>
        ${proof}
      </div>`;
    })
    .join("");
});
