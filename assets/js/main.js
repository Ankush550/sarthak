fetch('data/schemes.json')
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById('scheme-list');
    data.forEach(s => {
      box.innerHTML += `
        <div class="scheme-card">
          <img src="${s.image}">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      `;
    });
  });

  