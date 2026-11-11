import csv
import re
from collections import defaultdict, Counter

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'

def load_and_deduplicate(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = []
        for r in reader:
            clean = {k.strip().strip('"'): (v.strip().strip('"') if v else '') for k, v in r.items() if k}
            rows.append(clean)
            
    # Group by normalized phrase
    by_phrase = defaultdict(list)
    for r in rows:
        p = r['phrase'].strip().lower()
        by_phrase[p].append(r)
        
    master = []
    for phrase, entries in by_phrase.items():
        # Pick best metrics
        # Volume and KD are identical across entries for the same phrase
        vol = int(entries[0]['volume']) if entries[0]['volume'].isdigit() else 0
        kd = int(entries[0]['keywordDifficulty']) if entries[0]['keywordDifficulty'].isdigit() else 0
        cpc = float(entries[0]['cpc']) if entries[0]['cpc'].replace('.', '', 1).isdigit() else 0.0
        
        # Combine intents
        intents_set = set()
        for e in entries:
            for k in ['intents.0', 'intents.1', 'intents.2']:
                val = e.get(k, '').strip()
                if val:
                    intents_set.add(val)
        
        # Best position
        positions = [int(e['position']) for e in entries if e['position'].isdigit()]
        best_pos = min(positions) if positions else 999
        
        # Total traffic across positions
        total_traffic = sum(int(e['traffic']) for e in entries if e['traffic'].isdigit())
        total_traffic_cost = sum(int(e['trafficCost']) for e in entries if e['trafficCost'].isdigit())
        
        # Competitor URLs
        urls = list(dict.fromkeys(e['url'] for e in entries if e['url']))
        # Primary URL is the one with highest traffic or best position
        best_entry = max(entries, key=lambda e: (int(e['traffic']) if e['traffic'].isdigit() else 0, -int(e['position']) if e['position'].isdigit() else -999))
        primary_url = best_entry['url']
        crawled_time = best_entry['crawledTime']
        
        # Intent string
        intent_map = {'I': 'Informational', 'C': 'Commercial', 'N': 'Navigational', 'T': 'Transactional'}
        full_intents = [intent_map.get(i, i) for i in sorted(list(intents_set))]
        intent_str = ' / '.join(full_intents) if full_intents else 'Informational'
        
        master.append({
            'phrase': phrase,
            'volume': vol,
            'keywordDifficulty': kd,
            'cpc': cpc,
            'intent': intent_str,
            'competitor_best_position': best_pos,
            'competitor_traffic': total_traffic,
            'competitor_traffic_cost': total_traffic_cost,
            'competitor_primary_url': primary_url,
            'competitor_all_urls': ' | '.join(urls),
            'crawled_time': crawled_time,
            'num_serp_records': len(entries)
        })
        
    master.sort(key=lambda x: (x['volume'], x['competitor_traffic']), reverse=True)
    return master

master = load_and_deduplicate(f1_path)
print(f"Total deduplicated master keywords: {len(master)}")

total_vol = sum(m['volume'] for m in master)
print(f"Total aggregate non-overlapping volume: {total_vol:,}")

# Volume buckets
v_100k = [m for m in master if m['volume'] >= 100000]
v_10k = [m for m in master if 10000 <= m['volume'] < 100000]
v_1k = [m for m in master if 1000 <= m['volume'] < 10000]
v_100 = [m for m in master if 100 <= m['volume'] < 1000]
v_under_100 = [m for m in master if m['volume'] < 100]

print(f"\nVolume Distribution:")
print(f"  >= 100,000 : {len(v_100k)} keywords (e.g. {[m['phrase'] for m in v_100k]})")
print(f"  10k - 99k  : {len(v_10k)} keywords")
print(f"  1k - 9.9k  : {len(v_1k)} keywords")
print(f"  100 - 999  : {len(v_100)} keywords")
print(f"  < 100      : {len(v_under_100)} keywords")

# KD distribution
kd_easy = [m for m in master if m['keywordDifficulty'] <= 29]
kd_med = [m for m in master if 30 <= m['keywordDifficulty'] <= 49]
kd_hard = [m for m in master if m['keywordDifficulty'] >= 50]
print(f"\nKeyword Difficulty Distribution:")
print(f"  Easy (KD <= 29)   : {len(kd_easy)} keywords")
print(f"  Medium (KD 30-49) : {len(kd_med)} keywords")
print(f"  Hard (KD >= 50)   : {len(kd_hard)} keywords")

# Question keywords
question_words = ['how', 'what', 'why', 'when', 'where', 'who', 'which', 'can', 'is', 'does', 'do']
questions = [m for m in master if any(m['phrase'].startswith(qw + ' ') or (' ' + qw + ' ') in m['phrase'] for qw in question_words)]
print(f"\nQuestion-based keywords count: {len(questions)}")
print("Sample questions:")
for q in questions[:10]:
    print(f"  '{q['phrase']}' (Vol: {q['volume']}, KD: {q['keywordDifficulty']})")

# High volume low KD opportunities
print("\nHigh Volume Low KD (Vol >= 1000, KD <= 30) - 'Low-Hanging Fruit':")
low_hanging = [m for m in master if m['volume'] >= 1000 and m['keywordDifficulty'] <= 30]
for lh in low_hanging[:15]:
    print(f"  '{lh['phrase']}' | Vol: {lh['volume']:>6,d} | KD: {lh['keywordDifficulty']:>2} | Competitor Pos: {lh['competitor_best_position']:>2} | URL: {lh['competitor_primary_url']}")

