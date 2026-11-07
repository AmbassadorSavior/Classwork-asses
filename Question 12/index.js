// Create five user objects
let users = [
    {
        id: 1,
        name: "Elijah",
        email: "elijahchisom3@gmail.com",
        age: 26
    },
    {
        id: 2,
        name: "Edidiong",
        email: "Eddidiongmarry5@gmail.com",
        age: 18
    },
    {
        id: 3,
        name: "Marria",
        email: "marriajames45@gmail.com",
        age: 24
    },
    {
        id: 4,
        name: "favor",
        email: "favornwoke20@gmail.com",
        age: 28
    },
    {
        id: 5,
        name: "nyetoro",
        email: "Nyetorommaduabuchi44@gmail.com",
        age: 23
    }
];

// Convert JavaScript objects into JSON string
let jsonData = JSON.stringify(users);

console.log("JSON String:");
console.log(jsonData);

// Convert JSON string back into JavaScript objects
let convertedUsers = JSON.parse(jsonData);

console.log("Converted JavaScript Objects:");
console.log(convertedUsers);

// Search for a user by email
function searchUser() {
    let email = document.getElementById("email").value;

    let user = convertedUsers.find(function(item) {
        return item.email.toLowerCase() === email.trim().toLowerCase();
    });

    let result = document.getElementById("result");

    if (user) {
        result.innerHTML =
            "Name: " + user.name + "<br>" +
            "Email: " + user.email + "<br>" +
            "Age: " + user.age;
    } else {
        result.textContent = "User not found.";
    }
}

// Display all users
function displayUsers() {
    let output = document.getElementById("users");

    output.innerHTML = "";

    convertedUsers.forEach(function(user) {
        output.innerHTML +=
            "<p>" + user.name + " - " + user.email + "</p>";
    });
}

displayUsers();