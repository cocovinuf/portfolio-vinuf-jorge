const API_PROYECTOS = '/api/proyectos';
const API_TECNOLOGIAS = '/api/tecnologias';

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
// CARGA DE TECNOLOGIAS PARA CHECKBOXES
// ==========================================
async function cargarCheckboxesTecnologias(seleccionadas = []) {
  const contenedor = document.getElementById('proy-tecnologias');
  if (!contenedor) return;
  try {
    const res = await fetch(API_TECNOLOGIAS);
    const tecnologias = await res.json();
    contenedor.innerHTML = tecnologias.map((t) => {
      const checked = seleccionadas.includes(t.nombre) ? 'checked' : '';
      return `
        <label class="checkbox-label">
          <input type="checkbox" value="${t.nombre}" ${checked}> ${t.nombre}
        </label>
      `;
    }).join('');
  } catch (e) {
    contenedor.innerHTML = '<p>No se pudieron cargar las tecnologías.</p>';
  }
}

// ==========================================
// CRUD DE PROYECTOS
// ==========================================
async function cargarProyectosAdmin() {
  const tbody = document.getElementById('tabla-proyectos-body');
  if (!tbody) return;
  try {
    const res = await fetch(API_PROYECTOS);
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
  const checkboxes = document.querySelectorAll('#proy-tecnologias input[type="checkbox"]:checked');
  const tecnologias = Array.from(checkboxes).map((cb) => cb.value);

  const data = {
    titulo: document.getElementById('proy-titulo').value,
    descripcion: document.getElementById('proy-desc').value,
    imagenUrl: document.getElementById('proy-img').value,
    urlRepositorio: document.getElementById('proy-repo').value,
    estaActivo: document.getElementById('proy-activo').checked,
    tecnologias
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_PROYECTOS}/${id}` : API_PROYECTOS;
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
    const res = await fetch(`${API_PROYECTOS}/${id}`);
    const p = await res.json();
    document.getElementById('proy-id').value = p.id;
    document.getElementById('proy-titulo').value = p.titulo;
    document.getElementById('proy-desc').value = p.descripcion;
    document.getElementById('proy-img').value = p.imagenUrl || '';
    document.getElementById('proy-repo').value = p.urlRepositorio || '';
    document.getElementById('proy-activo').checked = p.estaActivo;
    const seleccionadas = (p.tecnologias || []).map((t) => t.tecnologia.nombre);
    await cargarCheckboxesTecnologias(seleccionadas);
    abrirModal('modal-proyecto');
  } catch (e) {
    alert('Error al cargar el proyecto');
  }
}

async function borrarProyecto(id) {
  if (!confirm('¿Eliminar este proyecto?')) return;
  try {
    await fetch(`${API_PROYECTOS}/${id}`, { method: 'DELETE' });
    cargarProyectosAdmin();
  } catch (e) {
    alert('Error al eliminar el proyecto');
  }
}

// ==========================================
// CRUD DE TECNOLOGIAS
// ==========================================
async function cargarTecnologiasAdmin() {
  const tbody = document.getElementById('tabla-tecnologias-body');
  if (!tbody) return;
  try {
    const res = await fetch(API_TECNOLOGIAS);
    const tecnologias = await res.json();
    tbody.innerHTML = tecnologias.map((t) => `
      <tr>
        <td>${t.nombre}</td>
        <td>${t.descripcion || '-'}</td>
        <td>
          <button class="btn-accion" onclick="editarTecnologia(${t.id})">Editar</button>
          <button class="btn-accion peligro" onclick="borrarTecnologia(${t.id})">Borrar</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="3">No se pudieron cargar las tecnologías.</td></tr>';
  }
}

async function guardarTecnologia(event) {
  event.preventDefault();
  const id = document.getElementById('tec-id').value;
  const data = {
    nombre: document.getElementById('tec-nombre').value,
    descripcion: document.getElementById('tec-desc').value,
    imagenUrl: document.getElementById('tec-img').value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_TECNOLOGIAS}/${id}` : API_TECNOLOGIAS;
  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    alert('Error al guardar la tecnología');
  }

  cerrarModal('modal-tecnologia');
  event.target.reset();
  document.getElementById('tec-id').value = '';
  cargarTecnologiasAdmin();
  cargarCheckboxesTecnologias();
}

async function editarTecnologia(id) {
  try {
    const res = await fetch(`${API_TECNOLOGIAS}/${id}`);
    const t = await res.json();
    document.getElementById('tec-id').value = t.id;
    document.getElementById('tec-nombre').value = t.nombre;
    document.getElementById('tec-desc').value = t.descripcion || '';
    document.getElementById('tec-img').value = t.imagenUrl || '';
    abrirModal('modal-tecnologia');
  } catch (e) {
    alert('Error al cargar la tecnología');
  }
}

async function borrarTecnologia(id) {
  if (!confirm('¿Eliminar esta tecnología?')) return;
  try {
    await fetch(`${API_TECNOLOGIAS}/${id}`, { method: 'DELETE' });
    cargarTecnologiasAdmin();
    cargarCheckboxesTecnologias();
  } catch (e) {
    alert('Error al eliminar la tecnología');
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarProyectosAdmin();
  cargarTecnologiasAdmin();
  cargarCheckboxesTecnologias();

  const formProyecto = document.getElementById('form-proyecto');
  if (formProyecto) formProyecto.addEventListener('submit', guardarProyecto);

  const formTecnologia = document.getElementById('form-tecnologia');
  if (formTecnologia) formTecnologia.addEventListener('submit', guardarTecnologia);

  // Al abrir el modal de proyecto, refrescar checkboxes
  const btnNuevoProyecto = document.querySelector('[onclick*="modal-proyecto"]');
  if (btnNuevoProyecto) {
    btnNuevoProyecto.addEventListener('click', () => {
      document.getElementById('proy-id').value = '';
      const form = document.getElementById('form-proyecto');
      if (form) form.reset();
      cargarCheckboxesTecnologias();
    });
  }
});