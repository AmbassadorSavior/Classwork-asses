let users = JSON.parse(localStorage.getItem("users")) || [];

let editingId = null;

// Save users in localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Generate a unique ID
function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
}

// Register a new user
function registerUser(name, email, age) {

    name = name.trim();
    email = email.trim().toLowerCase();
    age = Number(age);

    if (name === "") {
        throw new Error("Full name is required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address.");
    }

    if (!Number.isInteger(age) || age < 18) {
        throw new Error("User must be at least 18 years old.");
    }

    let existingUser = users.find(function(user) {
        return user.email === email && user.id !== editingId;
    });

    if (existingUser) {
        throw new Error("This email address already exists.");
    }

    if (editingId !== null) {

        let user = users.find(function(user) {
            return user.id === editingId;
        });

        if (!user) {
            throw new Error("User not found.");
        }

        user.name = name;
        user.email = email;
        user.age = age;

        editingId = null;

        showMessage("User updated successfully.");

    } else {

        let newUser = {
            id: generateId(),
            name: name,
            email: email,
            age: age,
            registrationDate: new Date().toLocaleDateString()
        };

        users.push(newUser);

        showMessage("User registered successfully.");
    }

    saveUsers();
    displayUsers();
}

// Display all users
function displayUsers(userArray = users) {

    let userList = document.getElementById("userList");

    userList.innerHTML = "";

    document.getElementById("userCount").textContent = users.length;

    if (userArray.length === 0) {
        userList.innerHTML =
            '<tr><td colspan="6">No users found.</td></tr>';
        return;
    }

    userArray.forEach(function(user) {

        let row = document.createElement("tr");

        let values = [
            user.id,
            user.name,
            user.email,
            user.age,
            user.registrationDate
        ];

        values.forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", function() {
            editUser(user.id);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteUser(user.id);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        userList.appendChild(row);
    });
}

// Retrieve one user by ID
function getUserById(id) {

    let user = users.find(function(user) {
        return user.id === id;
    });

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
}

// Edit user information
function editUser(id) {

    try {
        let user = getUserById(id);

        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("age").value = user.age;

        editingId = id;

        document.getElementById("submitBtn").textContent =
            "Update User";

        showMessage("Edit the user's information and click Update User.");

    } catch (error) {
        showMessage(error.message);
    }
}

// Delete a user
function deleteUser(id) {

    try {
        getUserById(id);

        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        users = users.filter(function(user) {
            return user.id !== id;
        });

        saveUsers();
        displayUsers();

        showMessage("User deleted successfully.");

    } catch (error) {
        showMessage(error.message);
    }
}

// Search users by name
function searchUsers() {

    let searchValue = document.getElementById("search")
        .value.trim().toLowerCase();

    let filteredUsers = users.filter(function(user) {
        return user.name.toLowerCase().includes(searchValue);
    });

    displayUsers(filteredUsers);
}

// Display messages
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Handle registration form
document.getElementById("userForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;

    try {
        registerUser(name, email, age);

        document.getElementById("userForm").reset();

        document.getElementById("submitBtn").textContent =
            "Register User";

    } catch (error) {
        showMessage(error.message);
    }
});

// Search as the user types
document.getElementById("search").addEventListener("input", searchUsers);

// Display users when the page opens
displayUsers();      
function generateId() {
    let id;

    do {
        id = Date.now().toString() +
             Math.floor(Math.random() * 10000);
    } while (users.some(function(user) {
        return user.id === id;
    }));

    return id;
}                                                                                                                                            