CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    unit_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY,
    unit_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    lesson_order INTEGER NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES units (id)
);
CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY,
    lesson_id INTEGER NOT NULL,
    arabic_word TEXT NOT NULL,
    diacritics TEXT,
    meaning TEXT,
    illustration_path TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id)
);
CREATE TABLE IF NOT EXISTS sign_resources (
    id INTEGER PRIMARY KEY,
    vocabulary_id INTEGER NOT NULL,
    official_source TEXT DEFAULT 'SSHI',
    official_url TEXT,
    video_url TEXT,
    verification_status TEXT DEFAULT 'Needs Review',
    reviewer_notes TEXT,
    verified_at TEXT,
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary (id)
);
CREATE TABLE IF NOT EXISTS sentences (
    id INTEGER PRIMARY KEY,
    lesson_id INTEGER NOT NULL,
    sentence_text TEXT NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id)
);
CREATE TABLE IF NOT EXISTS student_progress (
    id INTEGER PRIMARY KEY,
    student_id TEXT DEFAULT 'guest',
    vocabulary_id INTEGER NOT NULL,
    completed INTEGER DEFAULT 0,
    last_accessed TEXT,
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary (id)
);
CREATE INDEX IF NOT EXISTS idx_vocab_word ON vocabulary(arabic_word);