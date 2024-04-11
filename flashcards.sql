DROP TABLE IF EXISTS flashcards;

CREATE TABLE flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer BOOLEAN NOT NULL,
    extra_info TEXT
);