function parsePrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  return parseInt(String(priceStr).replace(/[^0-9]/g, ""), 10) || 0;
}

const PAYMENT_METHODS = [
  { id: "gopay", name: "GoPay", account: "0858-1234-5678", type: "E-Wallet" },
  { id: "bri", name: "BRI", account: "1234 5678 9012 3456", type: "Bank Transfer" },
  { id: "dana", name: "DANA", account: "0812-3456-7890", type: "E-Wallet" },
  { id: "ovo", name: "OVO", account: "0813-9876-5432", type: "E-Wallet" },
  { id: "seabank", name: "SeaBank", account: "9012 3456 7890 1234", type: "Bank Transfer" },
  { id: "jago", name: "Jago", account: "2001 2345 6789 0123", type: "Bank Transfer" },
];

function generateOrderId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `EGG-${new Date().getFullYear()}-${rand}`;
}

function generateInvoice() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `INV/EGG/${d.getFullYear()}/${pad(d.getMonth() + 1)}${pad(d.getDate())}/${rand}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("orderSummary");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const methodsContainer = document.getElementById("paymentMethods");
  const instruction = document.getElementById("paymentInstruction");
  const uploadProof = document.getElementById("uploadProof");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const confirmPayBtn = document.getElementById("confirmPayBtn");
  const orderStatus = document.getElementById("orderStatus");
  const proofInput = document.getElementById("proofInput");
  const proofPreview = document.getElementById("proofPreview");

  let selectedMethod = null;
  let currentOrder = null;
  let proofDataUrl = null;

  // Render payment method options
  methodsContainer.innerHTML = PAYMENT_METHODS.map(
    (m) => `
    <label class="payment-method">
      <input type="radio" name="paymentMethod" value="${m.id}" />
      <span class="pm-name">${m.name}</span>
      <span class="pm-type">${m.type}</span>
    </label>
  `
  ).join("");

  methodsContainer
    .querySelectorAll('input[name="paymentMethod"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        selectedMethod = PAYMENT_METHODS.find((m) => m.id === input.value);
        methodsContainer
          .querySelectorAll(".payment-method")
          .forEach((l) => l.classList.remove("selected"));
        input.closest(".payment-method").classList.add("selected");
        placeOrderBtn.disabled = false;
        orderStatus.textContent = "";
      });
    });

  // Render order summary
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty.</p>";
    placeOrderBtn.disabled = true;
  } else {
    let total = 0;
    orderSummary.innerHTML = "";
    cart.forEach((product) => {
      const qty = product.qty || 1;
      const priceNum = parsePrice(product.price);
      const subtotal = priceNum * qty;
      total += subtotal;
      const item = document.createElement("div");
      item.className = "order-item";
      item.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="order-item-details">
          <strong>${product.name}</strong><br>
          <small>Rp ${priceNum.toLocaleString("id-ID")} × ${qty}</small>
        </div>
        <div>
          <strong>Rp ${subtotal.toLocaleString("id-ID")}</strong>
        </div>
      `;
      orderSummary.appendChild(item);
    });
    const totalEl = document.createElement("div");
    totalEl.className = "order-total";
    totalEl.innerText = `Total: Rp ${total.toLocaleString("id-ID")}`;
    orderSummary.appendChild(totalEl);
  }

  // Place order
  placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      orderStatus.textContent = "Keranjang kosong.";
      return;
    }
    if (!selectedMethod) {
      orderStatus.textContent = "Pilih metode pembayaran terlebih dahulu.";
      return;
    }

    const required = ["name", "address", "city", "province", "postcode", "phone", "email"];
    for (const id of required) {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        orderStatus.textContent = "Lengkapi semua data pengiriman yang wajib diisi.";
        if (el) el.focus();
        return;
      }
    }

    const total = cart.reduce((s, p) => s + parsePrice(p.price) * (p.qty || 1), 0);
    const orderId = generateOrderId();
    const invoice = generateInvoice();
    currentOrder = {
      id: orderId,
      invoice,
      date: new Date().toISOString(),
      method: selectedMethod.name,
      account: selectedMethod.account,
      total,
      items: cart.map((p) => ({
        name: p.name,
        price: parsePrice(p.price),
        qty: p.qty || 1,
        img: p.img,
      })),
      customer: {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        province: document.getElementById("province").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
      },
      status: "Menunggu Verifikasi",
      proof: null,
    };

    document.getElementById("pmMethod").textContent =
      selectedMethod.name + " (" + selectedMethod.type + ")";
    document.getElementById("pmAccount").textContent = selectedMethod.account;
    document.getElementById("pmAmount").textContent =
      "Rp " + total.toLocaleString("id-ID");
    document.getElementById("pmOrderId").textContent = orderId;
    instruction.hidden = false;
    uploadProof.hidden = false;
    placeOrderBtn.hidden = true;
    confirmPayBtn.hidden = false;
    instruction.scrollIntoView({ behavior: "smooth", block: "center" });
    orderStatus.textContent = "Pesanan dibuat. Silakan transfer lalu upload bukti.";
  });

  // Proof upload preview
  proofInput.addEventListener("change", () => {
    const file = proofInput.files && proofInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      proofDataUrl = e.target.result;
      proofPreview.src = proofDataUrl;
      proofPreview.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  // Confirm payment
  confirmPayBtn.addEventListener("click", () => {
    if (!currentOrder) return;
    if (!proofDataUrl) {
      orderStatus.textContent = "Upload bukti transfer terlebih dahulu.";
      return;
    }
    currentOrder.proof = proofDataUrl;
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    history.unshift(currentOrder);
    localStorage.setItem("purchaseHistory", JSON.stringify(history));
    localStorage.removeItem("cart");
    orderStatus.innerHTML =
      "Pembayaran berhasil dikonfirmasi. Pesanan akan diverifikasi. " +
      '<a href="history.html">Lihat Riwayat Pembelian</a>';
    confirmPayBtn.disabled = true;
    uploadProof.hidden = true;
  });
});
