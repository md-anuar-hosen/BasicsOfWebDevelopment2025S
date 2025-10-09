 const courseInput = document.getElementById('courseName');
const checks = {
  mon: document.getElementById('dMon'),
  tue: document.getElementById('dTue'),
  wed: document.getElementById('dWed'),
  thu: document.getElementById('dThu'),
  fri: document.getElementById('dFri'),
};
const body = document.getElementById('scheduleBody');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');

const YES = '✅';
const NO  = '❌';

function rowCellsFromChecks() {
  return [
    checks.mon.checked ? YES : NO,
    checks.tue.checked ? YES : NO,
    checks.wed.checked ? YES : NO,
    checks.thu.checked ? YES : NO,
    checks.fri.checked ? YES : NO,
  ];
}

function resetForm() {
  courseInput.value = '';
  for (const k in checks) checks[k].checked = false;
  courseInput.focus();
}

addBtn.addEventListener('click', () => {
  const name = courseInput.value.trim() || 'Untitled course';

  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = name;
  tr.appendChild(th);

  for (const val of rowCellsFromChecks()) {
    const td = document.createElement('td');
    td.textContent = val;
    tr.appendChild(td);
  }

  body.appendChild(tr);
  resetForm();
});

clearBtn.addEventListener('click', resetForm);
