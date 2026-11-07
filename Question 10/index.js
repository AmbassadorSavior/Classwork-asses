let users = [];

function registerUser(name, email, age, password) {

    try {

        // Validate name
        if (name.trim() === "") {
            throw new Error("Full name is required");
        }

        // Validate email
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            throw new Error("Please enter a valid email address");
        }

        // Validate age
        if (age < 18 || age === "") {
            throw new Error("You must be at least 18 years old");
        }

        // Validate password
        if (password.length < 8) {
            throw new Error("Password must contain at least 8 characters");
        }

        if (!/[A-Z]/.test(password)) {
            throw new Error("Password must contain an uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
            throw new Error("Password must contain a lowercase letter");
        }

        if (!/[0-9]/.test(password)) {
            throw new Error("Password must contain a number");
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            throw new Error("Password must contain a special character");
        }

        // Save user information
        let user = {
            name: name,
            email: email,
            age: age
        };

        users.push(user);

        return "Registration successful!";

    } catch (error) {

        return error.message;

    }
}

// Handle registration form
document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = Number(document.getElementById("age").value);
    let password = document.getElementById("password").value;

    let result = registerUser(name, email, age, password);

    let message = document.getElementById("message");

    message.innerText = result;

    if (result === "Registration successful!") {
        message.style.color = "green";
        document.getElementById("registrationForm").reset();
    } else {
        message.style.color = "red";
    }

});