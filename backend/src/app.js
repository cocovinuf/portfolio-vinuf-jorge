import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Importar los archivos de rutas separados que creamos
import viewsRoutes from './routes/viewsRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

// Configuración para manejar rutas de carpetas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (CSS, JavaScript del cliente, imágenes)
app.use(express.static(path.join(__dirname, '../../frontend'))); 

// Registrar las rutas separadas
app.use('/', viewsRoutes);     // Maneja las páginas HTML (ej: /, /proyectos, /contacto)
app.use('/api', apiRoutes);  // Maneja los datos de la base de datos con Prisma (ej: /api/proyectos)

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});