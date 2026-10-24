// ===== Telegram Web App =====
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    const user = tg.initDataUnsafe?.user;
    if (user && user.first_name) {
        document.getElementById('username').textContent = user.first_name;
    }
}

// ===== Логика тапалки =====
const TAPS_PER_LEVEL = 5000;      // сколько тапов на 1 уровень
const BASE_SIZE = 100;            // базовый размер эмодзи (px)
const SIZE_STEP = 12;             // на сколько пикселей растёт каждый уровень
const MAX_SIZE = 220;             // максимальный размер (чтобы не вылезал за экран)

let score = 0;
let level = 1;

const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const toNextEl = document.getElementById('to-next');
const tapBtn = document.getElementById('tap-btn');
const dogEl = document.querySelector('.dog-emoji');

// Пересчёт уровня и размера на основе счёта
function updateUI() {
    const newLevel = Math.floor(score / TAPS_PER_LEVEL) + 1;
    const leveledUp = newLevel > level;
    level = newLevel;

    // Размер собаки: растёт с уровнем, но ограничен
    const newSize = Math.min(BASE_SIZE + (level - 1) * SIZE_STEP, MAX_SIZE);
    dogEl.style.fontSize = newSize + 'px';

    // Обновляем текстовые поля
    scoreEl.textContent = score;
    levelEl.textContent = level;

    // Сколько осталось до следующего уровня
    const remainder = score % TAPS_PER_LEVEL;
    const toNext = TAPS_PER_LEVEL - remainder;
    toNextEl.textContent = toNext === TAPS_PER_LEVEL ? TAPS_PER_LEVEL : toNext;

    // Анимация повышения уровня
    if (leveledUp) {
        dogEl.classList.remove('level-up');
        // Принудительный reflow, чтобы анимация перезапустилась
        void dogEl.offsetWidth;
        dogEl.classList.add('level-up');
    }
}

// Обработка тапа
function handleTap(event) {
    event.preventDefault();
    score++;
    updateUI();

    // Визуальный отклик
    dogEl.classList.remove('tap-effect');
    void dogEl.offsetWidth;
    dogEl.classList.add('tap-effect');

    // Вибрация в Telegram (если поддерживается)
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Слушаем и клик, и touchstart для мгновенного отклика на телефоне
tapBtn.addEventListener('click', handleTap);
tapBtn.addEventListener('touchstart', handleTap, { passive: false });

// Инициализация
updateUI();
