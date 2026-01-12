
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("schemeSearch");
  const cards = document.querySelectorAll(".scheme-card");

  searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
});


