import os
import json
import requests
import subprocess

# 🔐 ENV variables
BOT = os.environ.get('BOT_TOKEN')
CID = os.environ.get('CHANNEL_ID')

if not BOT or not CID:
    raise Exception("❌ BOT_TOKEN or CHANNEL_ID missing")

# 🔄 Latest jobs.json fetch from master
subprocess.run(['git', 'fetch', 'origin', 'master'], check=True)
subprocess.run(['git', 'checkout', 'origin/master', '--', 'data/jobs.json'], check=True)

# 📂 Load JSON
with open('data/jobs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 🆕 Latest job
a = data[-1]
h = a.get('highlights', {})

title = a.get('title', 'No Title')
vacancy = h.get('vacancy', '-')
last_date = h.get('applyDate', '-')
job_id = a.get('id', '')

link = f"https://sarthakyojana.in/pages/job-detail.html?id={job_id}"

# ✨ Message format
msg = f"""🚨 NEW JOB UPDATE 🚨

📌 {title}

📊 Vacancy: {vacancy}
📅 Last Date: {last_date}

👉 Apply Now:
{link}
"""

# 📡 Telegram API call
url = f"https://api.telegram.org/bot{BOT}/sendMessage"

payload = {
    "chat_id": CID,
    "text": msg,
    "disable_web_page_preview": False
}

res = requests.post(url, data=payload)

print("STATUS:", res.status_code)
print("RESPONSE:", res.text)

# ❌ Error handling
if res.status_code != 200:
    raise Exception(f"Telegram API Error: {res.text}")
