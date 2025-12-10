// В реальном проекте тут была бы БД.
// Для контрольной используем in-memory объект.
const players = {};

// Получить игрока по id, если нет — создать с начальными значениями
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

// Список игроков (для "лидераборда")
function getAllPlayers() {
  return Object.values(players);
}

module.exports = {
  players,
  getPlayer,
  getAllPlayers
};
