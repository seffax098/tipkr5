# Кликер-игра на Express.js

Учебный проект (контрольная работа) по Express.js.

## Функционал

- Express-сервер с API для кликер-игры.
- Маршруты:
  - `GET /api/status?playerId=` — получить состояние игрока.
  - `POST /api/click` — добавить клик.
  - `POST /api/upgrade/:type` — купить апгрейд (`level`, `autoClicker`).
  - `GET /api/leaderboard/:limit?` — топ игроков по кликам.
  - `DELETE /api/player/:playerId` — сбросить прогресс игрока.
- Использование:
  - `req.params`, `req.query`, `req.body`.
  - Собственный middleware-логгер запросов.
  - Раздача статических файлов из папки `public/`.

## Установка и запуск

```bash
npm install
npm run dev   # запуск в режиме разработки
# или
npm start
