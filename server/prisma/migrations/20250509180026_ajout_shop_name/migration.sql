/*
  Warnings:

  - You are about to drop the column `shop` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `shop`,
    ADD COLUMN `shop_name` VARCHAR(255) NULL;
