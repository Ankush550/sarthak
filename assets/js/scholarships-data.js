// ===============================
// SarthakYojana.in – Scholarships Data (Basic Info)
// assets/js/scholarships-data.js
//
// Pattern mirrors jobs-data.js: only quick-info fields live here.
// Full article content lives separately in scholarship-content.js
// keyed by the same id.
// ===============================

const SCHOLARSHIPS_DATA = [
  {
    id: "vg-gopal-scholarship-2026",
    title: "VG Gopal Scholarship 2026",
    provider: "Tata Steel",
    type: "Corporate",           // Corporate | Central | State | Private Trust
    category: "Education",
    isNew: true,
    amount: "₹7,200 – ₹12,000 Per Year",
    beneficiaries: "Dependent Children of Tata Steel Employees",
    applicationMode: "Offline – Through Company HR / Employee Welfare Office",
    startDate: "June 2026 (Tentative)",
    lastDate: "End of July 2026 (Tentative)",
    shortDescription: "Financial assistance of ₹7,200–₹12,000/year for dependent children of Tata Steel employees pursuing engineering, medical, diploma, UG, PG or other professional courses.",
    image: "VG-Gopal.jpeg",
    officialLink: "https://www.tatasteel.com/", // TODO: replace with exact official scholarship/HR page link
    applyLink: ""  // leave blank if application is offline-only through HR
  },
  {
    id: "nsp-pre-matric-scholarship-2026",
    title: "NSP Pre Matric Scholarship 2026",
    provider: "Ministry of Labour & Employment, Government of India",
    type: "Central",
    category: "Education",
    isNew: true,
    amount: "₹1,000 – ₹2,000 Per Year",
    beneficiaries: "Children of Registered Beedi/Cine/IOMC/LSDM Workers (Class 1–10)",
    applicationMode: "Online via National Scholarship Portal (NSP)",
    startDate: "01 June 2026",
    lastDate: "31 August 2026",
    shortDescription: "Annual financial assistance of ₹1,000–₹2,000 for children of registered Beedi, Cine, Iron Ore/Manganese/Chrome (IOMC) and Limestone/Dolomite (LSDM) workers, studying in Class 1 to 10, to reduce dropout rates and support continued education.",
    image: "",
    officialLink: "https://scholarships.gov.in/",
    applyLink: "https://scholarships.gov.in/"
  },
  {
    id: "prabal-kanya-scholarship-2026",
    title: "Prabal Kanya Scholarship 2026",
    provider: "TREE Initiatives Society (Shiksha Setu Initiative)",
    type: "Private Trust",
    category: "Education",
    isNew: true,
    amount: "Up to ₹10,000 (Annual Fund: ₹70,000)",
    beneficiaries: "Meritorious Girl Toppers, JLTRC Inter College, Kalwari (UP), Class 6–12",
    applicationMode: "As per organization guidelines",
    startDate: "June 2026 (Announcement)",
    lastDate: "To Be Announced",
    shortDescription: "A private scholarship run by TREE Initiatives Society that rewards the top-ranking girl student of each class (6 to 12) at JLTRC Inter College, Kalwari, Uttar Pradesh, with up to ₹10,000 to support continued education.",
    image: "",
    officialLink: "https://www.treeinitiatives.org/scholarships",
    applyLink: ""
  }
];
