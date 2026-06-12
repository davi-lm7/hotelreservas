-- CreateTable
CREATE TABLE `Quarto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(10) NOT NULL,
    `tipo` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(100) NOT NULL,
    `data_entrada` DATE NOT NULL,
    `data_saida` DATE NOT NULL,
    `quarto_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_quarto_id_fkey` FOREIGN KEY (`quarto_id`) REFERENCES `Quarto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
