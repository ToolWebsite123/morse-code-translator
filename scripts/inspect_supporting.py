import csv
from test_clusters import clusters

print("=== Supporting Informational Queries sample ===")
for item in sorted(clusters['Supporting Informational Queries'], key=lambda x: x['volume'], reverse=True)[:25]:
    print(f"  Vol: {item['volume']:>6,d} | KD: {item['kd']:>2} | Phrase: '{item['phrase']}'")

