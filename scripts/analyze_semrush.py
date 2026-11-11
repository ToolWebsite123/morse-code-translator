import csv
import hashlib
import os

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'
f2_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301191452_baead13f.csv'
f3_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301198004_91b5b9fc.csv'

def get_file_info(p):
    with open(p, 'rb') as f:
        data = f.read()
    return len(data), hashlib.md5(data).hexdigest()

print("File 1:", get_file_info(f1_path))
print("File 2:", get_file_info(f2_path))
print("File 3:", get_file_info(f3_path))

def read_semrush_csv(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        cleaned_fieldnames = [c.strip().strip('"') for c in reader.fieldnames]
        rows = []
        for raw_row in reader:
            clean_row = {}
            for k, v in raw_row.items():
                if k is None:
                    continue
                clean_k = k.strip().strip('"')
                clean_v = v.strip().strip('"') if v is not None else ""
                clean_row[clean_k] = clean_v
            rows.append(clean_row)
        return cleaned_fieldnames, rows

cols1, rows1 = read_semrush_csv(f1_path)
cols3, rows3 = read_semrush_csv(f3_path)

print(f"Columns 1: {cols1}")
print(f"Row count 1: {len(rows1)}")
print(f"Columns 3: {cols3}")
print(f"Row count 3: {len(rows3)}")

p1 = {r['phrase'].strip().lower(): r for r in rows1}
p3 = {r['phrase'].strip().lower(): r for r in rows3}

print(f"Unique phrases in File 1 (1500 rows): {len(p1)}")
print(f"Unique phrases in File 3 (1300 rows): {len(p3)}")
overlap = set(p1.keys()) & set(p3.keys())
print(f"Overlapping phrases: {len(overlap)}")
f1_only = set(p1.keys()) - set(p3.keys())
print(f"Phrases in F1 only: {len(f1_only)}")
f3_only = set(p3.keys()) - set(p1.keys())
print(f"Phrases in F3 only: {len(f3_only)}")
total_unique = set(p1.keys()) | set(p3.keys())
print(f"Total union of unique phrases: {len(total_unique)}")

# Sample first 3 in F1
print("\nSample 3 rows from File 1:")
for r in rows1[:3]:
    print(r)
