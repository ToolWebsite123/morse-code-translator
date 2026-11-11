with open('src/lib/learning/lessons.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
titles = re.findall(r"title:\s*['\"](.*?)['\"]", text)
print(f"Total lessons found: {len(titles)}")
for t in titles:
    print(" ", t)

