const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function readJobTitles() {
  try {
    const titlesPath = path.join(__dirname, "job-titles.txt");
    if (fs.existsSync(titlesPath)) {
      const content = fs.readFileSync(titlesPath, "utf-8");
      return content
        .split("\n")
        .map((title) => title.trim())
        .filter((title) => title.length > 0);
    }
    return [];
  } catch (error) {
    console.error("Error reading titles:", error);
    return [];
  }
}

async function generateStructuredContent(jobTitle) {
  try {
    console.log(`📝 Generating: ${jobTitle}`);

    const structuredContent = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Job Title: "${jobTitle}"

Create detailed job posting article in 800-1200 words with THIS STRUCTURE:

**1. OVERVIEW (100-150 words)**
- What is this recruitment about?
- Why it's important
- Quick stats

**2. POST/DEPARTMENT DETAILS (150-200 words)**
List 3-4 main posts with vacancies

**3. ELIGIBILITY REQUIREMENTS (100-150 words)**
Qualification, Experience, Age Limit, Skills

**4. APPLICATION FEE (50-75 words)**
Fees for different categories

**5. SALARY/PAY SCALE (100-150 words)**
Salary ranges for different posts

**6. SELECTION PROCESS (100-150 words)**
Step-by-step selection process

**7. HOW TO APPLY (100-150 words)**
Step-by-step application instructions

**8. FAQS (100-150 words)**
5-6 important questions and answers

**9. IMPORTANT TIPS (50-75 words)**
5-6 practical tips

**10. IMPORTANT LINKS**
- Official Website
- Apply Online
- Download Notification

LANGUAGE: Hindi/Hinglish mix, professional but relatable
TOTAL WORDS: 800-1200 words

Write complete, flowing text - not prompts. Make it look like a professional job guide.`,
        },
      ],
    });

    const content = structuredContent.content[0].text;
    const wordCount = content.split(/\s+/).length;
    console.log(`✅ Done: ${wordCount} words\n`);

    return {
      title: jobTitle,
      content: content,
      wordCount: wordCount,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function generateHtmlFile(jobData) {
  const jobId = jobData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let htmlContent = jobData.content.replace(/\n/g, "</p><p>");

  const htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${jobData.title} - SarthakYojana.in</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="container">
        <article class="job-article">
            <h1>${jobData.title}</h1>
            
            <div class="article-meta">
                <strong>By Sarthak AI</strong> | 
                <span class="date">${new Date().toLocaleDateString("en-IN")}</span> | 
                <span class="word-count">${jobData.wordCount} words</span>
            </div>

            <div class="article-content">
                <p>${htmlContent}</p>
            </div>

            <div class="article-footer">
                <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
                <p class="disclaimer">
                    ⚠️ Educational purposes ke liye. Official website se verify karo.
                </p>
            </div>
        </article>
    </div>
</body>
</html>`;

  const filePath = path.join(__dirname, `../pages/${jobId}.html`);
  fs.writeFileSync(filePath, htmlFile, "utf-8");
  console.log(`✅ Created: pages/${jobId}.html`);
}

async function updateJobsJson(jobDataArray) {
  let existingJobs = [];
  const jobsJsonPath = path.join(__dirname, "../jobs.json");

  if (fs.existsSync(jobsJsonPath)) {
    const content = fs.readFileSync(jobsJsonPath, "utf-8");
    existingJobs = JSON.parse(content);
  }

  const newJobs = jobDataArray.map((j) => ({
    id: j.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    title: j.title,
    wordCount: j.wordCount,
    published_date: new Date().toISOString().split("T")[0],
    author: "Sarthak AI",
  }));

  const updatedJobs = [...existingJobs, ...newJobs];
  fs.writeFileSync(
    jobsJsonPath,
    JSON.stringify(updatedJobs, null, 2),
    "utf-8"
  );
  console.log(`✅ Updated: jobs.json`);
}

async function main() {
  console.log("\n🚀 Starting content generation...\n");

  const jobTitles = await readJobTitles();

  if (jobTitles.length === 0) {
    console.error("❌ No titles found in job-titles.txt!");
    return;
  }

  console.log(`📋 Found ${jobTitles.length} titles\n`);

  const allJobData = [];

  for (let i = 0; i < jobTitles.length; i++) {
    const title = jobTitles[i];
    console.log(`[${i + 1}/${jobTitles.length}] ${title}`);

    const jobData = await generateStructuredContent(title);

    if (jobData) {
      await generateHtmlFile(jobData);
      allJobData.push(jobData);
    }

    if (i < jobTitles.length - 1) {
      console.log("⏳ Waiting...\n");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (allJobData.length > 0) {
    await updateJobsJson(allJobData);
  }

  console.log("\n✨ Done!");
  console.log(`Generated: ${allJobData.length} articles`);
  console.log("\n");
}

main().catch(console.error);