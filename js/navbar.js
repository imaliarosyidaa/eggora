function appendNavbar(){
    const nav = `
      <div class="navbar-container">
        <button id="menuBtn" class="openSidebarBtn hamburger-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
        <a href="index.html"
          ><img src="./assets/images/eggora-logo.png" alt="logo Eggora" class="logo"
        /></a>
        <ul class="navbar-menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="navbar-icons">
          <a class="col" href="favorit.html"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></a>
          <a id="openCartBtn" class="col"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></a>
                  <div style="display: flex; gap: 12px;">
        <a href="dashboard.html" class="button-link-outline-navbar">Masuk</a>
                  <a href="products.html" class="button-link-navbar">Daftar</a>
      </div>
        </div>
      </div>
    `
    const target = document.querySelector('.custom-navbar');
    if (target) target.innerHTML = nav;
}

appendNavbar()