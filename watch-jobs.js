require('dotenv').config();
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const axios = require('axios');

// ===== CONFIG =====
const JOB_CONTENT_FILE = path.join(__dirname, 'assets', 'js', 'job-content.js');
const JOBS_DATA_FILE = path.join(__dirname, 'assets', 'js', 'jobs-data.js');
const POSTED_JOBS_FILE = path.join(__dirname, 'posted-jobs.json');
const BASE_URL = 'https://sarthakyojana.in/pages/item-detail.html?type=job&id=';

// ===== job-content.js se id + html nikalna =====
function extractJobsContent() {
  const fileContent = fs.readFileSync(JOB_CONTENT_FILE, 'utf-8');
  const regex = /JOB_CONTENT\["([\w-]+)"\]\s*=\s*`([\s\S]*?)`;/g;
  const jobs = {};
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    jobs[match[1]] = match[2];
  }
  return jobs;
}

// ===== jobs-data.js se structured array nikalna (balanced bracket parsing) =====
function extractJobsDataArray() {
  try {
    const fileContent = fs.readFileSync(JOBS_DATA_FILE, 'utf-8');
    const startIdx = fileContent.indexOf('[');
    if (startIdx === -1) return [];

    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx; i < fileContent.length; i++) {
      if (fileContent[i] === '[') depth++;
      else if (fileContent[i] === ']') {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }
    if (endIdx === -1) return [];

    const arrayText = fileContent.substring(startIdx, endIdx + 1);
    const arr = new Function('return ' + arrayText)();
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    console.error('⚠️  jobs-data.js parse karne mein error:', err.message);
    return [];
  }
}

function findJobData(id) {
  const allJobs = extractJobsDataArray();
  return allJobs.find((j) => j.id === id) || null;
}

// ===== HTML se title nikalna (fallback ke liye) =====
function extractTitle(html) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1Match) return null;
  return h1Match[1].replace(/<[^>]+>/g, '').trim();
}

// ===== Posted jobs tracker =====
function loadPostedJobs() {
  if (!fs.existsSync(POSTED_JOBS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTED_JOBS_FILE, 'utf-8'));
}

function savePostedJobs(list) {
  fs.writeFileSync(POSTED_JOBS_FILE, JSON.stringify(list, null, 2));
}

// ===== Date ko "8th July 2026" format mein convert karna =====
function ordinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDateWords(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = ordinalSuffix(d.getDate());
  const month = d.toLocaleString('en-US', { month: 'long' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// ===== String ko #Hashtag banana =====
function slugToHashtag(str) {
  if (!str) return null;
  return '#' + str.replace(/[^a-zA-Z0-9]+/g, '');
}

// ===== Final professional FB message banana =====
function buildMessage(id, htmlTitle, jobData, link) {
  const title = (jobData && jobData.title) || htmlTitle || id;
  const totalPosts = jobData && jobData.totalPosts;
  const jobType = (jobData && (jobData.jobType || jobData.category)) || '';
  const organization = (jobData && jobData.organization) || '';
  const startDate = jobData && formatDateWords(jobData.applicationStartDate);
  const lastDate =
    (jobData && jobData.lastDateDisplay) || (jobData && formatDateWords(jobData.lastDate));

  const lines = [];
  lines.push(`📢 ${title} is Here!`);
  lines.push('');
  lines.push(`Looking for a Government Job? Here's your opportunity!`);
  lines.push('');

  if (totalPosts) lines.push(`📌 ${totalPosts} ${jobType ? jobType + ' ' : ''}Posts`);
  if (startDate) lines.push(`🗓️ Online Application Starts: ${startDate}`);
  if (organization) lines.push(`🏢 Organization: ${organization}`);
  lines.push(`💼 Secure Government Career with Excellent Benefits`);
  lines.push('');
  lines.push(
    `Don't wait until the last date${lastDate ? ' (' + lastDate + ')' : ''}. Check eligibility, age limit, salary, selection process, and apply online.`
  );
  lines.push('');
  lines.push(`🔗 Read Complete Details:`);
  lines.push(link);
  lines.push('');

  const hashtags = new Set(['#GovernmentJobs', '#LatestJobs', '#SarthakYojana', '#SarkariNaukri']);
  const orgTag = slugToHashtag(organization);
  const catTag = slugToHashtag(jobData && jobData.category);
  if (orgTag) hashtags.add(orgTag);
  if (catTag) hashtags.add(catTag);

  lines.push(Array.from(hashtags).join(' '));

  return lines.join('\n');
}

// ===== Facebook par post karna =====
async function postJobToFacebook(id, htmlTitle) {
  const jobData = findJobData(id);
  const link = BASE_URL + id;
  const message = buildMessage(id, htmlTitle, jobData, link);

  try {
    const res = await axios.post(
      `https://graph.facebook.com/v20.0/${process.env.FB_PAGE_ID}/feed`,
      {
        message,
        link,
        access_token: process.env.FB_PAGE_ACCESS_TOKEN,
      }
    );
    console.log(`✅ Posted to Facebook: ${(jobData && jobData.title) || htmlTitle} (${res.data.id})`);
    return true;
  } catch (err) {
    console.error(`❌ FB post failed for ${id}:`, err.response?.data || err.message);
    return false;
  }
}

// ===== Naye jobs check karo aur post karo =====
async function checkForNewJobs() {
  const currentJobs = extractJobsContent();
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

// ===== Seed mode =====
function seedExistingJobs() {
  const currentJobs = extractJobsContent();
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

// ===== Manual test mode: node watch-jobs.js --test <job-id> =====
if (args.includes('--test')) {
  const testId = args[args.indexOf('--test') + 1];
  const currentJobs = extractJobsContent();
  const title = currentJobs[testId] ? extractTitle(currentJobs[testId]) : testId;
  postJobToFacebook(testId, title).then(() => process.exit(0));
} else {
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
}
