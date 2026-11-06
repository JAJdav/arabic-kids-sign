import sqlite3
import json
import os

db_path = os.path.join('database', 'lughaty.db')
if os.path.exists(db_path):
    os.remove(db_path)

conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

with open('database/schema.sql', 'r', encoding='utf-8') as f:
    cursor.executescript(f.read())

with open('data/curriculum.json', 'r', encoding='utf-8') as f:
    curriculum = json.load(f)
with open('data/sign_mapping.json', 'r', encoding='utf-8') as f:
    sign_mapping = json.load(f)

for unit in curriculum["units"]:
    cursor.execute("INSERT INTO units (id, title, unit_order) VALUES (?, ?, ?)", (unit["id"], unit["title"], unit["id"]))
    for lesson in unit["lessons"]:
        cursor.execute("INSERT INTO lessons (id, unit_id, title, lesson_order) VALUES (?, ?, ?, ?)", (lesson["id"], unit["id"], lesson["title"], lesson["id"]))
        for idx, word_item in enumerate(lesson["vocabulary"], start=1):
            vocab_id = lesson["id"] * 100 + idx
            cursor.execute("INSERT INTO vocabulary (id, lesson_id, arabic_word, diacritics, meaning, illustration_path) VALUES (?, ?, ?, ?, ?, ?)",
                           (vocab_id, lesson["id"], word_item["word"], word_item["diacritics"], word_item["meaning"], "/static/images/placeholder.png"))
            sign_info = sign_mapping.get(word_item["word"], {})
            cursor.execute("INSERT INTO sign_resources (vocabulary_id, official_source, official_url, verification_status, reviewer_notes) VALUES (?, ?, ?, ?, ?)",
                           (vocab_id, "SSHI", sign_info.get("official_url", ""), sign_info.get("status", "Needs Review"), sign_info.get("notes", "")))
        for sentence in lesson["sentences"]:
            cursor.execute("INSERT INTO sentences (lesson_id, sentence_text) VALUES (?, ?)", (lesson["id"], sentence))

conn.commit()
conn.close()
print("✅ Database initialized successfully at database/lughaty.db")