let employees = [
    {
        name: "John",
        salary: 250000,
        department: "IT"
    },
    {
        name: "Mary",
        salary: 180000,
        department: "HR"
    },
    {
        name: "David",
        salary: 300000,
        department: "IT"
    },
    {
        name: "Grace",
        salary: 150000,
        department: "Finance"
    },
    {
        name: "Peter",
        salary: 220000,
        department: "HR"
    }
];

// Display all employees
function displayEmployees() {
    let output = "";

    employees.forEach(function(employee) {
        output += `
            <div class="employee">
                <p>Name: ${employee.name}</p>
                <p>Salary: ₦${employee.salary.toLocaleString()}</p>
                <p>Department: ${employee.department}</p>
            </div>
        `;
    });

    document.getElementById("employees").innerHTML = output;
}

// Return employees in a particular department
function searchDepartment() {
    let department = document.getElementById("department").value.trim();

    let result = employees.filter(function(employee) {
        return employee.department.toLowerCase() === department.toLowerCase();
    });

    let output = "";

    result.forEach(function(employee) {
        output += `<p class="result">${employee.name} - ${employee.department}</p>`;
    });

    document.getElementById("departmentResult").innerHTML =
        output || "No employees found";
}

// Find employees earning above ₦200,000
function highEarners() {
    let result = employees.filter(function(employee) {
        return employee.salary > 200000;
    });

    let output = "";

    result.forEach(function(employee) {
        output += `<p class="result">${employee.name} - ₦${employee.salary.toLocaleString()}</p>`;
    });

    document.getElementById("highEarners").innerHTML =
        output || "No employees found";
}

// Calculate average salary
function averageSalary() {
    let total = employees.reduce(function(sum, employee) {
        return sum + employee.salary;
    }, 0);

    let average = total / employees.length;

    document.getElementById("average").innerText =
        "Average Salary: ₦" + average.toLocaleString();
}

function highestSalary() {
    let highest = employees.reduce(function(max, employee) {
        return employee.salary > max.salary ? employee : max;
    });

    document.getElementById("highest").innerText =
        highest.name + " earns ₦" + highest.salary.toLocaleString();
}

// Return only employee names
function employeeNames() {
    let names = employees.map(function(employee) {
        return employee.name;
    });

    document.getElementById("names").innerHTML =
        names.join("<br>");
}

// Run application
displayEmployees();