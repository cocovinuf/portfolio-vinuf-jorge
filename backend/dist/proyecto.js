// Funcion auxiliar tipada que valida los datos basicos de un proyecto.
export function esProyectoValido(proyecto) {
    return Boolean(proyecto.titulo && proyecto.titulo.trim() && proyecto.descripcion && proyecto.descripcion.trim());
}
