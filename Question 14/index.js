let users = [];

// Fetch users from the API
async function fetchUsers() {
    let result = document.getElementById("users");

    result.textContent = "Loading users...";

    try {
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        users = await response.json();

        displayUsers();

    } catch (error) {
        result.textContent = "Error: " + error.message;
    }
}

// Display all users
function displayUsers() {
    let output = document.getElementById("users");

    output.innerHTML = "";

    users.forEach(function(user) {
        output.innerHTML += `
            <p>
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}
            </p>
            <hr>
        `;
    });
}

// Search for a user by email
function searchUser() {
    let email = document.getElementById("email").value.trim();

    let result = document.getElementById("searchResult");

    let user = users.find(function(item) {
        return item.email.toLowerCase() === email.toLowerCase();
    });

    if (email === "") {
        result.textContent = "Please enter an email address.";
    } else if (user) {
        result.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    } else {
        result.textContent = "User does not exist.";
    }
}

// Load users when the page opens
fetchUsers();