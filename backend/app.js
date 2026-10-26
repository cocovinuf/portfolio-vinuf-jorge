const express = require('express');
const path = require('path');
const app = express();
const PORT = 3306;

// Configuración clave: le dice a Express que sirva todos los archivos de la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Cuando alguien entra a la raíz ('/'), se le envía el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/vistas/index.html'));
});


app.get('/formacion', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/vistas/formacion.html'));
});


app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/vistas/contacto.html'));
});


app.get('/proyectos', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/vistas/proyectos.html'));
});


app.get('/panel_admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/vistas/admin/panel_admin.html'));
});









// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});