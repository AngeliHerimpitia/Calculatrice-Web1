const display = document.getElementById('result');
const toggleBtn = document.getElementById('toggle-theme');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// ===== LOCAL STORAGE =====
function saveHistory() {
    localStorage.setItem('calcHistory', historyList.innerHTML);
}

function loadHistory() {
    const saved = localStorage.getItem('calcHistory');
    if (saved) {
        historyList.innerHTML = saved;
        Array.from(historyList.children).forEach(li => {
            li.addEventListener('click', () => {
                display.value = li.textContent.split(' = ')[1];
            });
        });
    }
    updateClearButton(); // mettre à jour le bouton après chargement
}

// Mettre à jour le bouton "Tout supprimer"
function updateClearButton() {
    clearHistoryBtn.style.display = historyList.children.length > 0 ? 'block' : 'none';
}

// Ajouter calcul à l'historique
function addToHistory(expression, result) {
    const li = document.createElement('li');
    li.textContent = `${expression} = ${result}`;
    li.addEventListener('click', () => { display.value = result; });
    historyList.prepend(li);
    updateClearButton();
    saveHistory();
}

// Supprimer tout l'historique
clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    updateClearButton();
    saveHistory();
});

// ===== CALCUL =====
function appendToDisplay(value) { display.value += value; }
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0, -1); }
function calculate() {
    try {
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        addToHistory(display.value, result);
        display.value = result;
    } catch { display.value = 'Erreur'; }
}

// ===== MODE CLAIR/SOMBRE =====
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// ===== SUPPORT CLAVIER =====
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

// ===== CHARGEMENT HISTORIQUE AU DÉMARRAGE =====
loadHistory();
let deferredPrompt;

const installBtn = document.getElementById("install-btn");
const iosHint = document.getElementById("ios-install-hint");
const installedBadge = document.getElementById("installed-badge");

// ===== Détection iOS =====
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isInStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

// ===== Si déjà installée =====
if (isInStandalone) {
  installedBadge.style.display = "block";
}

// ===== iOS : afficher message =====
if (isIOS && !isInStandalone) {
  iosHint.style.display = "block";
}

// ===== Android / PC =====
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

// ===== Clic Installer =====
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  // vibration si supportée
  if (navigator.vibrate) navigator.vibrate(50);

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    installBtn.style.display = "none";
    deferredPrompt = null;
  }
});

// ===== Après installation =====
window.addEventListener("appinstalled", () => {
  installBtn.style.display = "none";
  iosHint.style.display = "none";
  installedBadge.style.display = "block";
});
// Forcer affichage du bouton Installer
window.addEventListener("load", () => {
  const installBtn = document.getElementById("install-btn");
  
  // Laisser le bouton visible dès que l'utilisateur clique/interagit
  installBtn.style.display = "block";

  // bonus : suggestion après 3 sec si utilisateur interagit
  setTimeout(() => {
    installBtn.style.opacity = "1";
  }, 3000);
});
