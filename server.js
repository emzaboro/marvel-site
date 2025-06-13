// server.js
require('dotenv').config();
const express  = require('express');
const CryptoJS = require('crypto-js');
const path     = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/character', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Missing ?name=' });

  const ts   = Date.now().toString();
  const hash = CryptoJS.MD5(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY).toString();
  const url  = `https://gateway.marvel.com/v1/public/characters`
             + `?name=${encodeURIComponent(name)}`
             + `&ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${hash}`;

  try {
    const apiRes = await fetch(url);
    const data   = await apiRes.json();
    res.json(data);
  } 
   catch (err) {
    console.error('❌ /api/character error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}`));
