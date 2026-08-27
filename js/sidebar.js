
function appendSideBar() {
  const html =
    `
        <div class="nav-header">
      <span id="closeNav" class="close-nav">&times;</span>
    </div>
    <div class="nav-body">
      <ul class="sidebar-menu">
        <li><a href="index.html">Home</a></li>
        <hr />
        <li><a href="about.html">About</a></li>
        <hr />
        <li><a href="products.html">Products</a></li>
        <hr />
              <li><a href="dashboard.html">Dashboard</a></li>
        <hr />
        <li><a href="contact.html">Contact</a></li>
        <hr />
                <li><a href="favorit.html">Favorit</a></li>
        <hr />
                <hr />
                <li><a href="chatbot.html">Chatbot</a></li>
        <hr />
        <li><a href="history.html">Riwayat Pembelian</a></li>
        <hr />
        <li><a href="checkout.html">Keranjang</a></li>
        <hr />
      </ul>
    </div>
    `
  $('#navSidebar').append(html)
}

appendSideBar()

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navSidebar = document.getElementById("navSidebar");
  const closeNav = document.getElementById("closeNav");

  menuBtn.addEventListener("click", () => {
    navSidebar.classList.add("open");
  });

  closeNav.addEventListener("click", () => {
    navSidebar.classList.remove("open");
  });
});