const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const key = req.headers['x-openai-key'];
    if (!key) return res.status(400).json({ error: 'No API key' });

    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: 'audio.webm',
      contentType: req.file.mimetype,
    });
    form.append('model', 'whisper-1');
    form.append('language', 'lt');
    form.append('prompt', 'Mixed Lithuanian and English speech.');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, ...form.getHeaders() },
      body: form,
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message });
    res.json({ text: data.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Running'));
