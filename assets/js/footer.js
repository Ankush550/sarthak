document.addEventListener("DOMContentLoaded", function () {

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        <a href="../pages/about.html">About Us</a> |
        <a href="../pages/privacy-policy.html">Privacy Policy</a> |
        <a href="../pages/contact.html">Contact</a> |
        <a href="../pages/disclaimer.html">Disclaimer</a>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);

});