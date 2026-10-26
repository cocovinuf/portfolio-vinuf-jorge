// Lógica de Navegación del Sidebar
function mostrarSeccion(idSeccion, enlace) {
    // Quitar la clase activa de todas las secciones
    const secciones = document.querySelectorAll('.panel-seccion');
    secciones.forEach(sec => sec.classList.remove('activa'));

    // Quitar la clase activa de todos los enlaces del sidebar
    const enlaces = document.querySelectorAll('.nav-links a');
    enlaces.forEach(link => link.classList.remove('activo'));

    // Activar la sección y el enlace clickeado
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

// Simulación de envío de formulario
function guardarDatos(evento, idModal) {
    evento.preventDefault();
    // Aquí a futuro harás el fetch() POST o PUT hacia tu backend en Node.js
    alert('Datos guardados localmente (Simulación)');
    cerrarModal(idModal);
    evento.target.reset(); // Limpia el formulario
}

// ==========================================
// SIMULACIÓN DE DATOS (Para maquetado inicial)
// ==========================================

const proyectosMock = [
    { titulo: "Plataforma ESRTIC", descripcion: "Restauración de plataforma", repo: "github.com/esrtic", estado: true },
    { titulo: "AuraClothes", descripcion: "Colaboración con Docker", repo: "github.com/aura", estado: false }
];

function cargarProyectos() {
    const tbody = document.getElementById('tabla-proyectos-body');
    tbody.innerHTML = '';
    
    proyectosMock.forEach(proy => {
        tbody.innerHTML += `
            <tr>
                <td>${proy.titulo}</td>
                <td>${proy.descripcion}</td>
                <td>${proy.repo}</td>
                <td><span style="color: ${proy.estado ? 'var(--color-acento)' : '#ef4444'}">${proy.estado ? 'Activo' : 'Oculto'}</span></td>
                <td>
                    <button class="btn-accion" onclick="alert('Elegiste editar: ${proy.titulo}')">Editar</button>
                    <button class="btn-accion peligro">Borrar</button>
                </td>
            </tr>
        `;
    });
}





// Cargar la tabla de simulación al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarProyectos();
    // Podrás hacer funciones similares para formacion, secciones y tecnologias.
});