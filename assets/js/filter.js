<<<<<<< HEAD
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
=======
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
>>>>>>> 4d8a51be720f701d9be302a54bef6a6c5dc729a0
