import { Router } from 'express';
import * as proyectosController from '../controllers/proyectosController.js';

const router = Router();

// Endpoints para gestionar proyectos (CRUD)
router.get('/proyectos', proyectosController.listar);
router.get('/proyectos/:id', proyectosController.obtener);
router.post('/proyectos', proyectosController.crear);
router.put('/proyectos/:id', proyectosController.actualizar);
router.delete('/proyectos/:id', proyectosController.eliminar);

export default router;