// Interfaz que representa la informacion de un proyecto del portfolio.
export interface Proyecto {
  id?: number;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  urlRepositorio?: string;
  estaActivo: boolean;
  tecnologias?: string[];
}

// Tipo union para representar el estado de publicacion de un proyecto.
export type EstadoProyecto = 'activo' | 'oculto';

// Funcion auxiliar tipada que valida los datos basicos de un proyecto.
export function esProyectoValido(proyecto: Proyecto): boolean {
  return Boolean(proyecto.titulo && proyecto.titulo.trim() && proyecto.descripcion && proyecto.descripcion.trim());
}