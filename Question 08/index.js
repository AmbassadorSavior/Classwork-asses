function validatePassword() {

    let password = document.getElementById("password").value;

    let requirements = [];

    if (password.length < 8) {
        requirements.push("Password must contain at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
        requirements.push("Password must contain an uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        requirements.push("Password must contain a lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
        requirements.push("Password must contain a number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=;[\]\\/]/.test(password)) {
        requirements.push("Password must contain a special character");
    }

    let result = document.getElementById("result");
    let output = document.getElementById("requirements");

    if (requirements.length === 0) {

        result.innerText = "Password is valid!";
        result.className = "valid";

        output.innerText = "All password requirements are satisfied.";

    } else {

        result.innerText = "Password is invalid!";
        result.className = "invalid";

        output.innerHTML = "";

        requirements.forEach(function(item) {
            output.innerHTML += `<p class="invalid">✗ ${item}</p>`;
        });
    }
}