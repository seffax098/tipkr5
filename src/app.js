const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', gameRoutes);

app.get('/ping', (req, res) => {
  res.send('Server is alive');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
