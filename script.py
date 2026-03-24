import json, requests, subprocess

BOT = "8351410114:AAHSOO0BYcF40UV66wbC5O11Z3bbe6zleXQ"
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
    + "Details: https://sarthakyojana.in/pages/job-detail.html?id=" + a.get('id','')
    + "\n\nsarthakyojana.in"
)

res = requests.post(
    "https://api.telegram.org/bot" + BOT + "/sendMessage",
    data={"chat_id": CID, "text": msg}
)
print("STATUS:", res.status_code)
print("RESPONSE:", res.text)
