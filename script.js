let display = document.getElementById('result');
function appendToDisplay(value) {
    display.value += value;
}
function clearDisplay(){
    display.value = '';
}
function deleteLast() {
    display.value = display.value.slice(0, -1);
}
function calculate() {
    try {
        // Repmlace × par * pour l'evaluation 
        let expression = display.value.replace('×','*');
        display.value = eval(expression);
    } catch (errror) {
        display.value = 'Erreur';
    }
}