function appendFooter(){
  const footer = `<div class="footer-container">
        <div class="footer-col">
          <img
            src="./assets/images/eggora-logo.png"
            alt="Eggora logo"
            class="logo"
          />
          <p>
            <strong>Address:</strong><br />
            Jalan Kiranggo Wirosantiko No 999<br />
            Kelurahan 30 Ilir <br />
            Kecamatan Ilir Barat 2, <br />
            Palembang 30255
          </p>
          <a href="#" class="direction-link">Get direction ↗</a>
        </div>

        <div class="footer-col">
          <h4>Customer Support</h4>
          <p>Email: <a href="mailto:info@ Eggora.id">info@Eggora.id</a></p>
          <p>
            Phone:<br />
            <a href="tel:+628112652151">+628112652151</a><br />
            <a href="tel:+628112952151">+628112952151</a>
          </p>
        </div>

        <div class="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Subscribe for Email</h4>
          <p>
            Subscribe to get first dibs on new arrivals, sales, exclusive
            content, events and more!
          </p>
          <form class="email-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

        <div class="footer-bottom">
          <p>© 2025 Eggora • Ekosistem Rantai Pasok Pangan Lokal Berkelanjutan</p>
      </div>
      `
    $('footer').append(footer)
}

appendFooter()