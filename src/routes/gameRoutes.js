const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Работа с кликером
router.get('/status', gameController.getStatus);           // req.query
router.post('/click', gameController.addClick);            // body
router.post('/upgrade/:type', gameController.buyUpgrade);  // params + body
// без параметра limit — по умолчанию топ 10
router.get('/leaderboard', gameController.getLeaderboard);

// с параметром limit — /api/leaderboard/5
router.get('/leaderboard/:limit', gameController.getLeaderboard);

router.delete('/player/:playerId', gameController.resetPlayer);

module.exports = router;
