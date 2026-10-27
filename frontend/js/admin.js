const API = '/api/proyectos';

// Lógica de Navegación del Sidebar
function mostrarSeccion(idSeccion, enlace) {
  const secciones = document.querySelectorAll('.panel-seccion');
  secciones.forEach((sec) => sec.classList.remove('activa'));

  const enlaces = document.querySelectorAll('.nav-links a');
  enlaces.forEach((link) => link.classList.remove('activo'));

  document.getElementById(idSeccion).classList.add('activa');
  enlace.classList.add('activo');
}

// Lógica de Modales
function abrirModal(idModal) {
  document.getElementById(idModal).classList.add('activo');
}

function cerrarModal(idModal) {
  document.getElementById(idModal).classList.remove('activo');
}

// ==========================================
// CRUD DE PROYECTOS (integrado con el backend)
// ==========================================

async function cargarProyectosAdmin() {
  const tbody = document.getElementById('tabla-proyectos-body');
  if (!tbody) return;
  try {
    const res = await fetch(API);
    const proyectos = await res.json();
    tbody.innerHTML = proyectos.map((p) => `
      <tr>
        <td>${p.titulo}</td>
        <td>${p.descripcion}</td>
        <td>${p.urlRepositorio || '-'}</td>
        <td><span style="color:${p.estaActivo ? 'var(--color-acento)' : '#ef4444'}">${p.estaActivo ? 'Activo' : 'Oculto'}</span></td>
        <td>
          <button class="btn-accion" onclick="editarProyecto(${p.id})">Editar</button>
          <button class="btn-accion peligro" onclick="borrarProyecto(${p.id})">Borrar</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="5">No se pudieron cargar los proyectos.</td></tr>';
  }
}

async function guardarProyecto(event) {
  event.preventDefault();
  const id = document.getElementById('proy-id').value;
  const data = {
    titulo: document.getElementById('proy-titulo').value,
    descripcion: document.getElementById('proy-desc').value,
    imagenUrl: document.getElementById('proy-img').value,
    urlRepositorio: document.getElementById('proy-repo').value,
    estaActivo: document.getElementById('proy-activo').checked,
    tecnologias: document
      .getElementById('proy-tecnologias')
      .value.split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API}/${id}` : API;
  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    alert('Error al guardar el proyecto');
  }

  cerrarModal('modal-proyecto');
  event.target.reset();
  document.getElementById('proy-id').value = '';
  cargarProyectosAdmin();
}

async function editarProyecto(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const p = await res.json();
    document.getElementById('proy-id').value = p.id;
    document.getElementById('proy-titulo').value = p.titulo;
    document.getElementById('proy-desc').value = p.descripcion;
    document.getElementById('proy-img').value = p.imagenUrl || '';
    document.getElementById('proy-repo').value = p.urlRepositorio || '';
    document.getElementById('proy-activo').checked = p.estaActivo;
    document.getElementById('proy-tecnologias').value = (p.tecnologias || [])
      .map((t) => t.tecnologia.nombre)
      .join(', ');
    abrirModal('modal-proyecto');
  } catch (e) {
    alert('Error al cargar el proyecto');
  }
}

async function borrarProyecto(id) {
  if (!confirm('¿Eliminar este proyecto?')) return;
  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    cargarProyectosAdmin();
  } catch (e) {
    alert('Error al eliminar el proyecto');
  }
}

// Cargar la tabla al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarProyectosAdmin();
  const form = document.getElementById('form-proyecto');
  if (form) form.addEventListener('submit', guardarProyecto);
});