const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = 3000;

// Парсинг тела запроса
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Собственный middleware
app.use(logger);

// Статические файлы (страничка игры)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Префикс для API
app.use('/api', gameRoutes);

// Простой health-check
app.get('/ping', (req, res) => {
  res.send('Server is alive');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
