function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
}

document.addEventListener('DOMContentLoaded', () => {
  const orderSummary = document.getElementById('orderSummary');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let total = 0;

  if (cart.length === 0) {
    orderSummary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let quantity = 1;
  cart.forEach(product => {
    const subtotal = parsePrice(product.price) * quantity;
    total += subtotal;

    const item = document.createElement('div');
    item.className = 'order-item';
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="order-item-details">
        <strong>${product.name}</strong><br>
        <small>Rp ${product.price.toLocaleString('id-ID')} × ${quantity}</small>
      </div>
      <div>
        <strong>Rp ${subtotal.toLocaleString('id-ID')}</strong>
      </div>
    `;
    orderSummary.appendChild(item);
  });

  const totalEl = document.createElement('div');
  totalEl.className = 'order-total';
  totalEl.innerText = `Total: Rp ${total.toLocaleString('id-ID')}`;
  orderSummary.appendChild(totalEl);
});