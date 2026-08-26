// Buka/tutup sidebar
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.querySelector(".close-cart");
const cartItemsContainer = document.getElementById("cartItems");

// Tampilkan isi cart dari localStorage
function renderCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cartItemsContainer.innerHTML = cartItems
        .map(
            (item, index) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <img src="${item.img}" alt="${item.name}" />
          <div>
            <p>${item.name}</p>
            <p>${item.price}</p>
          </div>
        </div>
        <div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `
        )
        .join("");
}

// Hapus item dari localStorage
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
}

// Tutup sidebar
closeCart.onclick = () => {
    cartSidebar.classList.remove("open");
};

// Load isi cart saat halaman dimuat
window.onload = renderCart;


document.getElementById('checkoutBtn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});

// Buka Cart (event delegation karena navbar dirender dinamis oleh navbar.js)
document.addEventListener("click", (e) => {
  if (e.target.closest("#openCartBtn")) {
    cartSidebar.classList.add("open");
  }
});