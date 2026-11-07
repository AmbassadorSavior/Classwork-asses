// Student Grading System

let form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("studentName").value;

    let math = Number(document.getElementById("math").value);
    let english = Number(document.getElementById("english").value);
    let biology = Number(document.getElementById("biology").value);
    let chemistry = Number(document.getElementById("chemistry").value);
    let physics = Number(document.getElementById("physics").value);

    let scores = [math, english, biology, chemistry, physics];

    if (scores.some(score => score < 0 || score > 100)) {
        alert("Scores must be between 0 and 100.");
        return;
    }

    let total = math + english + biology + chemistry + physics;

    let average = total / 5;

    let grade;

    if (average >= 70) {
        grade = "A";
    } else if (average >= 60) {
        grade = "B";
    } else if (average >= 50) {
        grade = "C";
    } else if (average >= 45) {
        grade = "D";
    } else if (average >= 40) {
        grade = "E";
    } else {
        grade = "F";
    }

    document.getElementById("result").innerHTML = `
        <h3>Student Result</h3>
        <p>Student Name: ${name}</p>
        <p>Total Score: ${total}</p>
        <p>Average Score: ${average}</p>
        <p>Grade: ${grade}</p>
    `;

});