const { getPlayer, getAllPlayers } = require('../data/gameData');

// GET /api/status?playerId=user1
// Пример использования req.query
function getStatus(req, res) {
    const { playerId } = req.query;
    if (!playerId) {
        return res.status(400).json({ error: 'playerId (query) обязателен' });
    }

    const player = getPlayer(playerId);
    res.json(player);
}

// POST /api/click
// Body: { "playerId": "user1", "amount": 1 }
function addClick(req, res) {
    const { playerId, amount = 1 } = req.body;

    if (!playerId) {
        return res.status(400).json({ error: 'playerId обязателен' });
    }

    const player = getPlayer(playerId);
    player.clicks += (Number(amount) || 1) * power;

    res.json({
        message: 'Клик засчитан',
        player
    });
}

// POST /api/upgrade/:type
// Пример использования req.params
// type: "level" или "autoClicker"
function buyUpgrade(req, res) {
    const { type } = req.params;
    const { playerId } = req.body;

    if (!playerId) {
        return res.status(400).json({ error: 'playerId обязателен' });
    }

    const player = getPlayer(playerId);

    if (type === 'level') {
        const cost = (player.level + 1) * 10;
        if (player.clicks < cost) {
            return res.status(400).json({ error: 'Недостаточно кликов для апгрейда уровня', cost });
        }
        player.clicks -= cost;
        player.level += 1;
        return res.json({ message: 'Уровень повышен!', player });
    }

    if (type === 'clickPower') {
        const cost = (player.clickPower + 1) * 20;

        if (player.clicks < cost) {
            return res.status(400).json({
                error: 'Недостаточно кликов для усиления клика',
                cost
            });
        }

        player.clicks -= cost;
        player.clickPower += 1;

        return res.json({
            message: `Сила клика повышена до ${player.clickPower}`,
            player
        });
    }

    return res.status(400).json({ error: 'Неизвестный тип апгрейда' });
}

// GET /api/leaderboard/:limit?
// Пример использования req.params (limit) и sort
function getLeaderboard(req, res) {
    const limit = req.params.limit ? Number(req.params.limit) : 10;

    const players = getAllPlayers()
        .sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            return b.clicks - a.clicks;
        })
        .slice(0, limit);

    res.json(players);
}



// DELETE /api/player/:playerId
// Пример DELETE + req.params
const { players } = require('../data/gameData');
function resetPlayer(req, res) {
    const { playerId } = req.params;
    if (!players[playerId]) {
        return res.status(404).json({ error: 'Игрок не найден' });
    }
    delete players[playerId];
    res.json({ message: 'Игрок удалён (прогресс сброшен)' });
}

module.exports = {
    getStatus,
    addClick,
    buyUpgrade,
    getLeaderboard,
    resetPlayer
};
