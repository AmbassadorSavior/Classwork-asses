// Question 3: Number Analysis System

let numberForm = document.getElementById("numberForm");

numberForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get numbers entered by the user
    let input = document.getElementById("numbers").value;

    // Convert input into an array of numbers
    let numbers = input.split(",").map(Number);

    // Check that exactly 15 valid numbers were entered
    if (
        numbers.length !== 15 ||
        numbers.some(number => !Number.isFinite(number))
    ) {
        document.getElementById("result").textContent =
            "Please enter exactly 15 valid numbers separated by commas.";
        return;
    }

    // Identify even numbers
    let evenNumbers = numbers.filter(function(number) {
        return number % 2 === 0;
    });

    // Identify odd numbers
    let oddNumbers = numbers.filter(function(number) {
        return number % 2 !== 0;
    });

    // Find the largest number
    let largestNumber = Math.max(...numbers);

    // Find the smallest number
    let smallestNumber = Math.min(...numbers);

    // Calculate sum
    let sum = numbers.reduce(function(total, number) {
        return total + number;
    }, 0);

    // Calculate average
    let average = sum / numbers.length;

    // Display results
    document.getElementById("result").innerHTML = `
        <h3>Number Analysis Results</h3>

        <p>Original Numbers: ${numbers.join(", ")}</p>

        <p>Even Numbers: ${evenNumbers.join(", ")}</p>

        <p>Odd Numbers: ${oddNumbers.join(", ")}</p>

        <p>Largest Number: ${largestNumber}</p>

        <p>Smallest Number: ${smallestNumber}</p>

        <p>Sum: ${sum}</p>

        <p>Average: ${average}</p>
    `;

});