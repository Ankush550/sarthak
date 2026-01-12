document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("globalSearch");
  const searchBtn = document.getElementById("searchBtn");

  function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
      alert("Please search something");
      return;
    }

    // simple keyword based redirect
    if (query.includes("awas")) {
      window.location.href = "pages/schemes/pm-awas.html";
    } 
    else if (query.includes("kisan")) {
      window.location.href = "pages/schemes/pm-kisan.html";
    } 
    else if (query.includes("ujjwala")) {
      window.location.href = "pages/schemes/pm-ujjwala.html";
    } 
    else if (query.includes("central")) {
      window.location.href = "pages/central-schemes.html";
    } 
    else if (query.includes("contact")) {
      window.location.href = "pages/contact.html";
    } 
    else {
      alert("Result not found. Please try another keyword.");
    }
  }

  searchBtn.addEventListener("click", handleSearch);

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

});
