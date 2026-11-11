import csv
from collections import Counter, defaultdict

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'
f2_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301191452_baead13f.csv'
f3_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301198004_91b5b9fc.csv'

def load_rows(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = []
        for r in reader:
            clean = {k.strip().strip('"'): (v.strip().strip('"') if v else '') for k, v in r.items() if k}
            rows.append(clean)
        return rows

rows1 = load_rows(f1_path)
rows2 = load_rows(f2_path)
rows3 = load_rows(f3_path)

print(f"File 1 total records: {len(rows1)}")
print(f"File 2 total records: {len(rows2)}")
print(f"File 3 total records: {len(rows3)}")

# Competitor URLs
url_counter = Counter(r['url'] for r in rows1)
url_traffic = defaultdict(int)
url_vol = defaultdict(int)

for r in rows1:
    u = r['url']
    t = int(r['traffic']) if r['traffic'].isdigit() else 0
    v = int(r['volume']) if r['volume'].isdigit() else 0
    url_traffic[u] += t
    url_vol[u] += v

print("\n=== COMPETITOR URLs (morsecode.world) ===")
sorted_urls = sorted(url_counter.items(), key=lambda x: url_traffic[x[0]], reverse=True)
for u, count in sorted_urls:
    print(f"Traffic: {url_traffic[u]:>7,d} | Vol Sum: {url_vol[u]:>9,d} | KWs: {count:>4} | URL: {u}")

# Deduplication analysis across rows1
phrase_groups = defaultdict(list)
for r in rows1:
    phrase_groups[r['phrase'].strip().lower()].append(r)

dupe_phrases = {p: grp for p, grp in phrase_groups.items() if len(grp) > 1}
print(f"\nUnique phrases in File 1: {len(phrase_groups)}")
print(f"Phrases with multiple rankings/records: {len(dupe_phrases)}")

# Look at top duplicates
print("\nTop 10 duplicate phrases and their conflicting URLs/positions:")
sorted_dupes = sorted(dupe_phrases.items(), key=lambda x: int(x[1][0]['volume']) if x[1][0]['volume'].isdigit() else 0, reverse=True)
for p, grp in sorted_dupes[:10]:
    print(f"\nPhrase: '{p}' (Volume: {grp[0]['volume']}, KD: {grp[0]['keywordDifficulty']})")
    for r in grp:
        print(f"  Pos: {r['position']:>2} | Traffic: {r['traffic']:>6} | URL: {r['url']} | Date: {r['crawledTime']}")

