import os
import json
import requests
import subprocess

BOT = os.environ['BOT_TOKEN']
CID = os.environ['CHANNEL_ID']

subprocess.run(['git','fetch','origin','master'], check=True)
subprocess.run(['git','checkout','origin/master','--','data/jobs.json'], check=True)

with open('data/jobs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

a = data[-1]
h = a.get('highlights', {})

msg = f"""🔥 Nayi Khabar - SarthakYojana.in

{a.get('title','')}

Vacancy: {h.get('vacancy','-')}
Last Date: {h.get('applyDate','-')}

https://sarthakyojana.in/pages/job-detail.html?id={a.get('id','')}
"""

url = f"https://api.telegram.org/bot{BOT}/sendMessage"

requests.post(url, data={
    "chat_id": CID,
    "text": msg
})

print("✅ Message Sent")
