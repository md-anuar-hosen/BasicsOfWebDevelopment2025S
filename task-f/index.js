 const btn = document.getElementById('addRowBtn');
const table = document.getElementById('invTable').querySelector('tbody');

btn.addEventListener('click', () => {
  const nextIndex = table.rows.length + 1;

  const tr = document.createElement('tr');

  tr.innerHTML = `
    <th scope="row">${nextIndex}</th>
    <td>New item ${nextIndex}</td>
    <td>Misc</td>
    <td>1</td>
    <td>In stock</td>
  `;

  table.appendChild(tr);
});
