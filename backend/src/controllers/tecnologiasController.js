import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function validar(data) {
  const errores = [];
  if (!data.nombre || !String(data.nombre).trim()) errores.push('El nombre es obligatorio');
  return errores;
}

export async function listar(req, res) {
  try {
    const tecnologias = await prisma.tecnologia.findMany({ orderBy: { id: 'desc' } });
    res.json(tecnologias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tecnologias' });
  }
}

export async function obtener(req, res) {
  try {
    const tecnologia = await prisma.tecnologia.findUnique({ where: { id: Number(req.params.id) } });
    if (!tecnologia) return res.status(404).json({ error: 'Tecnologia no encontrada' });
    res.json(tecnologia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tecnologia' });
  }
}

export async function crear(req, res) {
  const errores = validar(req.body);
  if (errores.length) return res.status(400).json({ errores });

  const { nombre, descripcion, imagenUrl } = req.body;
  try {
    const tecnologia = await prisma.tecnologia.create({
      data: {
        nombre,
        descripcion: descripcion || null,
        imagenUrl: imagenUrl || null
      }
    });
    res.status(201).json(tecnologia);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tecnologia' });
  }
}

export async function actualizar(req, res) {
  const id = Number(req.params.id);
  const errores = validar(req.body);
  if (errores.length) return res.status(400).json({ errores });

  const { nombre, descripcion, imagenUrl } = req.body;
  try {
    const tecnologia = await prisma.tecnologia.update({
      where: { id },
      data: {
        nombre,
        descripcion: descripcion || null,
        imagenUrl: imagenUrl || null
      }
    });
    res.json(tecnologia);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tecnologia' });
  }
}

export async function eliminar(req, res) {
  try {
    await prisma.tecnologia.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tecnologia' });
  }
}