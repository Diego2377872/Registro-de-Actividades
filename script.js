function cargarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const tabla = document.getElementById('tablaBody');
  tabla.innerHTML = '';
  registros.forEach(reg => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${reg.fecha}</td>
      <td>${reg.actividad}</td>
      <td>${reg.lugar}</td>
      <td>${reg.permiso}</td>
      <td>${reg.viatico}</td>
    `;
    tabla.appendChild(fila);
  });
}

document.getElementById('registroForm').addEventListener('submit', e => {
  e.preventDefault();
  const nuevoRegistro = {
    fecha: document.getElementById('fecha').value,
    actividad: document.getElementById('actividad').value,
    lugar: document.getElementById('lugar').value,
    permiso: document.getElementById('permiso').value,
    viatico: document.getElementById('viatico').value
  };

  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.push(nuevoRegistro);
  localStorage.setItem('registros', JSON.stringify(registros));

  cargarRegistros();
  e.target.reset();
});

cargarRegistros();
