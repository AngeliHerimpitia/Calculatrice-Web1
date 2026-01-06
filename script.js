const display = document.getElementById('result');
const toggleBtn = document.getElementById('toggle-theme');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
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
