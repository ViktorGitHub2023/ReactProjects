const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbFile = path.join(__dirname, 'velemenyek.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) console.error('DB open error', err);
  else console.log('Connected to sqlite DB:', dbFile);
});

// Initialize table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS velemenyek (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nem TEXT,
    kedvencek TEXT,
    szint TEXT,
    evek INTEGER
  )`);
});

app.get('/api/velemenyek', (req, res) => {
  db.all('SELECT * FROM velemenyek ORDER BY id ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/velemenyek', (req, res) => {
  const { nem, kedvencek, szint, evek } = req.body;
  const ked = Array.isArray(kedvencek) ? kedvencek.join(',') : (kedvencek || '');
  const sz = Array.isArray(szint) ? szint.join(',') : (szint || '');

  const stmt = db.prepare('INSERT INTO velemenyek (nem, kedvencek, szint, evek) VALUES (?, ?, ?, ?)');
  stmt.run(nem || '', ked, sz, Number(evek) || 0, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const insertedId = this.lastID;
    db.get('SELECT * FROM velemenyek WHERE id = ?', insertedId, (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
  stmt.finalize();
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
