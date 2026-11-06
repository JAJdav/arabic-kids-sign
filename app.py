import os
import sqlite3
import random
from flask import Flask, render_template, g, abort, jsonify, request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "lughaty.db")

app = Flask(__name__)

# Illustration mapping
ILLUSTRATIONS = {
    "طائرة": "✈️", "نافذة": "🪟", "سحاب": "☁️", "مضيف": "👨‍✈️", "حقيبة": "🎒",
    "مدرسة": "🏫", "فصل": "🚪", "معلم": "👨‍🏫", "كتاب": "📖", "قلم": "✏️",
    "الرياض": "🏙️", "ملك": "👑", "شجاع": "🦁", "تاريخ": "📜", "قصر": "🏰",
    "مصيف": "🏖️", "جبل": "⛰️", "طقس": "🌤️", "بارد": "❄️", "أسرة": "👨‍👩‍👧‍👦",
    "تعاون": "🤝", "مساعدة": "🆘", "عمل": "🔨", "جماعة": "👥", "نجاح": "🏆",
    "إيثار": "💝", "حب": "❤️", "أخ": "👦", "عطاء": "🎁", "كريم": "🌟",
    "هاتف": "📱", "محمول": "📲", "أقمار": "🌙", "صناعية": "🛰️", "سيارة": "🚗", "قطار": "🚂"
}

def get_illustration(word):
    return ILLUSTRATIONS.get(word, "🖼️")

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()

# ==========================================
# PAGE ROUTES (HTML)
# ==========================================

@app.route("/")
def index():
    db = get_db()
    units = db.execute("SELECT * FROM units ORDER BY unit_order").fetchall()
    featured = db.execute("""
        SELECT v.*, s.verification_status 
        FROM vocabulary v 
        LEFT JOIN sign_resources s ON s.vocabulary_id = v.id 
        WHERE s.verification_status = 'Verified' 
        LIMIT 1
    """).fetchone()
    return render_template("index.html", units=units, featured=featured)

@app.route("/units")
def units_page():
    db = get_db()
    units = db.execute("SELECT * FROM units ORDER BY unit_order").fetchall()
    return render_template("units.html", units=units)

@app.route("/unit/<int:unit_id>")
def unit(unit_id):
    db = get_db()
    unit = db.execute("SELECT * FROM units WHERE id = ?", (unit_id,)).fetchone()
    if unit is None:
        abort(404)
    lessons = db.execute("SELECT * FROM lessons WHERE unit_id = ? ORDER BY lesson_order", (unit_id,)).fetchall()
    return render_template("unit.html", unit=unit, lessons=lessons)

@app.route("/lesson/<int:lesson_id>")
def lesson(lesson_id):
    db = get_db()
    lesson = db.execute("SELECT * FROM lessons WHERE id = ?", (lesson_id,)).fetchone()
    if lesson is None:
        abort(404)
    vocab = db.execute("""
        SELECT v.*, s.official_url, s.verification_status, s.official_source
        FROM vocabulary v 
        LEFT JOIN sign_resources s ON s.vocabulary_id = v.id
        WHERE v.lesson_id = ?
    """, (lesson_id,)).fetchall()
    sentences = db.execute("SELECT * FROM sentences WHERE lesson_id = ?", (lesson_id,)).fetchall()
    return render_template("lesson.html", lesson=lesson, vocab=vocab, sentences=sentences)

@app.route("/word/<int:vocab_id>")
def word(vocab_id):
    db = get_db()
    word_data = db.execute("""
        SELECT v.*, l.title as lesson_title, u.title as unit_title
        FROM vocabulary v 
        JOIN lessons l ON v.lesson_id = l.id 
        JOIN units u ON l.unit_id = u.id
        WHERE v.id = ?
    """, (vocab_id,)).fetchone()
    
    if word_data is None:
        abort(404)
    
    sign_resource = db.execute(
        "SELECT * FROM sign_resources WHERE vocabulary_id = ?", 
        (vocab_id,)
    ).fetchone()
    
    illustration = get_illustration(word_data['arabic_word'])
    
    return render_template(
        "word.html", 
        word=word_data, 
        sign_resource=sign_resource, 
        illustration=illustration
    )

@app.route("/games")
def games_page():
    return render_template("games.html")

@app.route("/game/memory")
def memory_game_page():
    return render_template("memory_game.html")

@app.route("/game/quiz")
def quiz_game_page():
    return render_template("quiz.html")

@app.route("/favorites")
def favorites_page():
    return render_template("favorites.html")

# ==========================================
# API ROUTES (JSON)
# ==========================================

@app.route("/api/units")
def api_units():
    db = get_db()
    return jsonify([dict(u) for u in db.execute("SELECT * FROM units ORDER BY unit_order").fetchall()])

@app.route("/api/units/<int:unit_id>/lessons")
def api_lessons(unit_id):
    db = get_db()
    return jsonify([dict(l) for l in db.execute(
        "SELECT * FROM lessons WHERE unit_id = ? ORDER BY lesson_order", 
        (unit_id,)
    ).fetchall()])

@app.route("/api/lessons/<int:lesson_id>/words")
def api_words(lesson_id):
    db = get_db()
    return jsonify([dict(w) for w in db.execute("""
        SELECT v.*, s.official_url, s.verification_status
        FROM vocabulary v 
        LEFT JOIN sign_resources s ON s.vocabulary_id = v.id
        WHERE v.lesson_id = ?
    """, (lesson_id,)).fetchall()])

@app.route("/api/words/<int:vocab_id>")
def api_word(vocab_id):
    db = get_db()
    word_data = db.execute("""
        SELECT v.*, l.title as lesson_title, u.title as unit_title
        FROM vocabulary v 
        JOIN lessons l ON v.lesson_id = l.id 
        JOIN units u ON l.unit_id = u.id
        WHERE v.id = ?
    """, (vocab_id,)).fetchone()
    
    if word_data is None:
        return jsonify({"error": "Not found"}), 404
    
    sign_resource = db.execute(
        "SELECT * FROM sign_resources WHERE vocabulary_id = ?", 
        (vocab_id,)
    ).fetchone()
    
    result = dict(word_data)
    result['sign_resource'] = dict(sign_resource) if sign_resource else None
    result['illustration'] = get_illustration(word_data['arabic_word'])
    return jsonify(result)

@app.route("/api/words/<int:vocab_id>/navigate")
def api_word_navigate(vocab_id):
    db = get_db()
    current = db.execute("SELECT lesson_id FROM vocabulary WHERE id = ?", (vocab_id,)).fetchone()
    if not current:
        return jsonify({"error": "Not found"}), 404
    
    lesson_id = current['lesson_id']
    vocab_ids = [row['id'] for row in db.execute(
        "SELECT id FROM vocabulary WHERE lesson_id = ? ORDER BY id", 
        (lesson_id,)
    ).fetchall()]
    
    try:
        idx = vocab_ids.index(vocab_id)
        prev_id = vocab_ids[idx - 1] if idx > 0 else None
        next_id = vocab_ids[idx + 1] if idx < len(vocab_ids) - 1 else None
    except ValueError:
        prev_id = None
        next_id = None
    
    return jsonify({"prev_id": prev_id, "next_id": next_id})

@app.route("/api/search")
def api_search():
    query = request.args.get('q', '').strip()
    if not query:
        return jsonify([])
    
    db = get_db()
    search_pattern = f"%{query}%"
    results = db.execute("""
        SELECT v.id, v.arabic_word, v.diacritics, v.meaning, l.title as lesson_title
        FROM vocabulary v 
        JOIN lessons l ON v.lesson_id = l.id
        WHERE v.arabic_word LIKE ? OR v.diacritics LIKE ?
    """, (search_pattern, search_pattern)).fetchall()
    
    return jsonify([dict(r) for r in results])

@app.route("/api/random-words/<int:count>")
def api_random_words(count):
    db = get_db()
    return jsonify([dict(w) for w in db.execute(
        "SELECT id, arabic_word, diacritics, meaning FROM vocabulary ORDER BY RANDOM() LIMIT ?", 
        (count,)
    ).fetchall()])

@app.route("/api/quiz-words/<int:count>")
def api_quiz_words(count):
    db = get_db()
    words = db.execute(
        "SELECT id, arabic_word, diacritics, meaning FROM vocabulary ORDER BY RANDOM() LIMIT ?", 
        (count,)
    ).fetchall()
    
    all_meanings = [row['meaning'] for row in db.execute("SELECT meaning FROM vocabulary").fetchall() if row['meaning']]
    
    result = []
    for w in words:
        correct = w['meaning']
        wrongs = [m for m in all_meanings if m != correct]
        distractors = random.sample(wrongs, min(3, len(wrongs)))
        options = distractors + [correct]
        random.shuffle(options)
        result.append({
            "id": w['id'], 
            "word": w['diacritics'] or w['arabic_word'], 
            "options": options, 
            "correct": correct
        })
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)