const players = {};

function getPlayer(playerId) {
    if (!players[playerId]) {
        players[playerId] = {
            id: playerId,
            clicks: 0,
            level: 1,
            clickPower: 1
        };
    }
    return players[playerId];
}

function getAllPlayers() {
    return Object.values(players);
}

module.exports = {
    players,
    getPlayer,
    getAllPlayers
};
