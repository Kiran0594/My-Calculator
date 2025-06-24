// Get the display element
let display = document.getElementById('display');

// Flag to track if the last action was a calculation
let justCalculated = false;

// Append number/operator to the display
function append(value) {
    const operators = ['+', '-', '*', '/', '√'];

    // If just calculated and input is a number or dot, reset the display
    if (justCalculated) {
        if (!operators.includes(value)) {
            display.value = '';
        }
        justCalculated = false;
    }

    // Add value to the display
    display.value += value;
}

// Clear the calculator display
function clearDisplay() {
    display.value = '';
    justCalculated = false;
}

// Calculate the square root of the current expression
function squareRoot() {
    try {
        if (display.value.trim() === "") return;

        // Evaluate the current expression (e.g., "9+16")
        const evaluated = Function('"use strict"; return(' + display.value + ')')();

        // Check for invalid or negative values
        if (isNaN(evaluated) || evaluated < 0) {
            display.value = "ERROR";
        } else {
            // Show the square root result
            display.value = Math.sqrt(evaluated);
            justCalculated = true;
        }
    } catch {
        // Catch any errors and show error message
        display.value = "ERROR";
        justCalculated = true;
    }
}

// Evaluate the full expression and show the result
function calculate() {
    try {
        if (display.value.trim() === "") return;

        // Evaluate safely using Function constructor
        const result = Function('"use strict"; return (' +display.value+ ')')();
        // Handle division by zero or invalid result
        display.value = (result === Infinity || result === -Infinity) ? "Error" : result;
        justCalculated = true;
    } catch {
        // Show error for invalid expressions
        display.value = "Error";
        justCalculated = true;
    }
}

// Handle keyboard input events
document.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.';

    if (allowedKeys.includes(e.key)) {
        // Allow numbers and operators via keyboard
        append(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        // Allow Enter and = to trigger calculation
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        // Allow backspace to remove last character
        display.value = display.value.slice(0, -1);
    } else if (e.key === 'Escape') {
        // Clear the display with Escape key
        clearDisplay();
    }
});
                                
