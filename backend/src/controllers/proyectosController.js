import { PrismaClient } from '@prisma/client';
import { esProyectoValido } from '../../dist/proyecto.js';

const prisma = new PrismaClient();
const ADMIN_USER_ID = 1;

function validar(data) {
  const errores = [];
  if (!data.titulo || !String(data.titulo).trim()) errores.push('El titulo es obligatorio');
  if (!data.descripcion || !String(data.descripcion).trim()) errores.push('La descripcion es obligatoria');
  if (data.estaActivo !== undefined && typeof data.estaActivo !== 'boolean') {
    errores.push('estaActivo debe ser un valor booleano');
  }
  return errores;
}

async function syncTecnologias(proyectoId, nombres = []) {
  await prisma.proyectoTecnologia.deleteMany({ where: { proyectoId } });
  for (const nombre of nombres) {
    const limpio = String(nombre).trim();
    if (!limpio) continue;
    let tecnologia = await prisma.tecnologia.findFirst({ where: { nombre: limpio } });
    if (!tecnologia) {
      tecnologia = await prisma.tecnologia.create({ data: { nombre: limpio } });
    }
    await prisma.proyectoTecnologia.create({
      data: { proyectoId, tecnologiaId: tecnologia.id }
    });
  }
}

export async function listar(req, res) {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: { tecnologias: { include: { tecnologia: true } } },
      orderBy: { id: 'desc' }
    });
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
}

export async function obtener(req, res) {
  try {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id: Number(req.params.id) },
      include: { tecnologias: { include: { tecnologia: true } } }
    });
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
}

export async function crear(req, res) {
  const errores = validar(req.body);
  if (errores.length) return res.status(400).json({ errores });
  if (!esProyectoValido(req.body)) return res.status(400).json({ error: 'Datos de proyecto invalidos' });

  const { titulo, descripcion, imagenUrl, urlRepositorio, estaActivo, tecnologias } = req.body;
  try {
    const proyecto = await prisma.proyecto.create({
      data: {
        titulo,
        descripcion,
        imagenUrl: imagenUrl || '',
        urlRepositorio: urlRepositorio || '',
        estaActivo: estaActivo ?? true,
        usuarioId: ADMIN_USER_ID
      }
    });
    if (Array.isArray(tecnologias)) await syncTecnologias(proyecto.id, tecnologias);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  const errores = validar(req.body);
  if (errores.length) return res.status(400).json({ errores });

  const { titulo, descripcion, imagenUrl, urlRepositorio, estaActivo, tecnologias } = req.body;
  try {
    const proyecto = await prisma.proyecto.update({
      where: { id },
      data: {
        titulo,
        descripcion,
        imagenUrl: imagenUrl || '',
        urlRepositorio: urlRepositorio || '',
        estaActivo: estaActivo ?? true
      }
    });
    if (Array.isArray(tecnologias)) await syncTecnologias(id, tecnologias);
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
}

export async function eliminar(req, res) {
  try {
    await prisma.proyecto.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
}