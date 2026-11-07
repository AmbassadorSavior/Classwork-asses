// Question 4: Student Management System

// Array to store students
let students = [];

// Get HTML elements
let studentForm = document.getElementById("studentForm");
let studentList = document.getElementById("studentList");
let message = document.getElementById("message");

let editingId = null;

// Function to display all students
function displayStudents(studentArray = students) {

    studentList.innerHTML = "";

    studentArray.forEach(function(student) {

        let row = document.createElement("tr");

        let values = [
            student.id,
            student.fullName,
            student.email,
            student.age,
            student.course
        ];

        values.forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            editStudent(student.id);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
}

// Function to add a student
function addStudent(student) {

    let existingStudent = students.find(function(item) {
        return item.id === student.id;
    });

    if (existingStudent) {
        message.textContent = "Student ID already exists.";
        return;
    }

    students.push(student);

    message.textContent = "Student added successfully.";

    displayStudents();
}

// Handle form submission
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let student = {
        id: document.getElementById("studentId").value.trim(),
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value.trim()
    };

    if (!student.id || !student.fullName || !student.email || !student.course || student.age <= 0) {
        message.textContent = "Please enter valid student information.";
        return;
    }

    if (editingId !== null) {

        // Update student information
        let studentIndex = students.findIndex(function(item) {
            return item.id === editingId;
        });

        let duplicateId = students.find(function(item) {
            return item.id === student.id && item.id !== editingId;
        });

        if (duplicateId) {
            message.textContent = "This student ID already exists.";
            return;
        }

        if (studentIndex !== -1) {
            students[studentIndex] = student;
            message.textContent = "Student updated successfully.";
        }

        editingId = null;
        document.getElementById("submitButton").textContent = "Add Student";
        document.getElementById("cancelButton").hidden = true;

    } else {

        addStudent(student);
    }

    studentForm.reset();
    displayStudents();
});

// Function to search for a student by ID
function searchStudent() {

    let searchId = document.getElementById("searchId").value.trim();

    let student = students.find(function(item) {
        return item.id.toLowerCase() === searchId.toLowerCase();
    });

    if (student) {
        displayStudents([student]);
        message.textContent = "Student found.";
    } else {
        displayStudents([]);
        message.textContent = "Student not found.";
    }
}

// Search button
document.getElementById("searchButton").addEventListener("click", searchStudent);

// Show all students
document.getElementById("showAllButton").addEventListener("click", function() {
    displayStudents();
    message.textContent = "Showing all registered students.";
    document.getElementById("searchId").value = "";
});

// Function to edit a student
function editStudent(id) {

    let student = students.find(function(item) {
        return item.id === id;
    });

    if (student) {

        document.getElementById("studentId").value = student.id;
        document.getElementById("fullName").value = student.fullName;
        document.getElementById("email").value = student.email;
        document.getElementById("age").value = student.age;
        document.getElementById("course").value = student.course;

        editingId = id;

        document.getElementById("submitButton").textContent = "Update Student";
        document.getElementById("cancelButton").hidden = false;

        message.textContent = "Edit student information and submit.";
    }
}

// Function to delete a student
function deleteStudent(id) {

    students = students.filter(function(student) {
        return student.id !== id;
    });

    message.textContent = "Student deleted successfully.";

    displayStudents();
}

// Cancel editing
document.getElementById("cancelButton").addEventListener("click", function() {

    editingId = null;

    studentForm.reset();

    document.getElementById("submitButton").textContent = "Add Student";
    document.getElementById("cancelButton").hidden = true;

    message.textContent = "Editing cancelled.";
});