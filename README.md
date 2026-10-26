# portfolio-vinuf-jorge

Portfolio personal desarrollado para la materia **Programación Web** del instituto INCADE. Consiste en un sitio web personal con secciones de inicio, formación, proyectos y contacto, complementado con un panel de administración y un backend con persistencia de datos.

Toda la información del portfolio es verídica.

## Estructura del proyecto

```
portfolio-vinuf-jorge/
├── frontend/        # HTML, CSS, JS e imágenes del sitio
├── backend/         # Servidor Node.js + Express + Prisma
│   ├── src/
│   ├── prisma/
│   └── package.json
├── README.md
└── .gitignore
```

## Requisitos previos

- Node.js 18 o superior
- MySQL (se recomienda XAMPP) con una base de datos llamada `db_portfolio`
- npm

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/cocovinuf/portfolio-vinuf-jorge.git
   cd portfolio-vinuf-jorge
   ```

2. Instalar las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Configurar la conexión a la base de datos. Crear un archivo `.env` dentro de `backend/` con el siguiente contenido:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/db_portfolio"
   ```
   > El archivo `.env` no se sube al repositorio. Las credenciales se mantienen fuera del código publicado.

4. Generar el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

5. (Opcional) Cargar datos iniciales (usuario administrador):
   ```bash
   npm run seed
   ```

## Ejecución

Desde la carpeta `backend/`:

```bash
npm run dev
```

El servidor se inicia en `http://localhost:4000`. El frontend se sirve de forma estática desde el mismo servidor.

Para detener el servidor, presionar `Ctrl + C` en la terminal.

## Base de datos

Se eligió **MySQL (base de datos relacional)** para almacenar la información del portfolio (usuarios, secciones, formación, proyectos y tecnologías).

**Justificación de la elección (relacional vs no relacional):**

- Los datos tienen una estructura fija y bien definida (usuarios, proyectos, tecnologías, etc.).
- Existen relaciones claras entre las entidades: un usuario tiene varios proyectos y formaciones; un proyecto puede tener varias tecnologías (relación muchos a muchos mediante la tabla intermedia `proyecto_tecnologia`).
- Una base de datos relacional permite garantizar la integridad referencial mediante claves foráneas y acciones en cascada (por ejemplo, al eliminar un usuario se eliminan sus proyectos).
- Facilita las consultas con `JOIN` para obtener proyectos junto con sus tecnologías.

Una base de datos no relacional (por ejemplo, MongoDB) sería más adecuada para datos flexibles o sin esquema definido, o cuando se prioriza la escalabilidad horizontal. En este caso, como la estructura es estable y las relaciones son importantes, se optó por una base de datos relacional.

Los datos persisten en MySQL, por lo que se mantienen almacenados aunque se detenga y se vuelva a iniciar el servidor.

## Tecnologías utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **ORM:** Prisma
- **Base de datos:** MySQL
- **Control de versiones:** Git y GitHub

## Repositorio

El código fuente se encuentra disponible en: https://github.com/cocovinuf/portfolio-vinuf-jorge