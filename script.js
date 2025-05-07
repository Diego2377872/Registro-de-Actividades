async function cargarRegistros() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    const tabla = document.getElementById('tablaBody');
    tabla.innerHTML = '';
    data.forEach(reg => {
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
  } catch (err) {
    console.error("Error al cargar datos:", err);
  }
}

async function guardarEnGitHub(registro) {
  const res = await fetch('/.netlify/functions/saveData', {
    method: 'POST',
    body: JSON.stringify(registro),
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    const err = await res.json();
    alert("Error al guardar: " + err.error);
  }
}

document.getElementById('registroForm').addEventListener('submit', async e => {
  e.preventDefault();
  const nuevoRegistro = {
    fecha: document.getElementById('fecha').value,
    actividad: document.getElementById('actividad').value,
    lugar: document.getElementById('lugar').value,
    permiso: document.getElementById('permiso').value,
    viatico: document.getElementById('viatico').value
  };
  await guardarEnGitHub(nuevoRegistro);
  await cargarRegistros();
  e.target.reset();
});

cargarRegistros();
