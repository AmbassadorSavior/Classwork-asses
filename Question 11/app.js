import { add, subtract, multiply, divide } from "./math.js";

document.getElementById("calculateBtn").addEventListener("click", calculate);

function calculate() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let operation = document.getElementById("operation").value;
    let result = document.getElementById("result");

    if (num1 === "" || num2 === "") {
        result.textContent = "Please enter both numbers.";
        return;
    }

    num1 = Number(num1);
    num2 = Number(num2);

    try {
        let answer;

        if (operation === "add") {
            answer = add(num1, num2);
        } else if (operation === "subtract") {
            answer = subtract(num1, num2);
        } else if (operation === "multiply") {
            answer = multiply(num1, num2);
        } else if (operation === "divide") {
            answer = divide(num1, num2);
        }

        result.textContent = "Result: " + answer;

    } catch (error) {
        result.textContent = error.message;
    }
}