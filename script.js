const display = document.getElementById('result');
const toggleBtn = document.getElementById('toggle-theme');
const historyList = document.getElementById('history-list');

// AJOUTER CALCUL À L'HISTORIQUE
function addToHistory(expression, result) {
    const li = document.createElement('li');
    li.textContent = `${expression} = ${result}`;
    li.addEventListener('click', () => {
        display.value = result; // réutiliser le résultat
    });
    historyList.prepend(li); // dernier calcul en haut
}

// FONCTIONS CALCUL
function appendToDisplay(value) { display.value += value; }
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0, -1); }
function calculate() {
    try {
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        addToHistory(display.value, result);
        display.value = result;
    } catch {
        display.value = 'Erreur';
    }
}

// MODE CLAIR / SOMBRE
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// SUPPORT CLAVIER
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') appendToDisplay(key);
    else if (key === '+' || key === '-' || key === '*' || key === '/')
        appendToDisplay(key === '*' ? '×' : key === '/' ? '÷' : key);
    else if (key === 'Enter') calculate();
    else if (key === 'Backspace') deleteLast();
    else if (key === '.') appendToDisplay('.');
    else if (key.toLowerCase() === 'c') clearDisplay();
});
const clearHistoryBtn = document.getElementById('clear-history');

clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = ''; // Vide complètement l'historique
});

