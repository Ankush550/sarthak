const statesBox = document.getElementById("states");
const schemesBox = document.getElementById("schemes");
const detailsBox = document.getElementById("schemeDetails");

let currentSchemeId = null;

/* =====================
   LOAD STATES
===================== */

fetch("../assets/data/state-schemes.json")
  .then(res => res.json())
  .then(data => loadStates(data))
  .catch(err => console.error("JSON Load Error:", err));

function loadStates(data) {
  statesBox.innerHTML = "";

  Object.keys(data).forEach(state => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = `${state} Schemes`;
    card.onclick = () => loadSchemes(state, data[state]);
    statesBox.appendChild(card);
  });
}

/* =====================
   LOAD SCHEMES
===================== */

function loadSchemes(state, schemes) {
  schemesBox.innerHTML = "";
  detailsBox.innerHTML = "";
  detailsBox.style.display = "none";

  schemes.forEach(scheme => {
    const card = document.createElement("div");
    card.className = "card scheme-card";
    card.innerHTML = `
      <h3>${scheme.title}</h3>
      <p>${scheme.department}</p>
    `;
    card.onclick = () => showDetails(scheme);
    schemesBox.appendChild(card);
  });
}

/* =====================
   SHOW SCHEME DETAILS
===================== */

function showDetails(scheme) {
  currentSchemeId = scheme.id;

  detailsBox.innerHTML = `
    <h2>${scheme.title}</h2>
    <p><b>Department:</b> ${scheme.department}</p>

    <h4>Benefits</h4>
    <ul>${scheme.benefits.map(b => `<li>${b}</li>`).join("")}</ul>

    <h4>Eligibility</h4>
    <ul>${scheme.eligibility.map(e => `<li>${e}</li>`).join("")}</ul>

    ${scheme.applicationProcess ? `
      <h4>Application Process</h4>
      <ul>${scheme.applicationProcess.map(s => `<li>${s}</li>`).join("")}</ul>
    ` : ""}

    ${scheme.documentsRequired ? `
      <h4>Documents Required</h4>
      <ul>${scheme.documentsRequired.map(d => `<li>${d}</li>`).join("")}</ul>
    ` : ""}

    ${scheme.faqs ? `
      <h4>Frequently Asked Questions (FAQs)</h4>
      <div class="faq-box">
        ${scheme.faqs.map((faq, i) => `
          <div class="faq-item">
            <div class="faq-question" onclick="toggleFaq(${i})">
              ${faq.q}
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer" id="faq-${i}">
              ${faq.a}
            </div>
          </div>
        `).join("")}
      </div>
    ` : ""}

    <a href="${scheme.apply}" target="_blank" class="apply-btn">
      Apply Officially
    </a>
  `;

  detailsBox.style.display = "block";

  // show comments
  document.getElementById("commentsSection").style.display = "block"; 
 document.getElementById("commentNote").style.display = "block";

  loadComments();
}

/* =====================
   FAQ TOGGLE
===================== */

function toggleFaq(index) {
  const answer = document.getElementById(`faq-${index}`);
  const isOpen = answer.style.display === "block";

  document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
  document.querySelectorAll(".faq-icon").forEach(i => i.innerText = "+");

  if (!isOpen) {
    answer.style.display = "block";
    answer.previousElementSibling.querySelector(".faq-icon").innerText = "−";
  }
}

/* =====================
   COMMENTS SYSTEM
===================== */

function addComment() {
  const name = document.getElementById("userName").value.trim();
  const text = document.getElementById("userComment").value.trim();

  if (!name || !text) {
    alert("Please fill name and comment");
    return;
  }

  const comments = JSON.parse(localStorage.getItem(currentSchemeId)) || [];
  comments.push({ name, text, replies: [] });

  localStorage.setItem(currentSchemeId, JSON.stringify(comments));

  document.getElementById("userName").value = "";
  document.getElementById("userComment").value = "";

  loadComments();
}

function loadComments() {
  const commentsList = document.getElementById("commentsList");
  const comments = JSON.parse(localStorage.getItem(currentSchemeId)) || [];

  commentsList.innerHTML = "";

  comments.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
  <div class="comment-header">
    <div class="name">${c.name}</div>
    <button class="delete-btn" onclick="deleteComment(${i})">Delete</button>
  </div>

  <div class="text">${c.text}</div>

  <div class="reply-btn" onclick="showReply(${i})">Reply</div>
  <div class="reply-box" id="reply-${i}"></div>
`;


    commentsList.appendChild(div);
  });
}

function showReply(index) {
  const box = document.getElementById(`reply-${index}`);
  box.innerHTML = `
    <input type="text" placeholder="Write reply..." />
    <button onclick="saveReply(${index}, this)">Reply</button>
  `;
}

function saveReply(index, btn) {
  const input = btn.previousElementSibling;
  const text = input.value.trim();
  if (!text) return;

  const comments = JSON.parse(localStorage.getItem(currentSchemeId));
  comments[index].replies.push(text);

  localStorage.setItem(currentSchemeId, JSON.stringify(comments));
  loadComments();
}

const ADMIN_PASSWORD = "admin123";

function deleteComment(index) {
  const pass = prompt("Enter admin password:");
  if (pass !== ADMIN_PASSWORD) {
    alert("Unauthorized");
    return;
  }

  const comments = JSON.parse(localStorage.getItem(currentSchemeId)) || [];
  comments.splice(index, 1);
  localStorage.setItem(currentSchemeId, JSON.stringify(comments));
  loadComments();
}
