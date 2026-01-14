fetch("../assets/data/documents.json")
.then(r=>r.json())
.then(data=>{
  const grid=document.getElementById("docGrid");
  data.forEach(d=>{
    grid.innerHTML+=`
      <a class="card" href="document-detail.html?id=${d.id}">
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
      </a>`;
  });
});
