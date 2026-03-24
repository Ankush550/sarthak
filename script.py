import os
import json
import requests

BOT = os.environ['BOT_TOKEN']
CID = os.environ['CHANNEL_ID']

with open('data/jobs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

a = data[-1]
h = a.get('highlights', {})

msg = f"""🔥 {a.get('title','')}

Vacancy: {h.get('vacancy','-')}
Last Date: {h.get('applyDate','-')}

https://sarthakyojana.in/pages/job-detail.html?id={a.get('id','')}
"""

url = f"https://api.telegram.org/bot{BOT}/sendMessage"

res = requests.post(url, data={
    "chat_id": CID,
    "text": msg
})

print("STATUS:", res.status_code)
print("RESPONSE:", res.text)
