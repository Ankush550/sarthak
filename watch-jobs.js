require('dotenv').config();
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const axios = require('axios');

// ===== CONFIG =====
const JOB_CONTENT_FILE = path.join(__dirname, 'job-content.js'); // apna actual path daalo
const POSTED_JOBS_FILE = path.join(__dirname, 'posted-jobs.json');
const BASE_URL = 'https://sarthakyojana.in/pages/item-detail.html?type=job&id='; // apna actual URL structure check kar lena

// ===== Helper: job-content.js se saare job ID + content nikalna =====
function extractJobs() {
  const fileContent = fs.readFileSync(JOB_CONTENT_FILE, 'utf-8');
  const regex = /JOB_CONTENT\["([\w-]+)"\]\s*=\s*`([\s\S]*?)`;/g;
  const jobs = {};
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[1];
    const html = match[2];
    jobs[id] = html;
  }
  return jobs;
}

// ===== Helper: HTML content se title nikalna (<h1> tag se) =====
function extractTitle(html) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) return null;
  return h1Match[1].replace(/<[^>]+>/g, '').trim();
}

// ===== Posted jobs list load/save karna =====
function loadPostedJobs() {
  if (!fs.existsSync(POSTED_JOBS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTED_JOBS_FILE, 'utf-8'));
}

function savePostedJobs(list) {
  fs.writeFileSync(POSTED_JOBS_FILE, JSON.stringify(list, null, 2));
}

// ===== Facebook par post karna =====
async function postJobToFacebook(id, title) {
  const link = BASE_URL + id;
  const message = `🆕 New Job Alert!\n\n${title}\n\nApply now: ${link}`;

  try {
    const res = await axios.post(
      `https://graph.facebook.com/v20.0/${process.env.FB_PAGE_ID}/feed`,
      {
        message,
        link,
        access_token: process.env.FB_PAGE_ACCESS_TOKEN,
      }
    );
    console.log(`✅ Posted to Facebook: ${title} (${res.data.id})`);
    return true;
  } catch (err) {
    console.error(`❌ FB post failed for ${id}:`, err.response?.data || err.message);
    return false;
  }
}

// ===== Main check function: naye jobs dhoondo aur post karo =====
async function checkForNewJobs() {
  const currentJobs = extractJobs();
  const postedJobs = loadPostedJobs();

  const currentIds = Object.keys(currentJobs);
  const newIds = currentIds.filter((id) => !postedJobs.includes(id));

  if (newIds.length === 0) {
    console.log('ℹ️  Koi naya job nahi mila.');
    return;
  }

  console.log(`🔍 ${newIds.length} naye job(s) mile:`, newIds);

  for (const id of newIds) {
    const title = extractTitle(currentJobs[id]) || id;
    const success = await postJobToFacebook(id, title);
    if (success) {
      postedJobs.push(id);
      savePostedJobs(postedJobs);
    }
  }
}

// ===== SEED MODE =====
function seedExistingJobs() {
  const currentJobs = extractJobs();
  const currentIds = Object.keys(currentJobs);
  savePostedJobs(currentIds);
  console.log(`🌱 Seeded ${currentIds.length} existing jobs as "already posted". Ab sirf NAYE jobs post honge.`);
}

// ===== CLI arg check =====
const args = process.argv.slice(2);

if (args.includes('--seed')) {
  seedExistingJobs();
  process.exit(0);
}

// ===== Watcher start karo =====
console.log('👀 job-content.js ko watch kar raha hoon...');
console.log(`📂 File: ${JOB_CONTENT_FILE}`);

let debounceTimer;
const watcher = chokidar.watch(JOB_CONTENT_FILE, { persistent: true });

watcher.on('change', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log('📝 job-content.js update hua, naye jobs check kar raha hoon...');
    checkForNewJobs();
  }, 2000);
});

console.log('✅ Watcher chalu ho gaya. Ab job-content.js mein naya job add karke save karo — automatically Facebook par post ho jayega.');