document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favorites-container");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    container.innerHTML = "";
    if (favorites.length === 0) {
      container.innerHTML = "<p>Belum ada produk favorit.</p>";
      return;
    }

    favorites.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
          <div class="product-image">
            <img
              class="product-img"
              src="${product.img}"
              alt="${product.name}"
            />
            <div class="icons">
              <span class="material-icons add-to-cart"
              data-name="${product.name}"
                data-price="${product.price}"
                data-img="${product.img}"
              "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9aa4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
              <span
                class="material-icons favorite-btn"
              data-name="${product.name}"
                data-price="${product.price}"
                data-img="${product.img}"
                ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span
              >
              <span class="material-icons visibility-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg></span>
            </div>
          </div>
          <div class="product-info">
            <p>${product.name}</p>
            <strong>Rp ${product.price}</strong>
          </div>
          <div style="display:flex;justify-content: center; margin: 12px 0;">
        <button class="remove-btn" data-index="${index}">Hapus</button>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        favorites.splice(index, 1); // Hapus dari array
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Update storage
        renderFavorites(); // Re-render
      });
    });
  }

  renderFavorites();
});