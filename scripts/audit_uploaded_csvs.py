import os
import glob
import hashlib
import csv
from urllib.parse import urlparse

upload_dir = r"C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded"
files = glob.glob(os.path.join(upload_dir, "*.csv"))
print(f"Total CSV files found in upload dir: {len(files)}")

# Map from media file to uploaded filename from artifacts/transcript
# Let's check transcript to map uploaded names if available
uploaded_name_map = {
    "media_1794306505030_2261abc7.csv": "Organic-Research-1000rows_(1).csv",
    "media_1794306510809_94f3c5b8.csv": "Organic-Research-1000rows.csv",
    "media_1794306516560_b731edc4.csv": "Organic-Research-1300rows_(1).csv",
    "media_1794306524759_f628957f.csv": "Organic-Research-1300rows_(2).csv",
    "media_1794306532170_92e08d7f.csv": "Organic-Research-1300rows.csv",
    "media_1794306537314_f3545eb8.csv": "Organic-Research-1500rows_(1).csv",
    "media_1794306545778_6fb5bb20.csv": "Organic-Research-1500rows.csv",
    "media_1794305022152_9603e355.csv": "Organic-Research-1300rows_(1).csv",
    "media_1794305028177_f7255028.csv": "Organic-Research-1300rows_(2).csv",
    "media_1794305034059_1d681b17.csv": "Organic-Research-1000rows_(1).csv",
    "media_1794305040152_8e96401a.csv": "Organic-Research-1000rows.csv",
    "media_1794303583078_aaa88be8.csv": "Organic-Research-1300rows_(1).csv",
    "media_1794303588844_6b3d9db4.csv": "Organic-Research-1300rows_(2).csv",
    "media_1794303595008_8c4b47c7.csv": "Organic-Research-1000rows.csv",
    "media_1794303600979_f3bbf39e.csv": "Organic-Research-1000rows_(1).csv",
    "media_1794301185751_1425667f.csv": "Organic-Research-1500rows.csv",
    "media_1794301191452_baead13f.csv": "Organic-Research-1500rows_(1).csv",
    "media_1794301198004_91b5b9fc.csv": "Organic-Research-1300rows.csv",
    "media_1794300105059_44cfe80d.csv": "Organic-Research-1300rows.csv",
    "media_1794300112135_f3557fa3.csv": "Organic-Research-1500rows_(1).csv",
    "media_1794300120258_36b98ef3.csv": "Organic-Research-1500rows.csv",
}

results = []
for f in files:
    h = hashlib.md5(open(f, "rb").read()).hexdigest()
    size = os.path.getsize(f)
    fname = os.path.basename(f)
    orig_name = uploaded_name_map.get(fname, fname)
    
    domains = set()
    rows = 0
    keywords = set()
    with open(f, "r", encoding="utf-8-sig", errors="replace") as fp:
        reader = csv.DictReader(fp)
        for r in reader:
            rows += 1
            kw = r.get("Keyword") or r.get("Keyword phrase") or r.get("phrase") or ""
            if kw:
                keywords.add(kw.strip().lower())
            u = r.get("Url") or r.get("URL") or r.get("url") or ""
            if u:
                parsed = urlparse(u)
                if parsed.netloc:
                    domains.add(parsed.netloc)
    results.append({
        "media_file": fname,
        "orig_name": orig_name,
        "size": size,
        "md5": h,
        "rows": rows,
        "unique_kws": len(keywords),
        "domains": list(domains)
    })

# Print summary by MD5 signature
unique_signatures = {}
for r in results:
    sig = r["md5"]
    if sig not in unique_signatures:
        unique_signatures[sig] = {
            "size": r["size"],
            "rows": r["rows"],
            "unique_kws": r["unique_kws"],
            "domains": r["domains"],
            "files": []
        }
    unique_signatures[sig]["files"].append(r["orig_name"])

print("\n--- UNIQUE SIGNATURES IN DATASET ---")
for sig, data in unique_signatures.items():
    print(f"MD5: {sig}")
    print(f"  Size: {data['size']} bytes | Rows: {data['rows']} | Unique KWs: {data['unique_kws']}")
    print(f"  Detected Domains: {data['domains']}")
    print(f"  Associated Uploaded Filenames: {set(data['files'])}")
    print(f"  Total Copies Uploaded: {len(data['files'])}")
    print()

print("--- ALL UPLOADED FILES INVENTORY ---")
for r in sorted(results, key=lambda x: (x['orig_name'], x['media_file'])):
    print(f"{r['orig_name']} ({r['media_file']}): Size={r['size']} bytes, Rows={r['rows']}, KWs={r['unique_kws']}, Domain={r['domains']}")

