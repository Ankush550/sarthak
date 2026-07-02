// SarthakYojana.in — schemes-data.js
// Single source of truth for SCHEMES_DATA (moved out of jobs-data.js
// where it was accidentally duplicated, which caused a
// "Identifier 'SCHEMES_DATA' has already been declared" console error
// on any page that loaded both files, e.g. index.html)

const SCHEMES_DATA = [
  {
    id:"pm-kisan", title:"PM Kisan Samman Nidhi Yojana", name:"PM Kisan Samman Nidhi Yojana",
    type:"Central", category:"Agriculture",
    benefit:"Rs. 6,000 per year (3 installments of Rs. 2,000 each)",
    benefits:"Rs. 6,000 per year directly to bank account in three equal installments of Rs. 2,000 each.",
    eligibility:"All landholding farmer families in India whose names appear in land records.",
    howToApply:"Apply online at pmkisan.gov.in or visit nearest CSC centre. Aadhaar and bank account linking is mandatory.",
    officialLink:"https://pmkisan.gov.in",
    applyLink:"https://pmkisan.gov.in",
    description:"PM Kisan Samman Nidhi provides direct income support of Rs. 6,000 per year to small and marginal farmer families. The amount is transferred directly to the farmer's bank account in three equal installments.",
    isNew:false
  },
  {
    id:"pm-awas", title:"PM Awas Yojana – Urban (PMAY-U)", name:"PM Awas Yojana – Urban (PMAY-U)",
    type:"Central", category:"Housing",
    benefit:"Interest subsidy up to Rs. 2.67 Lakh on home loans under CLSS",
    benefits:"Credit Linked Subsidy Scheme (CLSS) provides interest subsidy of 3–6.5% on home loans. EWS/LIG: subsidy up to Rs. 2.67 lakh.",
    eligibility:"EWS (income up to Rs. 3 lakh), LIG (Rs. 3–6 lakh), MIG-I (Rs. 6–12 lakh), MIG-II (Rs. 12–18 lakh) families.",
    howToApply:"Apply at your bank/HFC or visit PMAY portal pmaymis.gov.in. Submit Aadhaar, income certificate, and property documents.",
    officialLink:"https://pmaymis.gov.in",
    applyLink:"https://pmaymis.gov.in",
    description:"PM Awas Yojana Urban aims to provide housing for all in urban areas through interest subsidies on home loans covering EWS, LIG, and MIG households.",
    isNew:false
  },
  {
    id:"sukanya-samriddhi", title:"Sukanya Samriddhi Yojana (SSY)", name:"Sukanya Samriddhi Yojana (SSY)",
    type:"Central", category:"Finance",
    benefit:"8.2% interest per annum (highest among small savings schemes). Tax benefits under Section 80C.",
    benefits:"Current interest rate: 8.2% p.a. Minimum deposit: Rs. 250/year; Maximum: Rs. 1.5 lakh/year.",
    eligibility:"Girl child aged below 10 years. Account opened by parent or legal guardian.",
    howToApply:"Visit any Post Office or authorised bank branch with birth certificate of girl child, ID proof and address proof of guardian.",
    officialLink:"https://www.indiapost.gov.in",
    applyLink:"https://www.indiapost.gov.in",
    description:"Sukanya Samriddhi Yojana is a small savings scheme for the education and marriage expenses of the girl child with highest interest rate among Govt small savings schemes.",
    isNew:false
  },
  {
    id:"ayushman-bharat", title:"Ayushman Bharat PM-JAY", name:"Ayushman Bharat PM-JAY",
    type:"Central", category:"Health",
    benefit:"Rs. 5 lakh health cover per family per year at empanelled hospitals",
    benefits:"Rs. 5 lakh cashless health insurance per family per year. Covers 1,949 medical procedures. Pre-existing conditions covered from day 1.",
    eligibility:"Poor and vulnerable families as identified in SECC 2011 database. Approximately 10.74 crore beneficiary families.",
    howToApply:"Check eligibility at pmjay.gov.in or call helpline 14555. Visit nearest Ayushman Bharat empanelled hospital.",
    officialLink:"https://pmjay.gov.in",
    applyLink:"https://pmjay.gov.in",
    description:"Ayushman Bharat PM Jan Arogya Yojana provides Rs. 5 lakh per family per year for hospitalization at over 25,000 empanelled hospitals across India. Completely cashless and paperless.",
    isNew:false
  },
  {
    id:"pm-mudra", title:"Pradhan Mantri MUDRA Yojana (PMMY)", name:"Pradhan Mantri MUDRA Yojana (PMMY)",
    type:"Central", category:"Business",
    benefit:"Loans up to Rs. 10 lakh for micro/small enterprises without collateral",
    benefits:"Shishu: loans up to Rs. 50,000. Kishore: Rs. 50,001 to Rs. 5 lakh. Tarun: Rs. 5 lakh to Rs. 10 lakh. No collateral required.",
    eligibility:"Non-corporate, non-farm micro and small enterprises including proprietary firms, partnership firms, and companies.",
    howToApply:"Apply at any scheduled commercial bank, MFI, NBFC, or RRB. Carry ID proof, address proof, business plan, and bank statements.",
    officialLink:"https://www.mudra.org.in",
    applyLink:"https://www.mudra.org.in",
    description:"PM MUDRA Yojana provides easy access to institutional credit to micro-entrepreneurs and small business owners with loans up to Rs. 10 lakh.",
    isNew:false
  },
  
];
