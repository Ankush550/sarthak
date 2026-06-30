/*
==========================================================
SarthakYojana Sitemap Generator
Enterprise Edition v2
==========================================================
*/

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DOMAIN = "https://sarthakyojana.in";

const ROOT = __dirname;

const OUTPUT = path.join(ROOT, "sitemaps");

const TODAY = new Date().toISOString().split("T")[0];

if (!fs.existsSync(OUTPUT)) {

    fs.mkdirSync(OUTPUT, {
        recursive: true
    });

}

function loadData(file, variable) {

    const code = fs.readFileSync(

        path.join(ROOT, file),

        "utf8"

    );

    const sandbox = {};

    vm.createContext(sandbox);

    vm.runInContext(

        code +

        `

this.EXPORT=${variable};

`,

        sandbox

    );

    return sandbox.EXPORT || [];

}
const JOBS = loadData(

"assets/js/jobs-data.js",

"JOBS_DATA"

);

const RESULTS = loadData(

"assets/js/result-data.js",

"RESULTS_DATA"

);

const ADMITS = loadData(

"assets/js/admit-card-data.js",

"ADMIT_CARDS_DATA"

);

const ANSWERS = loadData(

"assets/js/answerkey-data.js",

"ANSWER_KEYS_DATA"

);

const SCHEMES = loadData(

"assets/js/schemes-data.js",

"SCHEMES_DATA"

);

console.log("");

console.log("Jobs :",JOBS.length);

console.log("Results :",RESULTS.length);

console.log("Admit :",ADMITS.length);

console.log("Answer :",ANSWERS.length);

console.log("Schemes :",SCHEMES.length);

console.log("");
/* ===========================================================
XML HELPERS
=========================================================== */

function escapeXML(value) {

    if (!value) return "";

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&apos;");

}

function xmlHeader() {

return `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

`;

}

function xmlFooter(){

return`

</urlset>`;

}

/* ===========================================================
URL GENERATOR
=========================================================== */

function createURL(

loc,

priority="0.90",

changefreq="daily",

lastmod=TODAY

){

return`

<url>

<loc>${escapeXML(loc)}</loc>

<lastmod>${lastmod}</lastmod>

<changefreq>${changefreq}</changefreq>

<priority>${priority}</priority>

</url>

`;

}

/* ===========================================================
WRITE FILE
=========================================================== */

function saveXML(

filename,

content

){

const file=

path.join(

OUTPUT,

filename

);

fs.writeFileSync(

file,

content,

"utf8"

);

console.log(

"✔",

filename,

"generated"

);

}

/* ===========================================================
COMMON GENERATOR
=========================================================== */

function generateCollection(

collection,

type,

priority,

freq,

filename

){

let xml=xmlHeader();

collection.forEach(item=>{

if(!item.id)return;

xml+=createURL(

`${DOMAIN}/pages/item-detail.html?type=${type}&id=${encodeURIComponent(item.id)}`,

priority,

freq,

TODAY

);

});

xml+=xmlFooter();

saveXML(

filename,

xml

);

}
/* ===========================================================
GENERATE ALL CATEGORY SITEMAPS
=========================================================== */

function generateJobsSitemap() {

    generateCollection(

        JOBS,

        "job",

        "0.90",

        "daily",

        "sitemap-jobs.xml"

    );

}

function generateResultsSitemap() {

    generateCollection(

        RESULTS,

        "result",

        "0.90",

        "daily",

        "sitemap-results.xml"

    );

}

function generateAdmitCardsSitemap() {

    generateCollection(

        ADMITS,

        "admit",

        "0.85",

        "daily",

        "sitemap-admitcards.xml"

    );

}

function generateAnswerKeysSitemap() {

    generateCollection(

        ANSWERS,

        "answerkey",

        "0.85",

        "daily",

        "sitemap-answerkeys.xml"

    );

}

function generateSchemesSitemap() {

    generateCollection(

        SCHEMES,

        "scheme",

        "0.80",

        "weekly",

        "sitemap-schemes.xml"

    );

}

/* ===========================================================
GENERATE STATIC PAGES
=========================================================== */

function generatePagesSitemap(){

let xml=xmlHeader();

const pages=[

"/",

"/index.html",

"/pages/jobs.html",

"/pages/results.html",

"/pages/admit-cards.html",

"/pages/answer-key.html",

"/pages/schemes.html",

"/pages/about.html",

"/pages/contact.html",

"/pages/privacy-policy.html",

"/pages/disclaimer.html",

"/pages/terms-and-conditions.html",

"/pages/sitemap.html"

];

pages.forEach(page=>{

xml+=createURL(

DOMAIN+page,

page=="/"?"1.00":"0.60",

page=="/"?"daily":"weekly",

TODAY

);

});

xml+=xmlFooter();

saveXML(

"sitemap-pages.xml",

xml

);

}
/* ===========================================================
GENERATE MAIN SITEMAP INDEX
=========================================================== */

function generateSitemapIndex() {

const xml = `<?xml version="1.0" encoding="UTF-8"?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-pages.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-jobs.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-results.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-admitcards.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-answerkeys.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

<sitemap>
<loc>${DOMAIN}/sitemaps/sitemap-schemes.xml</loc>
<lastmod>${TODAY}</lastmod>
</sitemap>

</sitemapindex>`;

fs.writeFileSync(

path.join(ROOT, "sitemap.xml"),

xml,

"utf8"

);

console.log("✔ sitemap.xml generated");

}

/* ===========================================================
MAIN
=========================================================== */

function main() {

console.log("");
console.log("======================================");
console.log(" SarthakYojana Sitemap Generator");
console.log("======================================");
console.log("");

generatePagesSitemap();

generateJobsSitemap();

generateResultsSitemap();

generateAdmitCardsSitemap();

generateAnswerKeysSitemap();

generateSchemesSitemap();

generateSitemapIndex();

console.log("");

console.log("======================================");

console.log("Jobs          :", JOBS.length);

console.log("Results       :", RESULTS.length);

console.log("Admit Cards   :", ADMITS.length);

console.log("Answer Keys   :", ANSWERS.length);

console.log("Schemes       :", SCHEMES.length);

console.log("");

console.log("✔ ALL SITEMAPS GENERATED SUCCESSFULLY");

console.log("");

console.log("Location:");

console.log(path.join(ROOT, "sitemaps"));

console.log("");

console.log("======================================");

}

main();