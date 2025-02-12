function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    } else {
        return a / b;
    }
}


function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);

        default:
            return "ERROR";
    }
}

let currentInput = ""; //Kullanıcının anlık girişi
let previousInput = ""; // Önceki giriş 
let operator = ""; // Kullanıcının seçtiği işlem


const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") { // Eğer sayı veya nokta girildiyse
            if (value === "." && currentInput.includes(".")) return;

            currentInput += value;
            screen.textContent = previousInput + " " + operator + " " + currentInput;
        }

        else if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            screen.textContent = "0";
        }

        else if (value === "CLEAR") {
            if (currentInput.length === 0) {
                screen.textContent = "0";
                return;
            }
            currentInput = currentInput.slice(0,-1);
            screen.textContent = currentInput || "0";
        }

        else if (["+", "-", "x", "÷"].includes(value)) { // Eğer tuşlardan biri seçildiyse
            if (currentInput === "") return;

            if (previousInput !== "") {
                currentInput = operate(operator, previousInput, currentInput);
                screen.textContent = currentInput + " " + value;
            } else {
                screen.textContent = currentInput + " " + value;
            }

            operator = value;
            previousInput = currentInput;
            currentInput = "";
        }
        else if (value === "=") {
            if (previousInput === "" || currentInput === "") return;

            let result = operate(operator, previousInput, currentInput);
            screen.textContent = previousInput + " " + operator + " " + currentInput + " = " + result;
            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }
    })
})

