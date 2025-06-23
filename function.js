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
        const result = Function('"use strict"; return (' +
