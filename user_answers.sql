-- DROP TABLE IF EXISTS user_answers;
CREATE TABLE user_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flashcard_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    user_answer BOOLEAN NOT NULL,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);