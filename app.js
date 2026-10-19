// 1. Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready(); // Сообщаем Telegram, что приложение загрузилось (убирает экран загрузки)
tg.expand(); // Разворачиваем на весь экран

// 2. Получаем данные пользователя (небезопасно для важных данных, но для приветствия сойдет)
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('username').textContent = user.first_name;
}

// 3. Логика тапалки
let score = 0;
const scoreElement = document.getElementById('score');
const tapButton = document.getElementById('tap-btn');

tapButton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    // Здесь в будущем можно добавить вибрацию: tg.HapticFeedback.impactOccurred('light');
});