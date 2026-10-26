import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

const frontendPath = path.join(__dirname, '../../../frontend');

router.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/index.html'));
});

router.get('/formacion', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/formacion.html'));
});

router.get('/contacto', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/contacto.html'));
});

router.get('/proyectos', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/proyectos.html'));
});


router.get('/login_administrador', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/admin/login_administrador.html'));
});

router.get('/panel_admin', (req, res) => {
    res.sendFile(path.join(frontendPath, 'vistas/admin/panel_admin.html'));
});

export default router;