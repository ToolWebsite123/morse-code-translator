import os
import csv
from collections import defaultdict

DOCS_SEO_DIR = r"D:\Project\Morse Code Translator Website\docs\seo"
master_csv_path = os.path.join(DOCS_SEO_DIR, "Master-Keyword-Database.csv")

keywords = []
with open(master_csv_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for r in reader:
        keywords.append(r)

SPECIFIC_PRIORITY = [
    ('sos-distress', ['sos', 'distress', 'emergency', 'save our souls', 's.o.s', 'titanic', 'mayday']),
    ('audio-decoder-mic', ['audio decoder', 'decode audio', 'audio to text', 'from audio', 'audio translator', 'audio converter', 'sound decoder', 'decoder audio', 'decoder morse audio', 'adaptive audio decoder', 'mic', 'microphone']),
    ('sheet-pdf', ['sheet', 'pdf', 'printable', 'print', 'poster']),
    ('audio-sound', ['beep', 'tone', 'hear', 'listen', 'wav', 'mp3', 'noise', 'audio player', 'sound player', 'sound', 'audio']),
    ('learning-lessons', ['learn', 'how to learn', 'course', 'curriculum', 'lesson', 'beginner', 'study']),
    ('practice-trainer', ['practice', 'trainer', 'training', 'drill', 'exercise', 'quiz', 'test', 'game', 'farnsworth', 'koch', 'speed test']),
    ('numbers-digits', ['number', 'numbers', 'digit', 'digits', 'numeric']),
    ('history-origin', ['history', 'samuel morse', 'who invented', 'invention', 'origin', 'telegraph', 'when was', 'vail']),
    ('light-flashlight', ['light', 'flash', 'flashlight', 'blink', 'lamp']),
    ('q-codes-abbreviations', ['q code', 'q-code', 'qcodes', 'prosign', 'abbreviation', 'ham radio', 'cw', 'amateur radio']),
    ('alphabet-chart', ['alphabet', 'chart', 'letters', 'characters', 'table', 'code for', 'symbols', 'guide', 'key']),
    ('translator-core', ['translate', 'translator', 'convert', 'converter', 'decode', 'decoder', 'generator', 'text to morse', 'morse to english', 'english to morse', 'to morse', 'morse to', 'translater', 'translat']),
]

cluster_counts = defaultdict(lambda: {'count': 0, 'volume': 0, 'traffic': 0})

for k in keywords:
    phrase = k['Phrase'].lower()
    assigned = None
    for cid, patterns in SPECIFIC_PRIORITY:
        for p in patterns:
            if p in phrase:
                assigned = cid
                break
        if assigned:
            break
    if not assigned:
        if phrase == 'morse code' or 'morse code' in phrase and any(w in phrase for w in ['generator', 'online', 'tool']):
            assigned = 'translator-core'
        else:
            assigned = 'general-morse'
    
    vol = int(k['Volume'] or 0)
    traf = int(float(k['Competitor_Traffic'] or 0))
    cluster_counts[assigned]['count'] += 1
    cluster_counts[assigned]['volume'] += vol
    cluster_counts[assigned]['traffic'] += traf

print("Refined Cluster Distribution:")
for cid, stats in sorted(cluster_counts.items(), key=lambda x: x[1]['volume'], reverse=True):
    print(f"  {cid:22} | Kw: {stats['count']:4} | Vol: {stats['volume']:10,d} | Traffic: {stats['traffic']:8,d}")

