document.addEventListener("DOMContentLoaded", function () {

  const headerHTML = `
    <header class="main-header">
      <div class="container header-flex">
        <div class="logo">
          <a href="../index.html">Sarthak Portal</a>
        </div>
        <nav>
          <a href="../index.html">Home</a>
          <a href="jobs.html">Jobs</a>
          <a href="#">Results</a>
          <a href="#">Finance</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

});