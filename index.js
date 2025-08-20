// --- Dynamic GUI Enhancements ---
function animateDisplay(type) {
  const display = document.getElementById('display');
  display.classList.remove('animated', 'result');
  if (type === 'input') {
    display.classList.add('animated');
    setTimeout(() => display.classList.remove('animated'), 200);
  } else if (type === 'result') {
    display.classList.add('result');
    setTimeout(() => display.classList.remove('result'), 600);
  }
}

function animateButton(val) {
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach(btn => {
    if (btn.textContent === val) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 250);
    }
  });
}

// Patch Value, calculate, clearDisplay, backspace to add animation
const oldValue = window.Value;
window.Value = function(v) {
  oldValue(v);
  animateDisplay('input');
  animateButton(v);
}

const oldCalculate = window.calculate;
window.calculate = function() {
  oldCalculate();
  animateDisplay('result');
  animateButton('=');
}

const oldClear = window.clearDisplay;
window.clearDisplay = function() {
  oldClear();
  animateDisplay('input');
  animateButton('C');
}

const oldBackspace = window.backspace;
window.backspace = function() {
  oldBackspace();
  animateDisplay('input');
  animateButton('DEL');
}
function Value(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function backspace() {
  const current = document.getElementById("display").value;
  document.getElementById("display").value = current.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}
