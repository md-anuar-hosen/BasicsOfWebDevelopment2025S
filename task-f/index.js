/* Add row behavior */
const btn = document.getElementById('add-row');
const tbody = document.getElementById('table-body');

function nextIndex() {
  // last row number + 1
  const last = tbody.querySelector('tr:last-child th[scope="row"]');
  return last ? Number(last.textContent.trim()) + 1 : 1;
}

btn.addEventListener('click', () => {
  const tr = document.createElement('tr');

  // sensible defaults
  const idx = nextIndex();
  const defaults = [
    { tag: 'th', scope: 'row', text: String(idx) },
    { tag: 'td', text: 'New item' },
    { tag: 'td', text: 'General' },
    { tag: 'td', text: '1' },
    { tag: 'td', text: 'In stock' }
  ];

  defaults.forEach(cell => {
    const el = document.createElement(cell.tag);
    if (cell.scope) el.setAttribute('scope', cell.scope);
    el.textContent = cell.text;
    tr.appendChild(el);
  });

  tbody.appendChild(tr);
});
