// index.js
// Author: Md Anuar Hosen
// Date: 2025-10-10
// Adds new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";

  const form = document.getElementById("addCourseForm");
  const tableBody = document.querySelector("#timetable tbody");
  const courseInput = document.getElementById("courseName");

  // Read day columns dynamically (skipping "Course")
  const dayOrder = Array.from(document.querySelectorAll("#timetable thead th"))
    .slice(1)
    .map((th) => th.textContent.trim());

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = courseInput.value.trim() || "Untitled course";

    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked')).map(
        (cb) => cb.value
      )
    );

    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = courseName;
    row.appendChild(nameCell);

    dayOrder.forEach((day) => {
      const cell = document.createElement("td");
      cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
      cell.dataset.day = day;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    form.reset();
    courseInput.focus();
  });
});
