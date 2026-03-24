import json
import requests
import subprocess

BOT = "8351410114:AAHSOO0BYcF40UV66wbC5O11Z3bbe6zleXQ"
CID = "@sarthakyojana"

subprocess.run(['git', 'fetch', 'origin', 'master'], check=True)
subprocess.run(['git', 'checkout', 'origin/master', '--', 'data/jobs.json'], check=True)

with open('data/jobs.json', 'r', encoding='utf-8') as f:
    current = json.load(f)

result = subprocess.run(
    ['git', 'show', 'origin/master~1:data/jobs.json'],
    capture_output=True, text=True
)

old_ids = set()
if result.returncode == 0:
    old_ids = {a['id'] for a in json.loads(result.stdout)}

new_articles = [a for a in current if a['id'] not in old_ids]
print("New articles:", len(new_articles))

if not new_articles:
    print("No new articles found")
    exit(0)

for a in new_articles:
    h = a.get('highlights', {})
    msg = (
        "Nayi Khabar - SarthakYojana.in\n\n"
        + a.get('title', '') + "\n\n"
        + "Vacancy: " + h.get('vacancy', '-') + "\n"
        + "Last Date: " + h.get('applyDate', '-') + "\n\n"
        + "Details: https://sarthakyojana.in/pages/job-detail.html?id=" + a.get('id', '')
        + "\n\nsarthakyojana.in"
    )
    res = requests.post(
        "https://api.telegram.org/bot" + BOT + "/sendMessage",
        data={"chat_id": CID, "text": msg}
    )
    print("STATUS:", res.status_code)
    print("Sent:", a.get('title', '')[:50])
