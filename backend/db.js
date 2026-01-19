const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'movies.db');
const db = new sqlite3.Database(dbPath);

/**
 * Initialize the SQLite database and create the recommendations table if it doesn't exist
 * @returns {Promise<void>}
 */
function initDb() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS recommendations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_input TEXT NOT NULL,
                    recommended_movies TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating database table:', err);
                    reject(err);
                } else {
                    console.log('Database initialized successfully');
                    resolve();
                }
            });
        });
    });
}

/**
 * Save a movie recommendation to the database
 * @param {string} userInput - The user's movie preference query
 * @param {Array} recommendedMovies - Array of recommended movies
 * @returns {Promise<number>} The ID of the inserted record
 */
function saveRecommendation(userInput, recommendedMovies) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)');
        stmt.run(userInput, JSON.stringify(recommendedMovies), function (err) {
            if (err) {
                console.error('Error saving recommendation:', err);
                reject(err);
            } else {
                console.log('Recommendation saved with ID:', this.lastID);
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
}

module.exports = { initDb, saveRecommendation };
