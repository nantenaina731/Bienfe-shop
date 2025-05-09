-- AlterTable
ALTER TABLE `users` ADD COLUMN `shop` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Shop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
