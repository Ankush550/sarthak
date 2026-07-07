// ===============================
// SarthakYojana.in Homepage
// assets/js/home.js
// ===============================

// Header & Footer
renderHeader('Home');
renderTicker();
renderFooter();
renderCookieConsent();

const R = "./";

// ===============================
// Quick Links
// ===============================

const qColors = [
  'ql-red','ql-green','ql-purple','ql-navy',
  'ql-teal','ql-orange','ql-olive','ql-maroon',
  'ql-pink','ql-darkblue','ql-brown','ql-darkgreen'
];

document.getElementById("quickGrid").innerHTML =
(JOBS_DATA || []).slice(0,12).map((j,i)=>`
<a href="./pages/job-detail.html?id=${j.id}" class="qlink ${qColors[i]}">
${j.title}
</a>
`).join("");


// ===============================
// ROW 1
// ===============================

document.getElementById("row1").innerHTML =

secBox(
"Results",
(RESULTS_DATA || []).map(r=>({
  label:r.title,
  href:R+"pages/item-detail.html?type=result&id="+r.id,
  isNew:r.isNew
})),
R+"pages/results.html"
)

+

secBox(
"Admit Cards",
(ADMIT_CARDS_DATA || []).map(a=>({
  label:a.title,
  href:R+"pages/admit-card-detail.html?id="+a.id,   // ✅ FIXED
  isNew:a.isNew
})),
R+"pages/results.html#admit"
)

+

secBox(
"Latest Jobs",
(JOBS_DATA || []).map(j=>({
  label:j.title+" — "+(j.totalPosts||j.totalVacancies||"N/A")+" Posts",
  href:R+"pages/job-detail.html?id="+j.id,
  isNew:j.isNew
})),
R+"pages/jobs.html"
)

+

secBox(
"Answer Key",
(ANSWER_KEYS_DATA || []).map(a=>({
  label:a.title,
  href:R+"pages/item-detail.html?type=answer&id="+a.id,
  isNew:a.isNew
})),
R+"pages/results.html#answer"
);


// ===============================
// ROW 2
// ===============================

document.getElementById("row3").innerHTML =

secBox("📋 Syllabus",[


],"#")

+

secBox("📝 Previous Papers",[

],"#")

+

secBox(
"📚 Admit Cards",
(ADMIT_CARDS_DATA || []).map(a=>({
  label:a.title,
  href:R+"pages/admit-card-detail.html?id="+a.id,   // ✅ FIXED
  isNew:a.isNew
})),
R+"pages/results.html#admit"
)

+

secBox("🗓️ Exam Calendar",[

],"#");


// ===============================
// ROW 3
// ===============================

renderLeftSidebar();
renderRightSidebar();

document.getElementById("row4").innerHTML =

secBox(
"🏥 Govt Schemes",
(SCHEMES_DATA || []).map(s=>({
  label:s.title || s.name,
  href:R+"pages/schemes.html#scheme-"+s.id
})),
R+"pages/schemes.html"
)

+

secBox(
"💰 Scholarship",
(SCHOLARSHIPS_DATA || []).map(s=>({
  label:s.title,
  href:R+"pages/scholarship-detail.html?id="+s.id,
  isNew:s.isNew
})),
R+"pages/scholarships.html"
)

+

secBox("🌐 State Jobs",[
{label:"UP Govt Jobs 2026",href:"#",isNew:true},
{label:"Rajasthan Govt Jobs 2026",href:"#",isNew:true},
{label:"Bihar Govt Jobs 2026",href:"#"},
{label:"MP Govt Jobs 2026",href:"#"},
{label:"Haryana Govt Jobs 2026",href:"#"},
{label:"Gujarat Govt Jobs 2026",href:"#"}
],"#")

+

secBox("🏢 PSU Jobs",[
{label:"ONGC Recruitment 2026",href:"#",isNew:true},
{label:"BHEL Recruitment 2026",href:"#",isNew:true},
{label:"NTPC Vacancy 2026",href:"#"},
{label:"SAIL Recruitment 2026",href:"#"},
{label:"GAIL Recruitment 2026",href:"#"},
{label:"HAL Vacancy 2026",href:"#"}
],"#");

// ===============================
// FREE ONLINE TOOLS
// ===============================

const TOOLS_DATA = [
  {title:"Image Resizer", href:R+"tools/image-resizer.html", color:"ql-teal"},
  {title:"JPG to PDF", href:R+"tools/jpg-to-pdf.html", color:"ql-purple"},
  {title:"PDF to JPG", href:R+"tools/pdf-to-jpg.html", color:"ql-orange"},
  {title:"Signature Resizer", href:R+"tools/signature-resizer.html", color:"ql-darkblue"}
];

document.getElementById("toolsGrid").innerHTML =
TOOLS_DATA.map(t=>`
  <a href="${t.href}" class="qlink ${t.color}">${t.title}</a>
`).join("");