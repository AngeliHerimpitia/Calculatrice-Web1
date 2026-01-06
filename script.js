const display = document.getElementById('result');

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
        // Convertir × et ÷ en opérateurs JS
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        // Évaluer
        let result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Erreur';
    }
}
