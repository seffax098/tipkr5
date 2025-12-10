const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/status', gameController.getStatus);
router.post('/click', gameController.addClick);
router.post('/upgrade/:type', gameController.buyUpgrade);

router.get('/leaderboard', gameController.getLeaderboard);


router.get('/leaderboard/:limit', gameController.getLeaderboard);

router.delete('/player/:playerId', gameController.resetPlayer);

module.exports = router;
