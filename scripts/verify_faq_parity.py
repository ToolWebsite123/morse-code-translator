import urllib.request
import json
import re

url = "http://localhost:3000/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

# Extract JSON-LD FAQPage
blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
faq_schema = None
for b in blocks:
    data = json.loads(b)
    if isinstance(data, list):
        for item in data:
            if item.get("@type") == "FAQPage":
                faq_schema = item
    elif isinstance(data, dict) and data.get("@type") == "FAQPage":
        faq_schema = data

print("FAQ Schema Found:", faq_schema is not None)
if faq_schema:
    entities = faq_schema.get("mainEntity", [])
    print(f"Total Questions in FAQ Schema: {len(entities)}")
    all_match = True
    for q in entities:
        question_name = q.get("name", "")
        answer_text = q.get("acceptedAnswer", {}).get("text", "")
        # Check if question appears in HTML
        in_html_q = question_name in html
        in_html_a = answer_text[:40] in html
        print(f"  Q: '{question_name[:45]}...' -> In HTML: {in_html_q} | Answer match: {in_html_a}")
        if not in_html_q:
            all_match = False
    print("Schema-to-HTML 100% Parity:", all_match)

