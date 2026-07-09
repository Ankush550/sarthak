const axios = require("axios");
require("dotenv").config();

async function getBoards() {
  try {
    const res = await axios.get(
      "https://api.pinterest.com/v5/boards",
      {
        headers: {
          Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`
        }
      }
    );

    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

getBoards();