// ============================================================
// submit-to-google.js
//
// Google ki official "Indexing API" ko call karti hai — jo
// khaas taur par JobPosting schema wale pages (jaise humari
// job-detail.html) ke liye bani hai. Isse Google ko turant
// pata chal jaata hai "ye naya/updated job page hai, jaldi
// crawl karo" — normal crawling se kaafi tez.
//
// Do tarah se chalayi ja sakti hai:
//
// 1) Manually, ek specific job ke liye:
//      node submit-to-google.js iocl-apprentice-recruitment-2026
//
// 2) Bina kisi argument ke — auto mode, jo khud dhoondh legi
//    ki kaun si Jobs abhi tak Google ko submit NAHI hui hain:
//      node submit-to-google.js
//
// Requirement:
//   npm install google-auth-library
//   google-service-account.json isi folder me honi chahiye
//   (jo Google Cloud se download ki thi)
//
// Daily Quota: 200 URLs/day (free, bina approval ke)
// ============================================================

const fs = require("fs");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");

const KEY_FILE = path.join(__dirname, "google-service-account.json");
const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

const WEBSITE_BASE_URL = "https://sarthakyojana.in/pages/job-detail.html?id=";

// ---- Check ki service account key maujood hai ----
if (!fs.existsSync(KEY_FILE)) {
  console.error("\n❌ google-service-account.json nahi mili.");
  console.error("   Google Cloud se download ki hui JSON key is folder me");
  console.error("   'google-service-account.json' naam se rakhein.\n");
  process.exit(1);
}

// ---- jobs-data.js load karo ----
const { JOBS_DATA, getJobById } = require("./jobs-data.js");

// ---- Tracker — kaun si jobs already Google ko submit ho chuki hain ----
const TRACKER_FILE = path.join(__dirname, "indexed-jobs.json");

function loadIndexedList() {
  if (!fs.existsSync(TRACKER_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(TRACKER_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

function saveIndexedList(list) {
  fs.writeFileSync(TRACKER_FILE, JSON.stringify(list, null, 2));
}

// ---- Google se Auth Token lo (service account ke through) ----
async function getAuthClient() {
  const auth = new GoogleAuth({
    keyFile: KEY_FILE,
    scopes: SCOPES,
  });
  return auth.getClient();
}

// ---- Ek job URL ko Google Indexing API par submit karo ----
async function submitUrl(authClient, url) {
  const res = await authClient.request({
    url: ENDPOINT,
    method: "POST",
    data: {
      url: url,
      type: "URL_UPDATED",
    },
  });
  return res.data;
}

// ---- Main ----
async function main() {
  const argId = process.argv[2];
  const indexedList = loadIndexedList();

  let jobsToSubmit = [];

  if (argId) {
    const job = getJobById(argId);
    if (!job) {
      console.error(`\n❌ "${argId}" naam ki job nahi mili.\n`);
      process.exit(1);
    }
    jobsToSubmit = [job];
  } else {
    jobsToSubmit = JOBS_DATA.filter((j) => !indexedList.includes(j.id));

    if (jobsToSubmit.length === 0) {
      console.log("\n✓ Koi nayi job nahi mili — sab kuch already Google ko submit ho chuka hai.\n");
      return;
    }

    // Quota safety: 200/day. Agar ek saath bahut saari jobs hain
    // (jaise pehli baar chalane par), to sirf 190 tak hi bhejo,
    // baaki agli baar chalane par apne aap chali jayengi.
    if (jobsToSubmit.length > 190) {
      console.log(`⚠ ${jobsToSubmit.length} jobs mili, par daily quota 200 hai.`);
      console.log(`  Aaj sirf pehli 190 bheji ja rahi hain, baaki kal apne aap chali jayengi.\n`);
      jobsToSubmit = jobsToSubmit.slice(0, 190);
    }

    console.log(`\n🆕 ${jobsToSubmit.length} job(s) Google ko submit ki ja rahi hain...\n`);
  }

  const authClient = await getAuthClient();

  for (const job of jobsToSubmit) {
    const url = WEBSITE_BASE_URL + job.id;
    try {
      await submitUrl(authClient, url);
      console.log(`✅ Submitted: ${job.title}`);
      console.log(`   ${url}`);
      if (!indexedList.includes(job.id)) {
        indexedList.push(job.id);
        saveIndexedList(indexedList); // har success ke baad turant save
      }
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      console.error(`❌ Failed: ${job.title}`);
      console.error(`   ${msg}`);
    }
  }

  console.log("\n✓ Process complete.\n");
}

main();
