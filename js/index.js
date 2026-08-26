// Visibility
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const closeBtn = document.querySelector(".close");

document.addEventListener("click", function (event) {
  if (event.target.closest(".visibility-btn")) {
    const btn = event.target.closest(".visibility-btn");
    const productCard = btn.closest(".product-card");
    const img = productCard.querySelector(".product-img");

    if (img) {
      modal.style.display = "block";
      modalImg.src = img.src;
    }
  }
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Add Favorite
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".favorite-btn");
  if (!btn) return;

  const name = btn.dataset.name;
  const price = btn.dataset.price;
  const img = btn.dataset.img;

  const product = { name, price, img };

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some(p => p.name === name);
  if (!exists) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Ditambahkan ke Favorit!");
  } else {
    alert("Sudah ada di Favorit.");
  }
});

// Add to Cart
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const name = btn.dataset.name;
  const price = btn.dataset.price;
  const img = btn.dataset.img;

  const newItem = { name, price, img };

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  renderCart();
  cartSidebar.classList.add("open");
});