import csv
import re
from collections import defaultdict

f1_path = r'C:\Users\UR Computers\.gemini\antigravity\brain\fcb3691f-f7fe-4635-af51-86c921be2e56\.user_uploaded\media_1794301185751_1425667f.csv'
out_master_path = r'd:\Project\Morse Code Translator Website\docs\seo\Master-Keyword-Database.csv'
out_cluster_path = r'd:\Project\Morse Code Translator Website\docs\seo\Keyword-Clustering.csv'
out_url_map_path = r'd:\Project\Morse Code Translator Website\docs\seo\Keyword-to-URL-Mapping.csv'

def classify_keyword_refined(p, vol, kd, cpc, intent_str, comp_url):
    p_lower = p.strip().lower()
    
    # 1. Competitor brand / navigational
    if any(b in p_lower for b in ['morsecode.world', 'morse code world', 'stephen c phillips', 'scphillips']):
        return ('Competitor Brand & Navigational', 'Navigational / Brand', 'Competitor brand query (morsecode.world); low brand equity for third parties.', 'Competitor Brand', 'Exclude from targeting; do not optimize or bid.')

    # 2. Hardware / Commercial physical products
    if any(w in p_lower for w in ['buy', 'for sale', 'ebay', 'amazon', 'schematic', 'circuit', 'arduino', 'kit', 'cw paddle', 'telegraph key for sale']):
        return ('Commercial Hardware & Equipment', 'Irrelevant / Out-of-Scope', 'Physical hardware/electronics purchase intent; our platform is a free browser software platform.', 'Hardware & Electronics', 'Out of scope per PRD; zero hardware sales.')

    # 3. Audio & Sound Morse Decoder
    if any(w in p_lower for w in ['audio', 'sound', 'microphone', 'mic', 'hear', 'listening', 'voice']) and any(w in p_lower for w in ['decode', 'translat', 'convert', 'recogni', 'detect', 'to text', 'from audio']):
        return ('Audio & Sound Morse Decoder', 'Primary / Core Tool', 'Directly targets users needing sound-to-Morse or audio tone decoding; fully supported by our browser-local /audio-decoder.', '/audio-decoder', 'Existing Tool Page: /audio-decoder')

    # 4. SOS Distress Signal & Emergency
    if 'sos' in p_lower or '...---...' in p_lower or 'save our ship' in p_lower or 'save our souls' in p_lower or 'distress signal' in p_lower:
        return ('SOS Distress Signal & Emergency', 'Primary / High-Opportunity', 'Huge dedicated search demand (100k+ vol); satisfies emergency signal knowledge and visual/audio beacon simulation.', '/sos', 'Recommended New High-Value Page: /sos')

    # 5. History, Origins, Inventions & Definitions
    history_words = [
        'who invented', 'history', 'when was morse', 'why was morse', 'samuel morse', 'invention',
        'titanic', 'still used', 'what is morse code', 'what are morse code', 'american vs international',
        'telegraph invented', 'origin of morse'
    ]
    if any(hw in p_lower for hw in history_words):
        return ('History, Definition & Origins', 'Informational / Deep Guide', 'High-volume educational query building topical authority and answering origin questions.', '/guides/history-of-morse-code', 'Recommended Supporting Guide: /guides/history-of-morse-code')

    # 6. Specific common phrases / words in morse
    phrase_triggers = [
        'i love you', 'hello', 'help', 'thank you', 'good morning', 'good night', 'yes in morse', 'no in morse',
        'peace in morse', 'i miss you', 'happy birthday', 'welcome', 'goodbye', 'fuck', 'shit', 'smile',
        'hope', 'love in morse', 'friend in morse', 'what does mean in morse', 'in morse code'
    ]
    if (any(pt in p_lower for pt in phrase_triggers) or p_lower.endswith(' in morse') or p_lower.endswith(' in morse code')) and not any(w in p_lower for w in ['alphabet', 'chart', 'translator', 'generator', 'convert']):
        return ('Common Morse Phrases & Words', 'Secondary / High-Conversion', 'High organic curiosity for romantic, everyday, and popular phrases; ideal bridge into the interactive translator.', '/guides/morse-code-phrases', 'Recommended Reference Guide: /guides/morse-code-phrases')

    # 7. Alphabet, Chart & Character Reference
    if any(w in p_lower for w in ['alphabet', 'chart', 'letters', 'table', 'sheet', 'symbol', 'list', 'numbers', 'punctuation', 'prosign', 'character', 'morse code a to z']):
        return ('Morse Code Alphabet & Chart', 'Primary / Reference', 'Essential educational reference demand; directly satisfies searchers looking for A-Z letters and symbols.', '/reference', 'Existing Reference Page: /reference')

    # 8. Learning, practice, quizzes, trainer
    if any(w in p_lower for w in ['learn', 'trainer', 'training', 'practice', 'quiz', 'memoriz', 'study', 'test', 'exam', 'flashcard', 'drill', 'lesson', 'course', 'koch', 'farnsworth']):
        return ('Learning, Drills & Quizzes', 'Primary / Learning Hub', 'Core educational intent aligning directly with Release 2 interactive lessons, drills, and quizzes.', '/learn', 'Existing Learning Hub & Sub-routes: /learn, /practice, /quiz')

    # 9. Rules, timing, speed, dits/dahs
    if any(w in p_lower for w in ['timing', 'rule', 'rules', 'wpm', 'speed', 'dit dah', 'dots and dash', 'dot and dash', 'dot dash', 'spacing', 'standard', 'paris standard']):
        return ('Morse Code Rules & Timing', 'Informational / Deep Guide', 'High technical search intent explaining ITU standards, dit-to-dah 1:3 ratios, and WPM timing calculations.', '/guides/morse-code-rules-and-timing', 'Recommended Supporting Guide: /guides/morse-code-rules-and-timing')

    # 10. Common Misspellings & Typo Queries
    typos = [
        'mores code', 'morris code', 'morae code', 'more code', 'morese code', 'moris code', 'morce code',
        'moscow code', 'mors code', 'moorse code', 'mose code', 'moree code', 'morde code', 'moscode',
        'mourse code', 'moss code', 'morace code', 'mouse code', 'moarse code', 'morose code'
    ]
    if any(tp in p_lower for tp in typos):
        return ('Common Misspellings & Typos', 'Long-tail / Algorithmic Redirect', 'User spelling variants naturally captured and satisfied by homepage title and canonical translator.', '/', 'Homepage: / (Resolved automatically via Google RankBrain)')

    # 11. Multilingual
    if any(w in p_lower for w in ['traducteur', 'traductor', 'traducir', 'übersetzer', 'traduttore', 'vertaler', 'codigo', 'codice', 'code morse']):
        return ('Multilingual Morse Translation', 'Secondary / International Utility', 'International translation demand; served by our universal translator and roadmapped for Release 4.', '/', 'Homepage: / (Multilingual UI planned for Release 4)')

    # 12. Raw dots/dashes / special sequences
    if re.match(r'^[.\-_/ #+]+$', p_lower) or (re.search(r'^[.\-_/ ]+', p_lower) and len(p_lower) < 15):
        return ('Raw Morse String Queries', 'Long-tail / Dynamic Utility', 'Users pasting raw Morse sequences into search; dynamically handled by translator URL parameters and input parsing.', '/', 'Homepage: / (Handled dynamically via URL parameter or auto-detection)')

    # 13. Core Translator & Utility
    if any(w in p_lower for w in ['translat', 'convert', 'generat', 'decod', 'encod', 'writer', 'coder', 'morse code', 'morse']):
        return ('Core Translator & Utility', 'Primary / Core Tool', 'The core product value proposition; drives direct web utility usage.', '/', 'Homepage: / (Core Translator)')

    return ('Supporting Informational Queries', 'Long-tail Informational', 'Long-tail informational query related to Morse code mechanics and applications.', '/reference', 'Existing Reference / FAQ: /reference or /faq')

def build_all_seo_data():
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

    master_records = []
    cluster_records = defaultdict(list)

    for phrase, entries in by_phrase.items():
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
        intent_map = {'I': 'Informational', 'C': 'Commercial', 'N': 'Navigational', 'T': 'Transactional'}
        full_intents = [intent_map.get(i, i) for i in sorted(list(intents_set))]
        intent_str = ' / '.join(full_intents) if full_intents else 'Informational'
        
        # Best position
        positions = [int(e['position']) for e in entries if e['position'].isdigit()]
        best_pos = min(positions) if positions else 999
        
        # Total traffic across positions
        total_traffic = sum(int(e['traffic']) for e in entries if e['traffic'].isdigit())
        total_traffic_cost = sum(int(e['trafficCost']) for e in entries if e['trafficCost'].isdigit())
        
        # Competitor URLs
        urls = list(dict.fromkeys(e['url'] for e in entries if e['url']))
        best_entry = max(entries, key=lambda e: (int(e['traffic']) if e['traffic'].isdigit() else 0, -int(e['position']) if e['position'].isdigit() else -999))
        primary_url = best_entry['url']
        crawled_time = best_entry['crawledTime']
        
        cluster_name, rel_cat, rel_reason, target_url, url_action = classify_keyword_refined(phrase, vol, kd, cpc, intent_str, primary_url)
        
        record = {
            'phrase': phrase,
            'volume': vol,
            'keywordDifficulty': kd,
            'cpc': f"{cpc:.2f}",
            'intent': intent_str,
            'competitor_best_position': best_pos,
            'competitor_traffic': total_traffic,
            'competitor_traffic_cost': total_traffic_cost,
            'competitor_primary_url': primary_url,
            'competitor_all_urls': ' | '.join(urls),
            'crawled_time': crawled_time,
            'relevance_category': rel_cat,
            'relevance_reason': rel_reason,
            'target_topic_cluster': cluster_name,
            'recommended_url': target_url,
            'implementation_action': url_action
        }
        master_records.append(record)
        cluster_records[cluster_name].append(record)

    # Sort master records by volume descending, then competitor traffic descending
    master_records.sort(key=lambda x: (x['volume'], x['competitor_traffic']), reverse=True)
    
    # 1. Write Master-Keyword-Database.csv
    master_fieldnames = [
        'phrase', 'volume', 'keywordDifficulty', 'cpc', 'intent',
        'competitor_best_position', 'competitor_traffic', 'competitor_traffic_cost',
        'competitor_primary_url', 'competitor_all_urls', 'crawled_time',
        'relevance_category', 'relevance_reason', 'target_topic_cluster',
        'recommended_url', 'implementation_action'
    ]
    with open(out_master_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=master_fieldnames)
        writer.writeheader()
        writer.writerows(master_records)
    print(f"Wrote {len(master_records)} records to {out_master_path}")

    # 2. Build Keyword-Clustering.csv
    cluster_fieldnames = [
        'cluster_id', 'cluster_name', 'search_intent', 'total_non_overlapping_volume',
        'average_keyword_difficulty', 'keyword_count', 'primary_target_keyword',
        'primary_keyword_volume', 'primary_keyword_kd', 'core_secondary_keywords',
        'recommended_url', 'page_type', 'cannibalization_defense_and_intent_boundaries'
    ]
    
    cluster_metadata = {
        'Core Translator & Utility': {
            'id': 'CL-01',
            'intent': 'Commercial / Informational (Utility Tool)',
            'page_type': 'Existing Tool Page (Core Product)',
            'defense': 'Dedicated to direct bidirectional conversion (text <-> morse). Explicitly redirects queries for audio tone decoding to /audio-decoder, alphabet tables to /reference, and distress beacons to /sos to prevent cannibalization.'
        },
        'Raw Morse String Queries': {
            'id': 'CL-02',
            'intent': 'Utility / Dynamic Lookup',
            'page_type': 'Existing Tool Page (Homepage Dynamic Input)',
            'defense': 'Zero static pages created for raw dot/dash permutations (prevents thin content / doorway page penalties). Handled dynamically by homepage translator via pre-filled input or instant decoding.'
        },
        'SOS Distress Signal & Emergency': {
            'id': 'CL-03',
            'intent': 'Informational & Interactive Emergency Tool',
            'page_type': 'Recommended New High-Value Page (/sos)',
            'defense': 'Clearly demarcated from the generic translator. Focuses exclusively on the 3-dit/3-dah/3-dit emergency prosign, maritime history (Titanic), visual emergency strobe simulation, and distress signaling rules.'
        },
        'Common Morse Phrases & Words': {
            'id': 'CL-04',
            'intent': 'Informational & Interactive Reference',
            'page_type': 'Recommended Reference Guide (/guides/morse-code-phrases)',
            'defense': 'Aggregates romantic and common phrases ("I love you", "Hello", "Thank you", "Help") into a single authoritative hub rather than creating thin single-phrase pages. Links to translator with pre-filled inputs.'
        },
        'Morse Code Alphabet & Chart': {
            'id': 'CL-05',
            'intent': 'Informational Reference',
            'page_type': 'Existing Reference Page (/reference)',
            'defense': 'Dedicated to character reference tables (A-Z, 0-9, punctuation, prosigns) and individual audio samples. Does not attempt to be a full sentence translator.'
        },
        'Multilingual Morse Translation': {
            'id': 'CL-06',
            'intent': 'International Utility',
            'page_type': 'Existing Tool Page (Release 4 Multilingual UI)',
            'defense': 'International search queries (code morse, traductor morse) land on homepage. Clean hreflang and localized routes planned for Release 4 without creating thin auto-translated pages now.'
        },
        'Common Misspellings & Typos': {
            'id': 'CL-07',
            'intent': 'Navigational / Utility',
            'page_type': 'Homepage Canonical Target (Algorithmic Catch)',
            'defense': 'Do NOT create pages targeting misspellings (e.g. "morris code"). Handled via natural brand signals and Google rank-time spell correction mapping to /.'
        },
        'Audio & Sound Morse Decoder': {
            'id': 'CL-08',
            'intent': 'Utility (Audio Recognition Tool)',
            'page_type': 'Existing Tool Page (/audio-decoder)',
            'defense': 'Exclusively dedicated to real-time audio microphone listening, audio file decoding, and tone analysis. Links back to text translator for manual typing.'
        },
        'History, Definition & Origins': {
            'id': 'CL-09',
            'intent': 'Informational Authority',
            'page_type': 'Recommended Deep Guide (/guides/history-of-morse-code)',
            'defense': 'Thorough historical essay covering Samuel Morse, telegraphy evolution, American vs International Morse, and maritime usage. Does not duplicate reference tables or translator UI.'
        },
        'Learning, Drills & Quizzes': {
            'id': 'CL-10',
            'intent': 'Educational / Training',
            'page_type': 'Existing Learning Hub (/learn, /practice, /quiz)',
            'defense': 'Focuses on pedagogical methodologies (Koch method, Farnsworth timing), structured 10-lesson curriculum, interactive dit/dah drills, and quiz tests. No cannibalization with quick reference chart.'
        },
        'Competitor Brand & Navigational': {
            'id': 'CL-11',
            'intent': 'Navigational',
            'page_type': 'Excluded / Non-Targeted',
            'defense': 'Competitor brand queries (morsecode.world, Stephen C Phillips). Strictly excluded from target keywords to avoid trademark issues and misleading user intent.'
        },
        'Supporting Informational Queries': {
            'id': 'CL-12',
            'intent': 'Informational',
            'page_type': 'Existing FAQ & Reference (/faq, /reference)',
            'defense': 'Long-tail informational questions answered in structured accordion FAQs and glossary notes on /faq and /reference.'
        },
        'Morse Code Rules & Timing': {
            'id': 'CL-13',
            'intent': 'Informational / Technical Standard',
            'page_type': 'Recommended Supporting Guide (/guides/morse-code-rules-and-timing)',
            'defense': 'Explains technical specifications: 1 unit dot, 3 unit dash, 1 unit intra-char, 3 unit letter space, 7 unit word space, and PARIS WPM standard. Prevents cluttering the homepage translator.'
        },
        'Commercial Hardware & Equipment': {
            'id': 'CL-14',
            'intent': 'Commercial (Physical Products)',
            'page_type': 'Excluded / Non-Targeted',
            'defense': 'Physical telegraph hardware queries excluded per PRD non-goals (our platform is 100% free software utility, zero physical sales).'
        }
    }

    cluster_rows = []
    for cname, items in sorted(cluster_records.items(), key=lambda x: sum(i['volume'] for i in x[1]), reverse=True):
        meta = cluster_metadata.get(cname, {
            'id': 'CL-XX', 'intent': 'Informational', 'page_type': 'Informational', 'defense': 'Maintained through distinct H1 and canonical mapping.'
        })
        tot_vol = sum(i['volume'] for i in items)
        avg_kd = round(sum(i['keywordDifficulty'] for i in items) / len(items), 1) if items else 0.0
        kw_count = len(items)
        
        # Primary keyword is the highest volume keyword in cluster
        sorted_items = sorted(items, key=lambda x: (x['volume'], x['competitor_traffic']), reverse=True)
        primary_kw = sorted_items[0]['phrase']
        primary_vol = sorted_items[0]['volume']
        primary_kd = sorted_items[0]['keywordDifficulty']
        
        # Secondary keywords (next 3-5 top keywords)
        sec_kws = [i['phrase'] for i in sorted_items[1:6]]
        sec_str = ' | '.join(sec_kws) if sec_kws else 'N/A'
        rec_url = sorted_items[0]['recommended_url']
        
        cluster_rows.append({
            'cluster_id': meta['id'],
            'cluster_name': cname,
            'search_intent': meta['intent'],
            'total_non_overlapping_volume': tot_vol,
            'average_keyword_difficulty': avg_kd,
            'keyword_count': kw_count,
            'primary_target_keyword': primary_kw,
            'primary_keyword_volume': primary_vol,
            'primary_keyword_kd': primary_kd,
            'core_secondary_keywords': sec_str,
            'recommended_url': rec_url,
            'page_type': meta['page_type'],
            'cannibalization_defense_and_intent_boundaries': meta['defense']
        })

    with open(out_cluster_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=cluster_fieldnames)
        writer.writeheader()
        writer.writerows(cluster_rows)
    print(f"Wrote {len(cluster_rows)} clusters to {out_cluster_path}")

    # 3. Build Keyword-to-URL-Mapping.csv
    # Create precise URL mapping for all pages in architecture
    url_map_fieldnames = [
        'url_slug', 'page_title', 'page_status', 'target_cluster_id', 'target_cluster_name',
        'primary_keyword', 'primary_keyword_volume', 'primary_keyword_kd',
        'total_cluster_volume', 'core_secondary_keywords', 'search_intent',
        'feature_and_tool_alignment', 'priority'
    ]

    url_mappings = [
        {
            'url_slug': '/',
            'page_title': 'Morse Code Translator — Free Text, Audio Player & Visual Flasher',
            'page_status': 'Existing Page (Core Tool)',
            'target_cluster_id': 'CL-01',
            'target_cluster_name': 'Core Translator & Utility',
            'primary_keyword': 'morse code translator',
            'primary_keyword_volume': 246000,
            'primary_keyword_kd': 40,
            'total_cluster_volume': 1114870,
            'core_secondary_keywords': 'morse code generator | morse code decoder | morse code converter | morse code to english | english to morse code',
            'search_intent': 'Commercial / Informational (Utility Tool)',
            'feature_and_tool_alignment': 'Real-time bidirectional engine, Web Audio tone player (5-30 WPM, 600Hz), on-screen visual flash simulation, one-click copy, swap direction, WAV audio download.',
            'priority': 'P1 (Existing Live Anchor)'
        },
        {
            'url_slug': '/audio-decoder',
            'page_title': 'Morse Code Audio Decoder — Real-Time Microphone & Sound to Text',
            'page_status': 'Existing Page (New Tool)',
            'target_cluster_id': 'CL-08',
            'target_cluster_name': 'Audio & Sound Morse Decoder',
            'primary_keyword': 'sound to morse code translator',
            'primary_keyword_volume': 2400,
            'primary_keyword_kd': 10,
            'total_cluster_volume': 19600,
            'core_secondary_keywords': 'morse code audio decoder | morse code translator audio | morse code audio to text | sound to morse code | morse sound translator',
            'search_intent': 'Utility (Sound Recognition Tool)',
            'feature_and_tool_alignment': 'Web Audio API microphone tone analysis, real-time Goertzel tone detector, adaptive signal threshold, browser-local zero-server audio processing.',
            'priority': 'P1 (Existing Live Tool)'
        },
        {
            'url_slug': '/reference',
            'page_title': 'Morse Code Alphabet & Chart — Searchable International Reference',
            'page_status': 'Existing Page (Reference Tool)',
            'target_cluster_id': 'CL-05',
            'target_cluster_name': 'Morse Code Alphabet & Chart',
            'primary_keyword': 'morse code alphabet',
            'primary_keyword_volume': 40500,
            'primary_keyword_kd': 36,
            'total_cluster_volume': 61680,
            'core_secondary_keywords': 'morse code chart | morse alphabet | morse code letters | morse code alphabet chart | morse code table',
            'search_intent': 'Informational Reference',
            'feature_and_tool_alignment': 'Complete searchable International Morse chart (A-Z, 0-9, punctuation, prosigns), instant audio preview per character, copy dit-dah symbols.',
            'priority': 'P1 (Existing Live Page)'
        },
        {
            'url_slug': '/learn',
            'page_title': 'Learn Morse Code — 10 Interactive Beginner Lessons',
            'page_status': 'Existing Page (Learning Platform)',
            'target_cluster_id': 'CL-10',
            'target_cluster_name': 'Learning, Drills & Quizzes',
            'primary_keyword': 'learn morse code',
            'primary_keyword_volume': 2400,
            'primary_keyword_kd': 48,
            'total_cluster_volume': 10600,
            'core_secondary_keywords': 'how to learn morse code | morse code trainer | how to read morse code | morse code practice | morse code training',
            'search_intent': 'Educational / Training',
            'feature_and_tool_alignment': 'Structured 10-lesson progression, interactive dit/dah exercises, local storage progress persistence, Koch method principles.',
            'priority': 'P1 (Existing Live Hub)'
        },
        {
            'url_slug': '/practice',
            'page_title': 'Morse Code Practice Drills — Interactive Audio & Visual Exercises',
            'page_status': 'Existing Page (Practice Sub-route)',
            'target_cluster_id': 'CL-10',
            'target_cluster_name': 'Learning, Drills & Quizzes',
            'primary_keyword': 'morse code practice',
            'primary_keyword_volume': 1900,
            'primary_keyword_kd': 30,
            'total_cluster_volume': 10600,
            'core_secondary_keywords': 'morse code trainer | morse code exercises | morse code drills | learn morse code practice',
            'search_intent': 'Educational / Interactive Drill',
            'feature_and_tool_alignment': 'Randomized flashcard drills, audio ear training, visual signal recognition, instant feedback with keyboard shortcuts.',
            'priority': 'P1 (Existing Live Page)'
        },
        {
            'url_slug': '/quiz',
            'page_title': 'Morse Code Quiz — Test Your Knowledge Across 5 Challenge Modes',
            'page_status': 'Existing Page (Quiz Sub-route)',
            'target_cluster_id': 'CL-10',
            'target_cluster_name': 'Learning, Drills & Quizzes',
            'primary_keyword': 'morse code quiz',
            'primary_keyword_volume': 880,
            'primary_keyword_kd': 22,
            'total_cluster_volume': 10600,
            'core_secondary_keywords': 'morse code test | morse code exam | morse code challenge | morse code knowledge test',
            'search_intent': 'Educational / Assessment',
            'feature_and_tool_alignment': '5 challenge modes (letters, numbers, reverse, audio tone, mixed speed), score calculation, question review with error explanations.',
            'priority': 'P1 (Existing Live Page)'
        },
        {
            'url_slug': '/sos',
            'page_title': 'SOS in Morse Code — Emergency Signal Meaning, Audio & Light Beacon',
            'page_status': 'Recommended New High-Value Page',
            'target_cluster_id': 'CL-03',
            'target_cluster_name': 'SOS Distress Signal & Emergency',
            'primary_keyword': 'sos code in morse',
            'primary_keyword_volume': 14800,
            'primary_keyword_kd': 21,
            'total_cluster_volume': 103260,
            'core_secondary_keywords': 'sos morse code | sos in morse code | s o s in morse | ...---... | what is sos in morse code',
            'search_intent': 'Informational & Interactive Emergency Tool',
            'feature_and_tool_alignment': 'Pre-loaded one-click SOS audio tone player (... --- ...), emergency visual flashing beacon, Titanic distress history, maritime radio protocol facts.',
            'priority': 'P1 (Highest New Content Opportunity)'
        },
        {
            'url_slug': '/guides/morse-code-phrases',
            'page_title': 'Common Morse Code Phrases — "I Love You", "Hello" & Everyday Words',
            'page_status': 'Recommended New Reference Guide',
            'target_cluster_id': 'CL-04',
            'target_cluster_name': 'Common Morse Phrases & Words',
            'primary_keyword': 'i love you in morse code',
            'primary_keyword_volume': 5400,
            'primary_keyword_kd': 11,
            'total_cluster_volume': 91390,
            'core_secondary_keywords': 'hello in morse code | help in morse code | thank you in morse code | good morning in morse code | morse code words',
            'search_intent': 'Informational & Interactive Reference',
            'feature_and_tool_alignment': 'Interactive phrase cards with audio playback button, copy button, and "Open in Translator" pre-filled link.',
            'priority': 'P2 (High Organic Traffic & Viral Reach)'
        },
        {
            'url_slug': '/guides/history-of-morse-code',
            'page_title': 'History of Morse Code — Samuel Morse, Telegraphy & Modern Usage',
            'page_status': 'Recommended New Supporting Guide',
            'target_cluster_id': 'CL-09',
            'target_cluster_name': 'History, Definition & Origins',
            'primary_keyword': 'what is morse code',
            'primary_keyword_volume': 6600,
            'primary_keyword_kd': 55,
            'total_cluster_volume': 13290,
            'core_secondary_keywords': 'who invented morse code | samuel morse | history of morse code | when was morse code invented | is morse code still used',
            'search_intent': 'Informational Authority',
            'feature_and_tool_alignment': 'Topical authority article connecting telegraph history to modern amateur radio (CW), maritime standards, and links to /reference and /learn.',
            'priority': 'P2 (Topical Authority Anchor)'
        },
        {
            'url_slug': '/guides/morse-code-rules-and-timing',
            'page_title': 'Morse Code Rules & Timing — Dit-to-Dah Ratios & the PARIS Standard',
            'page_status': 'Recommended New Supporting Guide',
            'target_cluster_id': 'CL-13',
            'target_cluster_name': 'Morse Code Rules & Timing',
            'primary_keyword': 'morse code rules',
            'primary_keyword_volume': 1300,
            'primary_keyword_kd': 24,
            'total_cluster_volume': 1380,
            'core_secondary_keywords': 'morse code timing | morse code wpm | morse code dots and dashes | morse code spacing | paris standard morse code',
            'search_intent': 'Informational / Technical Standard',
            'feature_and_tool_alignment': 'Directly explains the mathematics behind our audio engine: 1:3:7 ITU-R M.1677-1 timing rules, WPM calculation, and Farnsworth spacing.',
            'priority': 'P3 (Technical Authority & Direct Tool Integration)'
        },
        {
            'url_slug': '/faq',
            'page_title': 'Morse Code FAQ — Answers to Common Questions About Morse Code',
            'page_status': 'Existing Page (FAQ Hub)',
            'target_cluster_id': 'CL-12',
            'target_cluster_name': 'Supporting Informational Queries',
            'primary_keyword': 'morse code questions',
            'primary_keyword_volume': 320,
            'primary_keyword_kd': 20,
            'total_cluster_volume': 5300,
            'core_secondary_keywords': 'how does morse code work | is morse code still used | can you learn morse code online | what does morse code sound like',
            'search_intent': 'Informational (FAQ)',
            'feature_and_tool_alignment': 'Interactive accessible FAQ accordion with FAQPage JSON-LD schema, addressing common beginner concerns and routing to tools.',
            'priority': 'P3 (Support & Rich Snippet Target)'
        }
    ]

    with open(out_url_map_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=url_map_fieldnames)
        writer.writeheader()
        writer.writerows(url_mappings)
    print(f"Wrote {len(url_mappings)} URL mappings to {out_url_map_path}")

build_all_seo_data()

