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
{label:"SSC CGL Syllabus 2026",href:"#",isNew:true},
{label:"UPSC IAS Syllabus 2026",href:"#",isNew:true},
{label:"RRB NTPC Syllabus 2026",href:"#"},
{label:"IBPS PO Syllabus 2026",href:"#"},
{label:"UP Police Syllabus 2026",href:"#"},
{label:"CTET Syllabus 2026",href:"#"}
],"#")

+

secBox("📝 Previous Papers",[
{label:"SSC CGL Previous Year Papers",href:"#",isNew:true},
{label:"UPSC Previous Year Papers",href:"#",isNew:true},
{label:"RRB NTPC Old Papers",href:"#"},
{label:"IBPS Clerk Previous Papers",href:"#"},
{label:"UP Police Previous Papers",href:"#"},
{label:"Delhi Police Old Papers",href:"#"}
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
{label:"SSC Exam Calendar 2026",href:"#",isNew:true},
{label:"UPSC Exam Schedule 2026",href:"#",isNew:true},
{label:"RRB Exam Dates 2026",href:"#"},
{label:"IBPS Exam Calendar 2026",href:"#"},
{label:"State PSC Exam Dates 2026",href:"#"},
{label:"Defence Exam Schedule 2026",href:"#"}
],"#");


// ===============================
// ROW 3
// ===============================

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

secBox("💰 Scholarship",[
{label:"PM Scholarship 2026",href:"#",isNew:true},
{label:"NSP National Scholarship 2026",href:"#",isNew:true},
{label:"UP Scholarship 2026",href:"#"},
{label:"Bihar Scholarship 2026",href:"#"},
{label:"OBC Scholarship 2026",href:"#"},
{label:"SC/ST Scholarship 2026",href:"#"}
],"#")

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
