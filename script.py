import json, requests, subprocess

BOT = "8351410114:AAHSOO0BYcF40UV66wbC5O11Z3bbe6zleXQ"
CID = "@sarthakyojana"

# Master se latest jobs.json lo
subprocess.run(['git','fetch','origin','master'], check=True)
subprocess.run(['git','checkout','origin/master','--','data/jobs.json'], check=True)

# Current articles
with open('data/jobs.json', 'r', encoding='utf-8') as f:
    current = json.load(f)

# Previous commit ki ids
result = subprocess.run(
    ['git','show','origin/master~1:data/jobs.json'],
    capture_output=True, text=True
)

old_ids = set()
if result.returncode == 0:
    old_ids = {a['id'] for a in json.loads(result.stdout)}

# Naye articles find karo
new_articles = [a for a in current if a['id'] not in old_ids]
print(f"New articles found: {len(new_articles)}")

if not new_articles:
    print("No new articles - exiting")
    exit(0)

for a in new_articles:
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
    print("Sent:", a.get('title','')[:50])
```

---

## Fix 2 — Workflow master branch pe bhi daalo

VS Code terminal mein:
```
git checkout master
git checkout main -- .github/workflows/telegram-post.yml
git add .github
git commit -m "Add workflow to master branch"
git push origin master
