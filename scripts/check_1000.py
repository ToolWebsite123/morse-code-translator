import csv

f_1000 = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794302958728_c42b09b6.csv'
f_1500 = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'

def clean_dict(reader):
    rows = []
    for r in reader:
        c = {k.strip().strip('"'): v.strip().strip('"') for k, v in r.items() if k}
        rows.append(c)
    return rows

r1000 = clean_dict(csv.DictReader(open(f_1000, 'r', encoding='utf-8-sig')))
r1500 = clean_dict(csv.DictReader(open(f_1500, 'r', encoding='utf-8-sig')))

k1000 = set(r['phrase'].lower() for r in r1000)
k1500 = set(r['phrase'].lower() for r in r1500)

print("Unique in 1000:", len(k1000))
print("Unique in 1500:", len(k1500))
print("In 1000 but NOT in 1500:", len(k1000 - k1500))
