let bossHealth = 100;
let coinCount = 0;
let autoClickActive500 = false;
let autoClickActive1000 = false;

const healthElement = document.getElementById('health');
const coinCountElement = document.getElementById('coinCount');
const clickBossButton = document.getElementById('clickBoss');
const attack1Button = document.getElementById('attack1');
const attack2Button = document.getElementById('attack2');
const autoClickButton500 = document.getElementById('autoClick500');
const autoClickButton1000 = document.getElementById('autoClick1000');

clickBossButton.addEventListener('click', () => {
    dealDamage(1);
});

attack1Button.addEventListener('click', () => {
    if (attack1Button.disabled) return;
    dealDamage(10);
    activateCooldown(attack1Button, 5000);
});

attack2Button.addEventListener('click', () => {
    if (attack2Button.disabled) return;
    dealDamage(20);
    activateCooldown(attack2Button, 5000);
});

autoClickButton500.addEventListener('click', () => {
    if (coinCount >= 500) {
        coinCount -= 500;
        autoClickActive500 = true;
        autoClickButton500.disabled = true;
        coinCountElement.textContent = coinCount;
        startAutoClick500();
    }
});

autoClickButton1000.addEventListener('click', () => {
    if (coinCount >= 1000) {
        coinCount -= 1000;
        autoClickActive1000 = true;
        autoClickButton1000.disabled = true;
        coinCountElement.textContent = coinCount;
        startAutoClick1000();
    }
});

function dealDamage(amount) {
    bossHealth -= amount;
    coinCount += amount; // Münzen für den verursachten Schaden hinzufügen
    if (bossHealth <= 0) {
        bossHealth = 100;
        coinCount += 50; // Bonusmünzen für das Besiegen des Bosses hinzufügen
        enableAttacks();
    }
    healthElement.textContent = bossHealth;
    coinCountElement.textContent = coinCount;
    updateAutoClickButtons();
}

function activateCooldown(button, cooldown) {
    button.disabled = true;
    setTimeout(() => {
        button.disabled = false;
    }, cooldown);
}

function enableAttacks() {
    attack1Button.disabled = false;
    attack2Button.disabled = false;
}

function startAutoClick500() {
    setInterval(() => {
        if (autoClickActive500) {
            dealDamage(2);
        }
    }, 1000);
}

function startAutoClick1000() {
    setInterval(() => {
        if (autoClickActive1000) {
            dealDamage(2);
        }
    }, 500);
}

function updateAutoClickButtons() {
    autoClickButton500.disabled = coinCount < 500;
    autoClickButton1000.disabled = coinCount < 1000;
}

// Initially enable the attacks after 5 seconds
setTimeout(() => {
    enableAttacks();
}, 5000);
