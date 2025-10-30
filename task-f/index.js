 const courseInput = document.getElementById('courseName');
const checks = {
  mon: document.getElementById('dMon'),
  tue: document.getElementById('dTue'),
  wed: document.getElementById('dWed'),
  thu: document.getElementById('dThu'),
  fri: document.getElementById('dFri'),
};
const tbody   = document.getElementById('scheduleBody');
const addBtn  = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');

const YES = '✅';
const NO  = '❌';

function valuesFromChecks() {
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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name = (courseInput.value || '').trim() || 'Untitled course';
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = name;
  tr.appendChild(th);

  for (const v of valuesFromChecks()) {
    const td = document.createElement('td');
    td.textContent = v;
    tr.appendChild(td);
  }

  tbody.appendChild(tr);
  resetForm();
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resetForm();
});
