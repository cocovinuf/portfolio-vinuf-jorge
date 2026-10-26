import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Endpoint para obtener los proyectos de la base de datos
router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await prisma.proyecto.findMany({
            include: {
                tecnologias: {
                    include: { tecnologia: true }
                }
            }
        });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
});

export default router;