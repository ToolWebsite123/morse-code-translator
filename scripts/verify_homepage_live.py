import urllib.request
import json
import re

url = "http://localhost:3000/"
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        status = resp.status
        print(f"Server Status: {status} OK")
        print(f"HTML Payload Size: {len(html)} bytes")

        # 1. Metadata check
        title_match = re.search(r"<title>(.*?)</title>", html)
        print(f"Title: {title_match.group(1) if title_match else 'MISSING'}")

        desc_match = re.search(r'<meta name="description" content="(.*?)"', html)
        print(f"Description: {desc_match.group(1) if desc_match else 'MISSING'}")

        canon_match = re.search(r'<link rel="canonical" href="(.*?)"', html)
        print(f"Canonical URL: {canon_match.group(1) if canon_match else 'MISSING'}")

        # 2. H1 Check
        h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL)
        if h1_match:
            clean_h1 = re.sub(r"<[^>]+>", "", h1_match.group(1)).strip()
            print(f"H1: {clean_h1}")

        # 3. Check Internal Links
        for path in ["/reference", "/learn", "/practice", "/quiz", "/sos", "/audio-decoder"]:
            present = f'href="{path}"' in html
            print(f"Link {path}: {'PRESENT' if present else 'ABSENT'}")

        # 4. JSON-LD Schemas
        json_ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
        print(f"JSON-LD Script Blocks Found: {len(json_ld_blocks)}")
        for idx, block in enumerate(json_ld_blocks, 1):
            try:
                parsed = json.loads(block)
                if isinstance(parsed, list):
                    for item in parsed:
                        print(f"  Block {idx} item @type: {item.get('@type')} (name: {item.get('name', 'N/A')})")
                else:
                    print(f"  Block {idx} @type: {parsed.get('@type')} (name: {parsed.get('name', 'N/A')})")
            except Exception as ex:
                print(f"  Block {idx} JSON parse error: {ex}")

except Exception as e:
    print(f"Error accessing {url}: {e}")

