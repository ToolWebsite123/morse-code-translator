import csv
from collections import Counter

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'

with open(f1_path, 'r', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

intents = Counter()
for r in rows:
    raw_intents = [r.get(k, '').strip() for k in ['intents.0', 'intents.1', 'intents.2']]
    combined = '+'.join([i for i in raw_intents if i])
    intents[combined] += 1

print("Intent combinations in SEMrush dataset:")
for k, v in intents.most_common():
    print(f"  {k or 'None'}: {v}")

