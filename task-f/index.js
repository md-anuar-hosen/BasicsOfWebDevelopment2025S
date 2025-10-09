 // Symbols used in the table
const YES = "✅";
const NO  = "❌";

// Elements
const nameInput = document.getElementById("courseName");
const addBtn    = document.getElementById("addBtn");
const clearBtn  = document.getElementById("clearBtn");
const bodyEl    = document.getElementById("scheduleBody");

const dayIds = ["dMon","dTue","dWed","dThu","dFri"];

/** Make a TD with ✅/❌ from boolean */
function cell(val){
  const td = document.createElement("td");
  td.textContent = val ? YES : NO;
  return td;
}

/** Add a new course row */
function addRow(){
  const name = (nameInput.value || "").trim();

  if(!name){
    nameInput.focus();
    nameInput.setAttribute("aria-invalid","true");
    nameInput.style.borderColor = "#d33";
    return;
  }
  nameInput.removeAttribute("aria-invalid");
  nameInput.style.borderColor = "";

  // read checkboxes -> booleans
  const states = dayIds.map(id => document.getElementById(id).checked);

  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.scope = "row";
  th.textContent = name;
  tr.appendChild(th);

  states.forEach(s => tr.appendChild(cell(s)));

  bodyEl.appendChild(tr);
}

/** Clear form */
function clearForm(){
  nameInput.value = "";
  dayIds.forEach(id => (document.getElementById(id).checked = false));
  nameInput.focus();
}

// events
addBtn.addEventListener("click", addRow);
clearBtn.addEventListener("click", clearForm);
