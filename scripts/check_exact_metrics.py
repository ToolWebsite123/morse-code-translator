import csv

with open('docs/seo/Master-Keyword-Database.csv', mode='r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for r in reader:
        phrase = r['Phrase'].strip().lower()
        if phrase in ['morse code', 'morse code translator', 'morse code alphabet', 'morse code chart', 'learn morse code', 'morse code audio', 'morse code sound', 'sos in morse code', 'morse code generator']:
            print(f"{r['Phrase']} | vol={r['Volume']} | kd={r['KD']} | pos={r['Competitor_Rank']} | traffic={r['Competitor_Traffic']} | comp_url={r['Competitor_URL']}")
