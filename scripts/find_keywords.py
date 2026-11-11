import csv

with open('docs/seo/Master-Keyword-Database.csv', mode='r', encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        phrase = r['Phrase'].lower()
        if 'decod' in phrase or 'audio' in phrase:
            print(f"{r['Phrase']} | vol={r['Volume']} | kd={r['KD']} | rank={r['Competitor_Rank']} | cluster={r['Cluster']} | comp_url={r['Competitor_URL']}")

