import os, json, requests, subprocess

BOT = os.environ['BOT_TOKEN']
CID = "@sarthakyojana"

subprocess.run(['git','fetch','origin','master'], check=True)
subprocess.run(['git','checkout','origin/master','--','data/jobs.json'], check=True)

with open('data/jobs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

a = data[-1]
h = a.get('highlights', {})

msg = (
    "Nayi Khabar - SarthakYojana.in\n\n"
    + a.get('title','') + "\n\n"
    + "Vacancy: " + h.get('vacancy','-') + "\n"
    + "Last Date: " + h.get('applyDate','-') + "\n\n"
    + "https://sarthakyojana.in/pages/job-detail.html?id=" + a.get('id','')
    + "\n\nsarthakyojana.in"
)

url = "https://api.telegram.org/bot" + BOT + "/sendMessage"
res = requests.post(url, data={"chat_id": CID, "text": msg})
print("STATUS:", res.status_code)
print("RESPONSE:", res.text)
