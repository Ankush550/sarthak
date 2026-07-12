// SarthakYojana.in — answerkey-data.js
// PDF files save karein: assets/notifications/<id>-answerkey.pdf

const ANSWER_KEYS_DATA = [
  
  
  {
    id:"uptet-answer-key-2026",
    title:"UPESSC UPTET 2026 Answer Key",
    organization:"Uttar Pradesh Education Service Selection Commission (UPESSC)",
    examName:"Uttar Pradesh Teacher Eligibility Test (UPTET) 2026",
    postType:"Answer Key",
    examDate:"02-04 July 2026",
    releaseDate:"2026-07-08",
    releaseDateDisplay:"08 July 2026",
    officialWebsite:"https://upessc.up.gov.in",
    answerKeyLink:"https://upessc.up.gov.in",
    category:"Answer Key",
    isNew:true,
    description:"Uttar Pradesh Education Service Selection Commission (UPESSC) has released the Answer Key for Uttar Pradesh Teacher Eligibility Test (UPTET) 2026. Candidates who appeared for the exam can download the answer key from the official website."
},

{
    id:"hpsc-ada-answer-key-2026",
    title:"HPSC ADA Answer Key 2026",
    organization:"Haryana Public Service Commission (HPSC)",
    postName:"Assistant District Attorney (ADA)",
    advertisementNo:"18/2025",
    postType:"Answer Key",
    examDate:"05 July 2026",
    totalPosts:255,
    releaseDate:"2026-07-08",
    releaseDateDisplay:"08 July 2026",
    officialWebsite:"https://hpsc.gov.in",
    answerKeyLink:"https://hpsc.gov.in",
    category:"Answer Key",
    isNew:true,
    description:"Haryana Public Service Commission (HPSC) has released the Answer Key for Assistant District Attorney (ADA) posts (Advt. No. 18/2025). Candidates who appeared for the Screening Test can download the answer key from the official website."
},

{
    id:"bpsc-stenographer-answer-key-2026",
    title:"BPSC Stenographer Answer Key 2026",
    organization:"Bihar Public Service Commission (BPSC)",
    postName:"Stenographer",
    postType:"Answer Key",
    examDate:"11 June 2026",
    totalPosts:15,
    releaseDate:"2026-07-08",
    releaseDateDisplay:"08 July 2026",
    officialWebsite:"https://bpsc.bih.nic.in",
    answerKeyLink:"https://bpsc.bih.nic.in",
    category:"Answer Key",
    isNew:true,
    description:"Bihar Public Service Commission (BPSC) has released the Answer Key for Stenographer posts. Candidates who appeared for the exam on 11 June 2026 can download the answer key and raise objections from the official website."
},

{
    id:"bpsc-aes-answer-key-2026",
    title:"BPSC AES Assistant Environmental Scientist Answer Key 2026",
    organization:"Bihar Public Service Commission (BPSC)",
    postName:"Assistant Environmental Scientist",
    postType:"Answer Key",
    examDate:"11 June 2026",
    totalPosts:17,
    releaseDate:"2026-07-07",
    releaseDateDisplay:"07 July 2026",
    officialWebsite:"https://bpsc.bih.nic.in",
    answerKeyLink:"https://bpsc.bih.nic.in",
    category:"Answer Key",
    isNew:true,
    description:"Bihar Public Service Commission (BPSC) has released the Answer Key for Assistant Environmental Scientist posts, covering General Studies, Physics, Chemistry, Life Science and Environmental Science papers. Candidates who appeared for the exam on 11 June 2026 can download the answer key from the official website."
},
  {
    id: "mpsc-group-b-prelims-final-answer-key-2026",
    title: "MPSC Group B Prelims Final Answer Key 2026",
    shortTitle: "MPSC Group B Answer Key 2026",
    organization: "Maharashtra Public Service Commission (MPSC)",
    examName: "Maharashtra Group B Non-Gazetted Services Combined Preliminary Examination 2026",
    category: "Answer Key",
    answerKeyReleaseDate: "28 June 2026",
    objectionWindow: "Open",
    resultDate: "July 2026 (Expected)",
    downloadMode: "Online",
    officialWebsite: "https://mpsc.gov.in",
    answerKeyLink: "https://mpsc.gov.in",
    notificationPdf: "https://mpsc.gov.in",
    image: "MPSC.jpeg",
    featured: true,
    isNew: true,

    status: "Released",

    loginDetails: [
        "Registration Number",
        "Password / Date of Birth"
    ],

    tags: [
        "MPSC Group B Prelims Final Answer Key 2026",
        "MPSC Group B Answer Key 2026",
        "MPSC Group B Response Sheet",
        "MPSC Group B Final Answer Key PDF",
        "MPSC STI Answer Key 2026",
        "MPSC ASO Answer Key 2026",
        "MPSC PSI Answer Key 2026",
        "MPSC Objection Link",
        "MPSC Group B Exam 2026",
        "MPSC Answer Key Download"
    ],

    description: "MPSC has released the Group B Prelims Final Answer Key 2026 on 28 June 2026. Candidates can download the official answer key PDF, response sheet, calculate their expected score and raise objections through the official website."
},

  {
    id: "rrb-ntpc-ug-answer-key-2026",
    title: "RRB NTPC Undergraduate Answer Key 2026 Out – CEN 07/2025 CBT 1",
    organization: "Railway Recruitment Board (RRB)",
    image: "RRBNTPC.jpeg",
    examDate: "7 May – 20 June 2026",
    answerKeyDate: "27 June 2026",
    objectionLastDate: "5 July 2026",
    totalPosts: 3058,
    category: "Answer Key",
    officialLink: "https://rrb.digialm.com",
    status: "released",
    isNew: true
  },

];
// ---- Node.js compatibility (automation scripts ke liye) ----
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ANSWER_KEYS_DATA: typeof ANSWER_KEYS_DATA !== 'undefined' ? ANSWER_KEYS_DATA : []
  };
}