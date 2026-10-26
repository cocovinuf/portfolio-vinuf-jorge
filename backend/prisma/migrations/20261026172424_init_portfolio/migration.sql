-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apellido` VARCHAR(100) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(150) NOT NULL,
    `subtitulo` VARCHAR(150) NULL,
    `texto` VARCHAR(255) NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `FK_usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `FK_usuario_id` INTEGER NOT NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `tipo` VARCHAR(150) NOT NULL,
    `url_imagen` VARCHAR(255) NULL,
    `esta_activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `FK_usuario_id` INTEGER NOT NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `imagen_url` VARCHAR(255) NOT NULL,
    `url_repositorio` VARCHAR(255) NOT NULL,
    `esta_activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tecnologias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NULL,
    `imagen_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto_tecnologia` (
    `FK_proyecto_id` INTEGER NOT NULL,
    `FK_tecnologia_id` INTEGER NOT NULL,

    PRIMARY KEY (`FK_proyecto_id`, `FK_tecnologia_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `secciones` ADD CONSTRAINT `secciones_FK_usuario_id_fkey` FOREIGN KEY (`FK_usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `formacion` ADD CONSTRAINT `formacion_FK_usuario_id_fkey` FOREIGN KEY (`FK_usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyectos` ADD CONSTRAINT `proyectos_FK_usuario_id_fkey` FOREIGN KEY (`FK_usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto_tecnologia` ADD CONSTRAINT `proyecto_tecnologia_FK_proyecto_id_fkey` FOREIGN KEY (`FK_proyecto_id`) REFERENCES `proyectos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto_tecnologia` ADD CONSTRAINT `proyecto_tecnologia_FK_tecnologia_id_fkey` FOREIGN KEY (`FK_tecnologia_id`) REFERENCES `tecnologias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
