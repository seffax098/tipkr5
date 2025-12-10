const playerIdInput = document.getElementById('playerId');
const clicksSpan = document.getElementById('clicks');
const levelSpan = document.getElementById('level');
const clickPowerSpan = document.getElementById('clickPower');

const clickBtn = document.getElementById('clickBtn');
const loadStateBtn = document.getElementById('loadStateBtn');
const upgradeLevelBtn = document.getElementById('upgradeLevelBtn');
const upgradeClickPowerBtn = document.getElementById('upgradeClickPowerBtn');
const loadTopBtn = document.getElementById('loadTopBtn');
const leaderboardUl = document.getElementById('leaderboard');

function getPlayerId() {
    return playerIdInput.value || 'player1';
}

async function fetchStatus() {
    const playerId = getPlayerId();
    const res = await fetch(`/api/status?playerId=${encodeURIComponent(playerId)}`);
    if (!res.ok) {
        alert('Ошибка при загрузке статуса');
        return;
    }
    const data = await res.json();
    updateUI(data);
}

function updateUI(player) {
    clicksSpan.textContent = player.clicks;
    levelSpan.textContent = player.level;
    clickPowerSpan.textContent = player.clickPower || 1;
}


clickBtn.addEventListener('click', async () => {
    const playerId = getPlayerId();
    const res = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, amount: 1 })
    });
    const data = await res.json();
    if (res.ok) {
        updateUI(data.player);
    } else {
        alert(data.error || 'Ошибка клика');
    }
});

loadStateBtn.addEventListener('click', fetchStatus);

upgradeLevelBtn.addEventListener('click', async () => {
    const playerId = getPlayerId();
    const res = await fetch('/api/upgrade/level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
    });
    const data = await res.json();
    if (res.ok) {
        updateUI(data.player);
    } else {
        alert(data.error || 'Ошибка апгрейда уровня');
    }
});

upgradeClickPowerBtn.addEventListener('click', async () => {
    const playerId = getPlayerId();
    const res = await fetch('/api/upgrade/clickPower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
    });
    const data = await res.json();
    if (res.ok) {
        updateUI(data.player);
    } else {
        alert(data.error || 'Ошибка усиления клика');
    }
});


loadTopBtn.addEventListener('click', async () => {
    const res = await fetch('/api/leaderboard/5');
    const data = await res.json();
    leaderboardUl.innerHTML = '';
    data.forEach((p, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${p.id} — уровень ${p.level}`;
        leaderboardUl.appendChild(li);
    });
});

fetchStatus();
