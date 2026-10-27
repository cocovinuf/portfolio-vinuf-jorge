
// 1. Carga dinámica de proyectos desde la API
async function cargarProyectosPublicos() {
  const contenedor = document.getElementById('contenedor-proyectos');
  if (!contenedor) return;
  try {
    const respuesta = await fetch('/api/proyectos');
    const todos = await respuesta.json();
    const proyectos = todos.filter((p) => p.estaActivo);
    contenedor.innerHTML = proyectos.map((p) => {
      const tecnologias = (p.tecnologias || [])
        .map((t) => `<span class="mini-tarjeta-tecnologia">${t.tecnologia.nombre}</span>`)
        .join('');
      return `
      <div class="tarjeta-proyecto">
        <h3>${p.titulo}</h3>
        <p>${p.descripcion}</p>
        ${p.imagenUrl ? `<img src="${p.imagenUrl}" alt="${p.titulo}" class="imagen-proyecto">` : ''}
        ${tecnologias ? `<div class="tecnologias-proyecto">${tecnologias}</div>` : ''}
        ${p.urlRepositorio ? `<a href="${p.urlRepositorio}" class="links" target="_blank">Ir al repositorio</a>` : ''}
      </div>
    `;
    }).join('');
  } catch (error) {
    contenedor.innerHTML = '<p>No se pudieron cargar los proyectos.</p>';
  }
}

// 2. Manejo visual del formulario de contacto
const formulario = document.getElementById('form-contacto');
if (formulario) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    formulario.reset();
  });
}

document.addEventListener('DOMContentLoaded', cargarProyectosPublicos);