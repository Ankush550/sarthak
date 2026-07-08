require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Facebook par post karne wala function
async function postJobToFacebook(job) {
  const message = `🆕 New Job: ${job.title}\n\n${job.description}\n\nApply: ${job.link}`;

  try {
    const res = await axios.post(
      `https://graph.facebook.com/v20.0/${process.env.FB_PAGE_ID}/feed`,
      {
        message,
        link: job.link,
        access_token: process.env.FB_PAGE_ACCESS_TOKEN,
      }
    );
    console.log('Posted to FB:', res.data.id);
  } catch (err) {
    console.error('FB post error:', err.response?.data || err.message);
  }
}

// Test route
app.get('/test-fb', async (req, res) => {
  await postJobToFacebook({
    title: 'Test Job',
    description: 'Ye ek test post hai',
    link: 'https://sarthakyojana.in',
  });
  res.send('Check your Facebook page!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));