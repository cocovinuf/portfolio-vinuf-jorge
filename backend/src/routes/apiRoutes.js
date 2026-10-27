import { Router } from 'express';
import * as proyectosController from '../controllers/proyectosController.js';
import * as tecnologiasController from '../controllers/tecnologiasController.js';

const router = Router();

// Endpoints para gestionar proyectos (CRUD)
router.get('/proyectos', proyectosController.listar);
router.get('/proyectos/:id', proyectosController.obtener);
router.post('/proyectos', proyectosController.crear);
router.put('/proyectos/:id', proyectosController.actualizar);
router.delete('/proyectos/:id', proyectosController.eliminar);

// Endpoints para gestionar tecnologias (CRUD)
router.get('/tecnologias', tecnologiasController.listar);
router.get('/tecnologias/:id', tecnologiasController.obtener);
router.post('/tecnologias', tecnologiasController.crear);
router.put('/tecnologias/:id', tecnologiasController.actualizar);
router.delete('/tecnologias/:id', tecnologiasController.eliminar);

export default router;