import csv
import re
from collections import defaultdict

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'

def classify_keyword_refined(p, vol, kd, cpc, intent_str, comp_url):
    p_lower = p.strip().lower()
    
    # 1. Competitor brand / navigational
    if any(b in p_lower for b in ['morsecode.world', 'morse code world', 'stephen c phillips', 'scphillips']):
        return ('Competitor Brand & Navigational', 'Navigational / Brand', 'Competitor brand query (morsecode.world); low brand equity for third parties.', 'Competitor Brand')

    # 2. Hardware / Commercial physical products
    if any(w in p_lower for w in ['buy', 'for sale', 'ebay', 'amazon', 'schematic', 'circuit', 'arduino', 'kit', 'cw paddle', 'telegraph key for sale']):
        return ('Commercial Hardware & Equipment', 'Irrelevant / Out-of-Scope', 'Physical hardware/electronics purchase intent; our platform is a free browser software platform.', 'Hardware & Electronics')

    # 3. Audio & Sound Morse Decoder
    if any(w in p_lower for w in ['audio', 'sound', 'microphone', 'mic', 'hear', 'listening', 'voice']) and any(w in p_lower for w in ['decode', 'translat', 'convert', 'recogni', 'detect', 'to text', 'from audio']):
        return ('Audio & Sound Morse Decoder', 'Primary / Core Tool', 'Directly targets users needing sound-to-Morse or audio tone decoding; fully supported by our browser-local /audio-decoder.', '/audio-decoder')

    # 4. SOS Distress Signal & Emergency
    if 'sos' in p_lower or '...---...' in p_lower or 'save our ship' in p_lower or 'save our souls' in p_lower or 'distress signal' in p_lower:
        return ('SOS Distress Signal & Emergency', 'Primary / High-Opportunity', 'Huge dedicated search demand (100k+ vol); satisfies emergency signal knowledge and visual/audio beacon simulation.', '/sos')

    # 5. History, Origins, Inventions & Definitions
    history_words = [
        'who invented', 'history', 'when was morse', 'why was morse', 'samuel morse', 'invention',
        'titanic', 'still used', 'what is morse code', 'what are morse code', 'american vs international',
        'telegraph invented', 'origin of morse'
    ]
    if any(hw in p_lower for hw in history_words):
        return ('History, Definition & Origins', 'Informational / Deep Guide', 'High-volume educational query building topical authority and answering origin questions.', '/guides/history-of-morse-code')

    # 6. Specific common phrases / words in morse
    phrase_triggers = [
        'i love you', 'hello', 'help', 'thank you', 'good morning', 'good night', 'yes in morse', 'no in morse',
        'peace in morse', 'i miss you', 'happy birthday', 'welcome', 'goodbye', 'fuck', 'shit', 'smile',
        'hope', 'love in morse', 'friend in morse', 'what does mean in morse', 'in morse code'
    ]
    # Check if phrase is asking for a specific word/phrase translation
    if (any(pt in p_lower for pt in phrase_triggers) or p_lower.endswith(' in morse') or p_lower.endswith(' in morse code')) and not any(w in p_lower for w in ['alphabet', 'chart', 'translator', 'generator', 'convert']):
        return ('Common Morse Phrases & Words', 'Secondary / High-Conversion', 'High organic curiosity for romantic, everyday, and popular phrases; ideal bridge into the interactive translator.', '/guides/morse-code-phrases')

    # 7. Alphabet, Chart & Character Reference
    if any(w in p_lower for w in ['alphabet', 'chart', 'letters', 'table', 'sheet', 'symbol', 'list', 'numbers', 'punctuation', 'prosign', 'character', 'morse code a to z']):
        return ('Morse Code Alphabet & Chart', 'Primary / Reference', 'Essential educational reference demand; directly satisfies searchers looking for A-Z letters and symbols.', '/reference')

    # 8. Learning, practice, quizzes, trainer
    if any(w in p_lower for w in ['learn', 'trainer', 'training', 'practice', 'quiz', 'memoriz', 'study', 'test', 'exam', 'flashcard', 'drill', 'lesson', 'course', 'koch', 'farnsworth']):
        return ('Learning, Drills & Quizzes', 'Primary / Learning Hub', 'Core educational intent aligning directly with Release 2 interactive lessons, drills, and quizzes.', '/learn')

    # 9. Rules, timing, speed, dits/dahs
    if any(w in p_lower for w in ['timing', 'rule', 'rules', 'wpm', 'speed', 'dit dah', 'dots and dash', 'dot and dash', 'dot dash', 'spacing', 'standard', 'paris standard']):
        return ('Morse Code Rules & Timing', 'Informational / Deep Guide', 'High technical search intent explaining ITU standards, dit-to-dah 1:3 ratios, and WPM timing calculations.', '/guides/morse-code-rules-and-timing')

    # 10. Common Misspellings & Typo Queries
    typos = [
        'mores code', 'morris code', 'morae code', 'more code', 'morese code', 'moris code', 'morce code',
        'moscow code', 'mors code', 'moorse code', 'mose code', 'moree code', 'morde code', 'moscode',
        'mourse code', 'moss code', 'morace code', 'mouse code', 'moarse code', 'morose code'
    ]
    if any(tp in p_lower for tp in typos):
        return ('Common Misspellings & Typos', 'Long-tail / Algorithmic Redirect', 'User spelling variants naturally captured and satisfied by homepage title and canonical translator.', '/')

    # 11. Multilingual
    if any(w in p_lower for w in ['traducteur', 'traductor', 'traducir', 'übersetzer', 'traduttore', 'vertaler', 'codigo', 'codice', 'code morse']):
        return ('Multilingual Morse Translation', 'Secondary / International Utility', 'International translation demand; served by our universal translator and roadmapped for Release 4.', '/')

    # 12. Raw dots/dashes / special sequences
    if re.match(r'^[.\-_/ #+]+$', p_lower) or (re.search(r'^[.\-_/ ]+', p_lower) and len(p_lower) < 15):
        return ('Raw Morse String Queries', 'Long-tail / Dynamic Utility', 'Users pasting raw Morse sequences into search; dynamically handled by translator URL parameters and input parsing.', '/')

    # 13. Core Translator & Utility
    if any(w in p_lower for w in ['translat', 'convert', 'generat', 'decod', 'encod', 'writer', 'coder', 'morse code', 'morse']):
        return ('Core Translator & Utility', 'Primary / Core Tool', 'The core product value proposition; drives direct web utility usage.', '/')

    return ('Supporting Informational Queries', 'Long-tail Informational', 'Long-tail informational query related to Morse code mechanics and applications.', '/reference')

with open(f1_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    rows = []
    for r in reader:
        clean = {k.strip().strip('"'): (v.strip().strip('"') if v else '') for k, v in r.items() if k}
        rows.append(clean)

by_phrase = defaultdict(list)
for r in rows:
    p = r['phrase'].strip().lower()
    by_phrase[p].append(r)

clusters = defaultdict(list)
cluster_vol = defaultdict(int)

for phrase, entries in by_phrase.items():
    vol = int(entries[0]['volume']) if entries[0]['volume'].isdigit() else 0
    kd = int(entries[0]['keywordDifficulty']) if entries[0]['keywordDifficulty'].isdigit() else 0
    cpc = float(entries[0]['cpc']) if entries[0]['cpc'].replace('.', '', 1).isdigit() else 0.0
    intents = set()
    for e in entries:
        for k in ['intents.0', 'intents.1', 'intents.2']:
            val = e.get(k, '').strip()
            if val:
                intents.add(val)
    intent_str = '/'.join(sorted(list(intents))) or 'I'
    comp_url = entries[0]['url']
    
    cluster_name, rel_cat, rel_reason, target_url = classify_keyword_refined(phrase, vol, kd, cpc, intent_str, comp_url)
    
    item = {
        'phrase': phrase,
        'volume': vol,
        'kd': kd,
        'cpc': cpc,
        'intent': intent_str,
        'cluster': cluster_name,
        'rel_cat': rel_cat,
        'rel_reason': rel_reason,
        'target_url': target_url
    }
    clusters[cluster_name].append(item)
    cluster_vol[cluster_name] += vol

print("=== REFINED CLUSTER SUMMARY ===")
sorted_clusters = sorted(clusters.items(), key=lambda x: cluster_vol[x[0]], reverse=True)
for cname, items in sorted_clusters:
    avg_kd = sum(i['kd'] for i in items) / len(items) if items else 0
    print(f"{cname:<35} | Vol: {cluster_vol[cname]:>9,d} | Avg KD: {avg_kd:>4.1f} | KWs: {len(items):>4} | Target: {items[0]['target_url']}")

