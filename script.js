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
    } catch (error) {
        display.value = 'Erreur';
    }
}

// Basculer thème clair/sombre
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    // Changer icône du bouton
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

