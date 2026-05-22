-- CreateTable
CREATE TABLE `movies` (
    `movie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(20) NOT NULL,
    `genero` VARCHAR(20) NOT NULL,
    `duracao` INTEGER NOT NULL,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `google_id` VARCHAR(20) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_google_id_key`(`google_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orders_id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` DECIMAL(6, 2) NOT NULL,
    `O_user_fk` INTEGER NOT NULL,

    UNIQUE INDEX `orders_O_user_fk_key`(`O_user_fk`),
    PRIMARY KEY (`orders_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rentals` (
    `rental_id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_final` DATE NOT NULL,
    `R_user_fk` INTEGER NOT NULL,
    `R_movie_fk` INTEGER NOT NULL,

    UNIQUE INDEX `rentals_R_user_fk_key`(`R_user_fk`),
    PRIMARY KEY (`rental_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `tickets_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessao` VARCHAR(5) NOT NULL,
    `T_user_fk` INTEGER NOT NULL,
    `T_movie_fk` INTEGER NOT NULL,

    UNIQUE INDEX `tickets_T_user_fk_key`(`T_user_fk`),
    UNIQUE INDEX `tickets_T_movie_fk_key`(`T_movie_fk`),
    PRIMARY KEY (`tickets_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `store_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_O_user_fk_fkey` FOREIGN KEY (`O_user_fk`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_R_user_fk_fkey` FOREIGN KEY (`R_user_fk`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_R_movie_fk_fkey` FOREIGN KEY (`R_movie_fk`) REFERENCES `movies`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_T_user_fk_fkey` FOREIGN KEY (`T_user_fk`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_T_movie_fk_fkey` FOREIGN KEY (`T_movie_fk`) REFERENCES `movies`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
