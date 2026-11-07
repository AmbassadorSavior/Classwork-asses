// Question 2: Employee Salary Calculator

let salaryForm = document.getElementById("salaryForm");

salaryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get employee information
    let employeeName = document.getElementById("employeeName").value;

    let basicSalary = Number(document.getElementById("basicSalary").value);

    // Calculate allowances
    let housingAllowance = basicSalary * 0.10;

    let transportAllowance = basicSalary * 0.05;

    // Calculate tax deduction
    let taxDeduction = basicSalary * 0.03;

    // Calculate final salary
    let totalAllowances = housingAllowance + transportAllowance;

    let finalSalary = basicSalary + totalAllowances - taxDeduction;

    // Display salary breakdown
    document.getElementById("result").innerHTML = `
        <h3>Employee Salary Breakdown</h3>

        <p>Employee Name: ${employeeName}</p>

        <p>Basic Salary: ₦${basicSalary.toLocaleString()}</p>

        <p>Housing Allowance (10%): ₦${housingAllowance.toLocaleString()}</p>

        <p>Transport Allowance (5%): ₦${transportAllowance.toLocaleString()}</p>

        <p>Tax Deduction (3%): ₦${taxDeduction.toLocaleString()}</p>

        <p>Total Allowances: ₦${totalAllowances.toLocaleString()}</p>

        <h3>Final Monthly Salary: ₦${finalSalary.toLocaleString()}</h3>
    `;

});