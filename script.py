import os
import json
import requests
import subprocess

BOT = os.environ['BOT_TOKEN']
CID = os.environ['CHANNEL_ID']

# ✅ Master branch se latest jobs.json fetch karo
subprocess.run(['git','fetch','origin','master'], check=True)
subprocess.run(['git','checkout','origin/master','--','data/jobs.json'], check=True)

# ✅ JSON load
with open('data/jobs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# ✅ Last job
a = data[-1]
h = a.get('highlights', {})

msg = f"""🔥 {a.get('title','')}

Vacancy: {h.get('vacancy','-')}
Last Date: {h.get('applyDate','-')}

https://sarthakyojana.in/pages/job-detail.html?id={a.get('id','')}
"""

# ✅ Telegram send
url = f"https://api.telegram.org/bot{BOT}/sendMessage"

res = requests.post(url, data={
    "chat_id": CID,
    "text": msg
})

# ✅ Debug output (IMPORTANT)
print("STATUS:", res.status_code)
print("RESPONSE:", res.text)
